import React from 'react'
import {connect} from 'react-redux'
import {Typography, withStyles} from '@material-ui/core'
import {connectSocket, getToken, incomingCall, disconnectCall, makeCall} from '../Twilio/action'
import CallingDialog from '../callingdialog'
import {
  ready, error, disconnect, incoming, cancel, offline,
  connect as twilioDeviceConnect,
} from '../../utils/actions/socketEvents/socket'
import styles from '../Calling/style'
import {twilioNumber, personalNumber} from '../../utils/common'
import {v4 as uuidv4} from 'uuid'


function CallingFC( props ) {

  const {getTwilioToken=f=>f, twilioDevice, activeConnection, endCall=f=>f, callIncoming=f=>f, classes } = props

  const calls = {
    onCallDialog: false,
    callTo: personalNumber,
    callFrom: twilioNumber,
    deviceName: uuidv4(),
  }

  const [onCallDialog, setOnCallDialog] = React.useState(false)

  const {callFrom, deviceName} = calls
  const prevProps = props

  React.useEffect(() => {
    getTwilioToken(deviceName)

    if (prevProps.twilioDevice === null && twilioDevice) {
    console.log(' == handleTwilioEvents ==: ', handleTwilioEvents());
    }
    if (onCallDialog && prevProps.activeConnection !== null && activeConnection === null) {
      setOnCallDialog(false)
    }

    return () => unsubscribeTwilioEventListener()
  },[handleTwilioEvents()])


  function handleTwilioEvents ()  {

    if (twilioDevice) {
      unsubscribeTwilioEventListener()
      twilioDevice.on(ready, (key) => {
      })
      twilioDevice.on(error, (err) => {
        if (err.code === 31205) {
          getTwilioToken(deviceName)
        }
      })
      twilioDevice.on(disconnect, (conn) => {
        console.log('disconnect', error)
        endCall()
      })
      twilioDevice.on(offline, (device) => {
        console.log('OFFLINE', device)
      })
      twilioDevice.on(incoming, (conn) => {
        console.log('INCOMING--', conn)
        callIncoming(conn)

      })
      twilioDevice.on(twilioDeviceConnect, (conn) => {
        console.log('DEVICE CONNECT', conn)
      })
      twilioDevice.on(cancel, (conn) => {
        console.log('CANCEL', conn)
        endCall()
      })
    }
  }

  const rejectIncomingCall = () => {
    if (activeConnection && activeConnection.direction === 'INCOMING') {
      activeConnection.reject()
      endCall()
    }
  }

  function unsubscribeTwilioEventListener () {
    twilioDevice.removeListener(ready, (key) => { })
    twilioDevice.removeListener(error, (key) => { })
    twilioDevice.removeListener(disconnect, (key) => { })
    twilioDevice.removeListener(offline, (key) => { })
    twilioDevice.removeListener(incoming, (key) => { })
    twilioDevice.removeListener(twilioDeviceConnect, (key) => { })
    twilioDevice.removeListener(cancel, (key) => { })
  }

  const acceptIncomingCall = async () => {
    if (activeConnection && activeConnection.direction === 'INCOMING') {
      activeConnection.accept()
      setOnCallDialog(true)
    }
  }

  return (
    <div>
      <div className={classes.centralDiv}>
        {activeConnection && (activeConnection.direction === 'INCOMING') &&
        <CallingDialog
          acceptCall={acceptIncomingCall}
          rejectIncomingCall={rejectIncomingCall}
          direction={(activeConnection && activeConnection.direction) || 'Test'}
        />
        }
        <div className={classes.divContainer}>
          <Typography className={classes.typoClass}>
            TO -- DEMONSTRATE INBOUND CALLING FUNCTIONALITY <br/>
            <b> {`CALL ${callFrom}  `}</b>
          </Typography>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  getTwilioToken: params => dispatch(getToken(params)),
  callIncoming: conn => dispatch(incomingCall(conn)),
  endCall: () => dispatch(disconnectCall()),
  getSocketConnection: url => dispatch(connectSocket(url)),
  dialCall: conn => dispatch(makeCall(conn)),
})

const mapStateToProps = state => ({
  twilioDevice: state.twilioReducer.twilioDevice,
  activeConnection: state.twilioReducer.activeConnection,
  socketConnection: state.twilioReducer.socketConnection,
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CallingFC))