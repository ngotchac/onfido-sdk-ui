import * as constants from '../../constants'

export function setDocumentType(payload) {
  return {
    type: constants.SET_DOCUMENT_TYPE,
    payload
  }
}

export function setCrossDeviceMode(payload) {
  return {
    type: constants.SET_CROSS_DEVICE_MODE,
    payload
  }
}
