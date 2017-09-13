import * as constants from '../../constants'

const initialState = {
  documentType: null,
  crossDevice: false,
}

export default function globals(state = initialState, action) {
  switch (action.type) {
    case constants.SET_DOCUMENT_TYPE:
      return {...state, documentType: action.payload }
    case constants.SET_CROSS_DEVICE_MODE:
      return { ...state, crossDevice: action.payload }
    default:
      return state
  }
}
