import { h, Component } from 'preact'
import createHistory from 'history/createBrowserHistory'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import io from 'socket.io-client'

import { unboundActions, events } from '../../core'
import {sendScreen} from '../../Tracker'
import {wrapArray} from '../utils/array'
import { createComponentList } from './StepComponentMap'
import { CrossDevice } from '../CrossDevice'

const history = createHistory()

const singleDeviceComponents = ({documentType, options:{steps}}) =>
  createComponentList(steps, documentType)


const Router = (props) => {
  return (
    props.options.mobileFlow ? <MobileRouter {...props}/> : <DesktopRouter {...props}/>
  )
}

class MobileRouter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token: null,
      steps: null,
      socket: io(process.env.DESKTOP_SYNC_URL),
      roomId: window.location.pathname.substring(1),
    }
    this.state.socket.on('config', this.setConfig(props.actions))
    this.state.socket.emit('join', {room: this.state.roomId})
    this.requestConfig()
  }

  requestConfig = () => {
    console.log(this.state.roomId)
    this.state.socket.emit('message', {room: this.state.roomId, eventType: 'get config'})
  }

  setConfig = (actions) => {
    return (data) => {
      const {token, steps, documentType, step} = data.config
      this.setState({token, steps, step})
      actions.setDocumentType(documentType)
    }
  }

  render = (props) => {
    console.log('Mobile Router')
    const componentsList = singleDeviceComponents(props)
    props.options.token = this.state.token
    const routerProps = {componentsList, step: this.state.step, ...props}
    return (
      this.state.token ? <LinearRouter {...routerProps}/> : <p>LOADING</p>
    )
  }
}

class DesktopRouter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      roomId: null,
      socket: io(process.env.DESKTOP_SYNC_URL),
      mobileConnected: false,
      singleDeviceStep: 0,
    }
    this.state.socket.on('joined', this.setRoomId)
    this.state.socket.on('get config', this.sendConfig)
    this.state.socket.on('disconnect', this.mobileDisconnected)
    this.state.socket.emit('join', {})
  }

  setRoomId = (data) => {
    this.setState({roomId: data.roomId})
    console.log(`https://localhost:8080/${data.roomId}?mobileFlow=true`)
  }

  sendConfig = () => {
    const {documentType, options} = this.props
    const {steps, token} = options
    const config = {steps, token, documentType, step: this.state.step}
    this.state.socket.emit('config', {config, room: this.state.roomId})
    this.setState({mobileConnected: true})
  }

  mobileDisconnected = () => {
    this.setState({mobileConnected: false})
  }

  onStepChange = (singleDeviceStep) => {
    this.setState({singleDeviceStep})
  }

  singleDeviceProps = () => {
    return {
      componentsList: singleDeviceComponents(this.props),
      onStepChange: this.onStepChange,
      ...this.props,
    }
  }

  crossDeviceProps = () => {
    return {
      componentsList: [{component: CrossDevice}],
      ...this.props,
    }
  }

  render = () => {
    console.log('Desktop Router')
    const routerProps = this.props.crossDevice ? this.crossDeviceProps() : this.singleDeviceProps()
    return (
      <LinearRouter {...routerProps}/>
    )
  }
}

class LinearRouter extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
      step: props.step || 0,
    }
    this.unlisten = history.listen(({state = this.initialState}) => {
      console.log(state)
      this.setState(state)
    })
  }

  nextStep = () => {
    const components = this.props.componentsList
    const currentStep = this.state.step
    const newStepIndex = currentStep + 1
    if (components.length === newStepIndex){
      events.emit('complete')
    }
    else {
      this.setStepIndex(newStepIndex)
    }
  }

  previousStep = () => {
    const currentStep = this.state.step
    this.setStepIndex(currentStep - 1)
  }

  setStepIndex = (newStepIndex) => {
    const state = { step: newStepIndex }
    const path = `${location.pathname}${location.search}${location.hash}`
    this.props.onStepChange && this.props.onStepChange(newStepIndex)
    history.push(path, state)
  }

  trackScreen = (screenNameHierarchy, properties = {}) => {
    const { step } = this.currentComponent()
    sendScreen(
      [step.type, ...wrapArray(screenNameHierarchy)],
      {...properties, ...step.options})
  }

  currentComponent = () => this.props.componentsList[this.state.step]

  componentWillReceiveProps(nextProps) {
    console.log('Next props')
    console.log(nextProps)
    const {step, componentsList} = nextProps
    this.setState({step, componentsList})
  }

  componentWillMount () {
    this.setStepIndex(this.state.step)
  }

  componentWillUnmount () {
    this.unlisten()
  }

  render = ({options: {...globalUserOptions}, ...otherProps}) => {
    console.log('render props')
    console.log(this.props)
    console.log('step')
    console.log(this.state.step)
    const componentBlob = this.currentComponent()
    const CurrentComponent = componentBlob.component
    const stepOptions = componentBlob.step ? componentBlob.step.options : {}
    return (
      <div>
        <CurrentComponent
          {...{...stepOptions, ...globalUserOptions, ...otherProps}}
          nextStep = {this.nextStep}
          previousStep = {this.previousStep}
          trackScreen = {this.trackScreen}/>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {...state.globals}
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(unboundActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router)
