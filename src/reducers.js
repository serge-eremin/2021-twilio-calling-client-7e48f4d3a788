import { combineReducers } from 'redux'

import twilioReducer from './components/Twilio/reducer'

const reducers = combineReducers({
    twilioReducer,
})

export default reducers
