const ADD_ORDER_ITEM_REQUEST = 'ADD_ORDER_ITEM_REQUEST'
const ADD_ORDER_ITEM_SUCCESS = 'ADD_ORDER_ITEM_SUCCESS'
const ADD_ORDER_ITEM_FAILURE = 'ADD_ORDER_ITEM_FAILURE'
const REMOVE_ORDER_ITEM_REQUEST = 'REMOVE_ORDER_ITEM_REQUEST'
const REMOVE_ORDER_ITEM_SUCCESS = 'REMOVE_ORDER_ITEM_SUCCESS'
const REMOVE_ORDER_ITEM_FAILURE = 'REMOVE_ORDER_ITEM_FAILURE'
const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST'
const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS'
const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE'

import { storage } from '../utils'

function getOrdersForRestaurant(dispatch, restId) {
    dispatch({
        type: GET_ORDERS_REQUEST
    })

    storage.load({
        key: 'orders'
    }).then(res => {
        dispatch({ type: GET_ORDERS_SUCCESS, res })
    }).catch((err, res) => {
        console.log('error: ', err)
        console.log('response: ', res)

        if (err) {
            dispatch({ type: GET_ORDERS_FAILURE })
        }
        else {
            dispatch({ type: GET_ORDERS_SUCCESS, orders: {} })
        }
    })
}

function addOrderItem(item) {
    storage.save({
        key: 'orders'
    }).then(res => {
        console.log('here!!!')
    }).catch((err, res) => {
        console.log('error!!!')
    })
}

function addOrderItemSuccess(item) {
    return {
        type: ADD_ORDER_ITEM_SUCCESS,
        order
    }
}

function addOrderItemFailure(item) {
    return {
        type: ADD_ORDER_ITEM_FAILURE,
        isFetching: false,
        order
    }
}

function addOrderItemRequest(item) {
    return {
        type: ADD_ORDER_ITEM_REQUEST,
        isFetching: true,
        item
    }
}

function addOrderItem(dispatch, order) {
    dispatch(addOrderItemRequest())

    let orders = getLocalStorageOrdersForRestaurant(restId)

    return {
        type: ADD_ORDER_ITEM,
        order
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [ADD_ORDER_ITEM_REQUEST]: (state) => {
        return Object.assign({}, state, {
            isFetching: true
        })
    },
    [ADD_ORDER_ITEM_SUCCESS]: (state, data) => {
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: false
        })
    },
    [ADD_ORDER_ITEM_FAILURE]: (state) => {
        return Object.assign({}, state, {
            isFetching: false
        })
    },
    [REMOVE_ORDER_ITEM_REQUEST]: (state) => {
        return Object.assign({}, state, {
            isFetching: true
        })
    },
    [ADD_ORDER_ITEM_SUCCESS]: (state, data) => {
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: false
        })
    }
}

const initialState = {
    orders: [],
    subtotal: 0,
    deliveryFee: 0,
    total: 0,
    toCollect: false
}

// ------------------------------------
// Reducer
// ------------------------------------
function reducer(state = initialState, action = {}) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}

export default {
    reducer,
    addOrderItem,
    getOrdersForRestaurant
}