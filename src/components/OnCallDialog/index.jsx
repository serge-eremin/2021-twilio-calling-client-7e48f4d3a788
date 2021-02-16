import React from 'react'
import {
    Card, Typography,
    Tooltip, withStyles
  } from '@material-ui/core'
import { CallEndOutlined } from '@material-ui/icons'
import styles from './style'

const OngoingCallDialog = ( { classes, endOngoingCall } ) => {
    return (
        <div>
          <Card className={ classes.cardStyle }>
            <Typography className={ classes.ongoingTypo }>
                CALL IN PROGRESS
            </Typography>
            <Tooltip title="End Call">             
              <CallEndOutlined className={ classes.callEndStyle }  onClick={ endOngoingCall } />
            </Tooltip>
          </Card>
        </div>
    )
}

export default withStyles( styles ) ( OngoingCallDialog )