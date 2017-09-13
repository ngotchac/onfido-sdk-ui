import { h, Component } from 'preact'
import Dropzone from 'react-dropzone'
import theme from '../Theme/style.css'
import style from './style.css'
import {errors} from '../strings/errors'
import { trackComponentAndMode } from '../../Tracker'
import {preventDefaultOnClick} from '../utils'

const UploadInstructions = ({error}) =>
  <div className={style.base}>
    <span className={`${theme.icon} ${style.icon}`}></span>
    <p className={style.text}>Take a photo with your camera or upload one from your library.</p>
    <UploadError error={errors[error.name]} />
  </div>

const UploadError = ({error}) =>
  error && <div className={`${style.text} ${style.error}`}>{`${error.message}. ${error.instruction}.`}</div>

const UploaderPure = ({onImageSelected, error, actions}) =>
  <div>
    {<UseMobile actions={actions} />}
    <Dropzone
      onDrop={([ file ])=> {
        //removes a memory leak created by react-dropzone
        URL.revokeObjectURL(file.preview)
        delete file.preview
        onImageSelected(file)
      }}
      multiple={false}
      className={style.dropzone}
    >
      {<UploadInstructions error={error}/>}
    </Dropzone>
  </div>

class UseMobile extends Component {

  onClick = () => {
    this.props.actions.setCrossDeviceMode(true)
  }

  render() {
    return (
      <div className={theme.actions}>
        <a href='#' className={`${theme.btn} ${theme["btn-primary"]}`}
          onClick={preventDefaultOnClick(this.onClick)}>
          Use Mobile
        </a>
      </div>
    )
  }
}

export const Uploader = trackComponentAndMode(UploaderPure, 'file_upload', 'error')
