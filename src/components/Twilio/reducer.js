import {
  TWILIO_TOKEN_SUCCESS,
  TWILIO_TOKEN_FAILURE,
  MAKE_CALL,
  DISCONNECT_CALL,
  MULTPLE_INCOMING,
  INCOMING_CALL,
  SOCKET_CONNECTION_SUCCESS,
  SOCKET_CONNECTION_FAILURE
} from '../../utils/actions/twilio/twilio'

const initialState = {
  twilioDevice: null,
  activeConnection: null,
  socketConnection: null,
  otherConnections: [],
}

const twilioReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case TWILIO_TOKEN_SUCCESS: {
      if ( action.device ) {
        return {
          ...state,
          twilioDevice: action.device,
        }
      }
      return {
        ...state,
      }
    }
    case TWILIO_TOKEN_FAILURE:
      return {
        ...state,
      }
    case MAKE_CALL: {
      if ( state.twilioDevice ) {
        const conn = action.connection
        return {
          ...state,
          activeConnection: conn,
        }
      }
      return {
        ...state,
      }
    }
    case DISCONNECT_CALL: {
      if ( state.twilioDevice ) {
        const conn = null
        return {
          ...state,
          activeConnection: conn,
        }
      }
      return {
        ...state,
      }
    }
    case INCOMING_CALL: {
      if ( state.twilioDevice ) {
        const conn = action.connection
        return {
          ...state,
          activeConnection: conn,
        }
      }
      return {
        ...state,
      }
    }
    case SOCKET_CONNECTION_SUCCESS: {
      if ( !( state.socketConnection && state.socketConnection.connected ) === true ) {
        if ( action.socket ) {
          return {
            ...state,
            socketConnection: action.socket,
          }
        }
        return {
          ...state,
        }
      }
      return {
        ...state,
      }
    }
    case SOCKET_CONNECTION_FAILURE: {
      return {
        ...state,
      }
    }

    case MULTPLE_INCOMING: {
      return {
        ...state,
        otherConnections: [
          ...action.connection,
        ],
      }
    }
    default:
      return state
  }
}

export default twilioReducer
