
import { fork, all } from 'redux-saga/effects'

import { twilioWatcher, connectSocketWatcher } from './components/Twilio/watcher'

export default function* sagas() {
    yield all([
        fork( twilioWatcher ),
        fork( connectSocketWatcher )
    ] )
}
