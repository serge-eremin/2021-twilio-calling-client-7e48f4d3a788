import {
  MAKE_CALL,
  DISCONNECT_CALL,
  CANCEL_CALL,
  INCOMING_CALL,
  MULTPLE_INCOMING,
  GET_TWILIO_TOKEN,
  CONNECT_SOCKET,
} from '../../utils/actions/twilio/twilio'

const getToken = params => ( { type: GET_TWILIO_TOKEN, params } )

const makeCall = connection => ( { type: MAKE_CALL, connection } )

const disconnectCall = () => ( { type: DISCONNECT_CALL } )

const callCancelled = () => ( { type: CANCEL_CALL } )

const incomingCall = connection => ( { type: INCOMING_CALL, connection } )

const connectSocket = url => ( { type: CONNECT_SOCKET, url } )

const multipleIncoming = connection => ( { type: MULTPLE_INCOMING, connection } )

export {
  getToken,
  makeCall,
  disconnectCall,
  callCancelled,
  incomingCall,
  connectSocket,
  multipleIncoming,
}
