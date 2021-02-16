const styles = theme => ( {
    callMakeStyle: {
      margin: '9px', 
      background: '#32CD32',
      color: 'white',
      borderRadius: '50%',
      padding: '6px',
      '&:hover': {
        background: 'black',
      },
    },
    typoClass: {
        marginTop: '10px',
        fontSize: '25px',
        fontWeight: '500'
    },
    divContainer: {
        display: 'grid',
        justifyContent: 'center'
    },
    divContainerflex: {
      display: 'flex',
      justifyContent: 'center'
  },
    centralDiv: {
      width: 'fit-content',
      margin: '0 auto'
    },
    headerStyle:{
      fontSize: '2rem',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      textAlign: 'center'
    }
  } )
  
  export default styles
  