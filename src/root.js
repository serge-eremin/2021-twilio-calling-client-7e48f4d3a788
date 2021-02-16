import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Calling from './components/Calling/calling'
import CallingFC from "./components/CallingFC/callingFC";

const Root = ({ store }) => {
    return (
        <React.Fragment>
            <Provider store={store}>
                <Router>
                    <Switch>
                        {/*<Route path="/" render={() => <Calling /> } />*/}
                        <Route path="/" render={() => <CallingFC /> } />
                    </Switch>
                </Router>
            </Provider>
        </React.Fragment>
    )
}

Root.propTypes = {
    store: PropTypes.shape({}).isRequired,
}

export default Root
