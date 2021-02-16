import React from 'react'
import { Modal, Card, withStyles, Typography, Tooltip } from '@material-ui/core'
import { CallEndOutlined, Call } from '@material-ui/icons'
import styles from './style'
import OnCallDialog from '../OnCallDialog/index'


const CallingDialog = props => {
    const { classes, acceptCall, rejectIncomingCall, ongoingCallDialog, endOngoingCall } = props
    return(
            <Modal
                open={ true }
                onBackdropClick={ () => {} }
                className={ { classes: { 
                    root: classes.modal
                },} }

                BackdropProps={{
                    classes: {
                        root: classes.modalbackdrop,
                    },
                }
                }
            >
                <div className={ classes.modal }>
                    { ongoingCallDialog ?
                    (
                        <OnCallDialog
                        endOngoingCall={ endOngoingCall }
                        />
                    )
                    : 
                    (
                        <Card className={classes.card}>
                            {
                                <Typography className={ classes.incomingCallTypoStyle }>
                                    INCOMING CALL !!!
                                </Typography>
                            }
                            <div className={ classes.alignTextCenter }>
                                <Tooltip title='Accept Call'>
                                    <Call className={classes.callPickStyle} onClick={ acceptCall } />
                                </Tooltip>
                                <Tooltip title='Reject Call'>
                                    <CallEndOutlined className={ classes.callEndStyle }  onClick={ rejectIncomingCall } />
                                </Tooltip>
                            </div>
                        </Card>
                    )
                    }
                </div>
            </Modal>
    )
}

export default withStyles( styles )( CallingDialog )