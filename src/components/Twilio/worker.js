import { put } from 'redux-saga/effects'
// import twilio from 'twilio-client'
import io from 'socket.io-client'
import { Device } from 'twilio-client';

import {
  TWILIO_TOKEN_SUCCESS, TWILIO_TOKEN_FAILURE,
  SOCKET_CONNECTION_SUCCESS, SOCKET_CONNECTION_FAILURE,
} from '../../utils/actions/twilio/twilio'
import { twilioTokenUrl } from '../../utils/url'
import { postData } from '../../utils/axios/apiCalls'

function* twilioWorker(action  ) {
  try {
    const body = { deviceName: '01234567890987654321' }
    const url = twilioTokenUrl()
    const response = yield postData( { url, body } )
    const { data: { token } } = response
    let device
    if ( token ) {
      device = new Device()
      device.setup( token, { allowIncomingWhileBusy: true } )
    }
    yield put( { type: TWILIO_TOKEN_SUCCESS, device } )
  } catch ( error ) {
    yield put( { type: TWILIO_TOKEN_FAILURE, error } )
  }
}

function* connectSocketWorker( action ) {
  try {
    const socket = yield io( action.url )
    yield put( { type: SOCKET_CONNECTION_SUCCESS, socket } )
  } catch ( error ) {
    yield put( { type: SOCKET_CONNECTION_FAILURE, error } )
  }
}

export {
  twilioWorker,
  connectSocketWorker,
}
