/* global Promise */

//import { CALL_API } from '../middleware/api'
const GET_TRANSLATIONS_REQUEST = 'GET_TRANSLATIONS_REQUEST'
const GET_TRANSLATIONS_SUCCESS = 'GET_TRANSLATIONS_SUCCESS'
const GET_TRANSLATIONS_FAILURE = 'GET_TRANSLATIONS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
function getTranslationsForLocale(locale) {
    dispatch(getTranslationsRequest())

    dispatch({
        type: GET_TRANSLATIONS_SUCCESS,
        messages: []
    })

    // Use this when async is ready
    // dispatch({
    //     [CALL_API]: {
    //         endpoint: `translate/${locale}`,
    //         types: [GET_TRANSLATIONS_REQUEST, GET_TRANSLATIONS_SUCCESS, GET_TRANSLATIONS_FAILURE]
    //     }
    // }).then(data => {
    //     dispatch({
    //         type: GET_TRANSLATIONS_SUCCESS,
    //         isFetching: false,
    //         data: data
    //     })
    // }).catch(() => {
    //     dispatch({
    //         type: GET_TRANSLATIONS_FAILURE,
    //         isFetching: false
    //     })
    // })
}

function getTranslationsRequest() {
    return { type: GET_TRANSLATIONS_REQUEST }
}

function getTranslatedMessage(key) {
    return formatMessage()
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [GET_TRANSLATIONS_REQUEST]: (state) => {
        return Object.assign({}, state, {
            isFetching: true
        })
    },
    [GET_TRANSLATIONS_SUCCESS]: (state, data) => {
        return Object.assign({}, state, {
            isFetching: false
        })
    },
    [GET_TRANSLATIONS_FAILURE]: state => {
        return Object.assign({}, state, {
            isFetching: false
        })
    }
}


const initialState = {
    data: [],
    isFetching: false
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
    getTranslationsForLocale
}