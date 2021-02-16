const styles = theme => ( {
  modalbackdrop: {
    // background: 'rgba(0, 0, 0, 0)',
  },
  modal: {
    width: 'fit-content',
    float: 'right',
    right: '0px',
    // margin: '0px'
  },
  card:{
    width: 'fit-content'
  },
  listItemText: {
    textAlign: 'left',
    paddingLeft: '3px !important',
  },
  alignTextCenter: {
    textAlign: 'center',
  },
  incomingCallTypoStyle: {
    fontSize: 'larger',
    fontWeight: 'bolder',
    textAlign: 'center',
    padding: '15px'
  },
  listName: {
    paddingLeft: 8,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 8,
    width: '100%',
  },
  cardActions: {
    width: '100%',
    background: '#ffffff',
    padding: 0,
  },
  list: {
    width: '100%',
    margin: 0,
  },
  listitemTextTypo: {
    fontSize: 13,
  },
  callEndStyle: {
    margin: '10px', 
    background: 'red',
    color: 'white',
    borderRadius: '50%',
    padding: '10px',
    '&:hover': {
      background: 'black',
    },
  },
  callPickStyle: {
    margin: '10px', 
    background: '#90EE90',
    color: 'white',
    borderRadius: '50%',
    padding: '10px',
    '&:hover': {
      background: 'black',
    },
  }
} )

export default styles
