import { takeLatest } from 'redux-saga/effects'
import { twilioWorker, connectSocketWorker } from './worker'
import { GET_TWILIO_TOKEN, CONNECT_SOCKET } from '../../utils/actions/twilio/twilio'

function* twilioWatcher() {
  yield takeLatest( GET_TWILIO_TOKEN, twilioWorker )
}

function* connectSocketWatcher() {
  yield takeLatest( CONNECT_SOCKET, connectSocketWorker )
}

export {
  twilioWatcher,
  connectSocketWatcher,
}
