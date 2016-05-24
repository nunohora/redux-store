/* global Promise */

import { CALL_API } from 'redux/middleware/api'

export const GET_RESTAURANT_REQUEST = 'GET_RESTAURANT_REQUEST'
export const GET_RESTAURANT_SUCCESS = 'GET_RESTAURANT_SUCCESS'
export const GET_RESTAURANT_FAILURE = 'GET_RESTAURANT_FAILURE'

export const GET_DETAILS_REQUEST = 'GET_DETAILS_REQUEST'
export const GET_DETAILS_SUCCESS = 'GET_DETAILS_SUCCESS'
export const GET_DETAILS_FAILURE = 'GET_DETAILS_FAILURE'

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST'
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function getRestaurant(dispatch, id) {
    dispatch(getRestaurantRequest())

    Promise.all([
        dispatch(getRestaurantInfo(id)),
        dispatch(getRestaurantProducts(id))
    ]).then(data => {
        dispatch({
            type: GET_RESTAURANT_SUCCESS,
            isFetching: true,
            meta: {
                ...data[0].response.meta,
                ...data[0].response.place
            },
            products: data[1].response.products
        })
    }).catch(() => {
        dispatch({
            type: GET_RESTAURANT_FAILURE,
            isFetching: false
        })
    })
}

function getRestaurantInfo(id) {
    return {
        [CALL_API]: {
            endpoint: `places/${id}`,
            types: [GET_DETAILS_REQUEST, GET_DETAILS_SUCCESS, GET_DETAILS_FAILURE]
        }
    }
}

function getRestaurantProducts(id) {
    return {
        [CALL_API]: {
            endpoint: `places/${id}/products`,
            types: [GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE]
        }
    }
}

function getRestaurantRequest() {
    return {
        type: GET_RESTAURANT_REQUEST,
        isFetching: true
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [GET_RESTAURANT_SUCCESS]: (state, data) => {
        return Object.assign({}, state, {
            isFetching: false,
            meta: data.meta,
            productList: data.products,
            menuCategories: [1, 2]
        })
    },
    [GET_RESTAURANT_FAILURE]: state => {
        return Object.assign({}, state, {
            isFetching: false
        })
    }
}


const initialState = {
    meta: {},
    productList: [],
    menuCategories: [],
    isFetching: false
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function restaurantListReducer(state = initialState, action = {}) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}