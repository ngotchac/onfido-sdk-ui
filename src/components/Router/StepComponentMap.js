import { h } from 'preact'
import Welcome from '../Welcome'
import Select from '../Select'
import {FrontDocumentCapture, BackDocumentCapture, FaceCapture} from '../Capture'
import {DocumentFrontConfirm, DocumentBackConfrim, FaceConfirm} from '../Confirm'
import Complete from '../Complete'

export const createComponentList = (steps, documentType) => {
  const mapSteps = (step) => createComponent(step, documentType)
  return shallowFlatten(steps.map(mapSteps))
}

const createComponent = (step, documentType) => {
  const stepMap = {
    welcome: () => [Welcome],
    face: () => [FaceCapture, FaceConfirm],
    document: () => createDocumentComponents(documentType),
    complete: () => [Complete]
  }
  const {type} = step
  if (!(type in stepMap)) { console.error('No such step: ' + type) }
  return stepMap[type]().map(wrapComponent(step))
}

const createDocumentComponents = (documentType) => {
  const double_sided_docs = ['driving_licence', 'national_identity_card']
  const frontDocumentFlow = [Select, FrontDocumentCapture, DocumentFrontConfirm]
  if (Array.includes(double_sided_docs, documentType)) {
    return [...frontDocumentFlow, BackDocumentCapture, DocumentBackConfrim]
  }
  return frontDocumentFlow
}

const wrapComponent = (step) => (component) => ({component, step})

const shallowFlatten = list => [].concat(...list)
