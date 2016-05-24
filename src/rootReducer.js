import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import restaurant from './modules/restaurant'
import restaurantList from './modules/restaurantList'
import user from './modules/lock'

export default combineReducers({
    restaurant,
    restaurantList,
    user,
    router,
    form: formReducer
})
