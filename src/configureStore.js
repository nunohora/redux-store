/*global require module */
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { routerMiddleware } from 'react-router-redux'
import api from 'middleware/api'

export default function configureStore(initialState = {}, history) {
    // Compose final middleware
    let middleware = applyMiddleware(thunk, routerMiddleware(history), api)

    // Create final store and subscribe router in debug env ie. for devtools
    const store = middleware(createStore)(rootReducer, initialState)

    if (module.hot) {
        module.hot.accept('./rootReducer', () => {
            const nextRootReducer = require('./rootReducer').default

            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}
