import React  from 'react'
import { connect } from 'react-redux'
import { Typography, withStyles } from '@material-ui/core'
import { connectSocket, getToken, incomingCall, disconnectCall, makeCall } from '../Twilio/action'
import CallingDialog from '../callingdialog/index'
import {
  ready, error, disconnect, incoming, cancel,offline,
  connect as twilioDeviceConnect,
} from '../../utils/actions/socketEvents/socket'
import styles from './style'
import { twilioNumber, personalNumber } from '../../utils/common'
import { v4 as uuidv4 } from 'uuid'

class CallingCC extends React.Component {
  constructor( props ){
    super( props )
    this.state = {
      onCallDialog: false,
      callTo: personalNumber,
      callFrom: twilioNumber,
      deviceName: uuidv4(),
    }
  }
  componentDidMount() {
    const { props: { getTwilioToken } , state:{ deviceName } } = this
    getTwilioToken( deviceName )

  }

  componentDidUpdate( prevProps ) {
    const { handleTwilioEvents, props: { twilioDevice, activeConnection }, state: { onCallDialog }, } = this
      if ( prevProps.twilioDevice === null && twilioDevice ) {
        handleTwilioEvents()
      }
      if ( onCallDialog && prevProps.activeConnection !== null && activeConnection === null ) {
        this.setState( { onCallDialog: false, } )

      }
  }

  componentWillUnmount() {
    const { unsubscribeTwilioEventListener } = this
    unsubscribeTwilioEventListener()

  }

  handleTwilioEvents = () => {
    const { props, state, unsubscribeTwilioEventListener } = this
    const { deviceName } = state
    const {
      getTwilioToken,
      twilioDevice,
      endCall, callIncoming,
    } = props

    if ( twilioDevice ) {
      unsubscribeTwilioEventListener()
      twilioDevice.on(ready, (key) => { })

      twilioDevice.on(error, (err) => {
        if (err.code === 31205) {
          getTwilioToken( deviceName )
        }
      })
      twilioDevice.on(disconnect, (conn) => {
        console.log('disconnect', error)
        endCall()
      })
      twilioDevice.on(offline, (device) => {
        console.log('OFFLINE')
      })
      twilioDevice.on(incoming, (conn) => {
        console.log('INCOMING')
        callIncoming( conn )
      })
      twilioDevice.on(twilioDeviceConnect, (conn) => {
        console.log('DEVICE CONNECT')
      })
      twilioDevice.on(cancel, (conn) => {
        console.log('CANCEL')
        endCall()
      })
    }
  }

  rejectIncomingCall = () => {
    const { props: { activeConnection, endCall } } = this
    if (activeConnection && activeConnection.direction === 'INCOMING') {
      activeConnection.reject()
      endCall()
console.log(' == activeConnection ==: ', activeConnection);
    }
  }
  
  unsubscribeTwilioEventListener = () => {
    const { props: { twilioDevice } } = this
    twilioDevice.removeListener(ready, (key) => { })
    twilioDevice.removeListener(error, (key) => { })
    twilioDevice.removeListener(disconnect, (key) => { })
    twilioDevice.removeListener(offline, (key) => { })
    twilioDevice.removeListener(incoming, (key) => { })
    twilioDevice.removeListener(twilioDeviceConnect, (key) => { })
    twilioDevice.removeListener(cancel, (key) => { })
  }

  acceptIncomingCall = async () => {
    const { props: { activeConnection } } = this
    if (activeConnection && activeConnection.direction === 'INCOMING') {
      activeConnection.accept()
      this.setState( { onCallDialog: true } )
    }
  }


  render() {
    const {
      acceptIncomingCall, rejectIncomingCall, props: { activeConnection, classes },
      state: { callFrom }
    } = this
    return(
      <div>
        <div className={ classes.centralDiv }>
          {
            activeConnection && ( activeConnection.direction === 'INCOMING') &&
            <CallingDialog
              acceptCall={ acceptIncomingCall }
              rejectIncomingCall={rejectIncomingCall }
              direction= { ( activeConnection && activeConnection.direction ) || 'Test' }
            />
          }
          <div className={ classes.divContainer } >
            <Typography className={ classes.typoClass } >
              TO --  DEMONSTRATE INBOUND CALLING FUNCTIONALITY <br/>
              <b> { `CALL ${ callFrom }  ` }</b>
            </Typography>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getTwilioToken: params => dispatch( getToken( params ) ),
  callIncoming: conn => dispatch(incomingCall(conn)),
  endCall: () => dispatch(disconnectCall()),
  getSocketConnection: url => dispatch(connectSocket(url)),
  dialCall: conn => dispatch( makeCall( conn ) ),
})

const mapStateToProps = state => ({
  twilioDevice: state.twilioReducer.twilioDevice,
  activeConnection: state.twilioReducer.activeConnection,
  socketConnection: state.twilioReducer.socketConnection,
})

export default connect( mapStateToProps, mapDispatchToProps )( withStyles( styles )( CallingCC ) )