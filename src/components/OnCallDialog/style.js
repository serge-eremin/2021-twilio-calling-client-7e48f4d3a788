const styles = theme => ( {
  modalbackdrop: {
    background: 'rgba(0, 0, 0, 0)',
  },
  dialog: {
    margin: 'auto',
    width: 'fit-content',
    height: 'fit-content',
    maxHeight: ' 500px',
    alignSelf: 'end',
    opacity: '1',
  },
  callEndStyle: {
    margin: '9px', 
    background: 'red',
    color: 'white',
    borderRadius: '50%',
    padding: '6px'
  },
  cardStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
  ongoingTypo:{
    color: 'black',
    margin: 'auto',
    marginRight: '0px',
    marginLeft: '8px',
    fontSize: 'larger',
    fontWeight: 'bolder'
  },
} )

export default styles
