import * as act from '../actions/client.action';


const initialState = {
  layout: {
    private: null,
    public: null
  },
  deviceType: null
}

export const client = function (state = initialState, action) {
  let payload = action.payload
  switch (action.type) {
    case act.SET_LAYOUT:
      return {
        ...state,
        layout: payload.layout
      }

    case act.SET_DEVICE_TYPE:
      return {
        ...state,
        deviceType: payload.deviceType
      }

    case act.SET_LAYOUT_AND_DEVIE_TYPE:
      return {
        ...state,
        layout: payload.layout,
        deviceType: payload.deviceType
      }

    case act.RESET:
      return initialState

    default:
      return state
  }
}

