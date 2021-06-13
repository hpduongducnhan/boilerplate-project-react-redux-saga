import { combineReducers } from 'redux';
import { connectRouter  } from 'connected-react-router';
import { client, auth } from './reducers';

// use redux-form to inject reducer into the global state
const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    // other reducer here
    client,
    auth,
})

export default createRootReducer
