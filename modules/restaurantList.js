import { CALL_API } from 'redux/middleware/api'
import _ from 'underscore'

export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function getRestListByLocation(dispatch, postcode) {
    dispatch(searchRequest(postcode))

    dispatch({
        [CALL_API]: {
            endpoint: `search?location=${postcode}`,
            types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE]
        }
    })
}

function searchRequest(postcode) {
    return {
        type: SEARCH_REQUEST,
        isFetching: true,
        postcode: postcode
    }
}
function setCategories(list, totalResults) {
    const cats = [{
        id: 0,
        name: 'Total',
        number: totalResults
    }];

    list.map(restaurant => {
        restaurant.categories.map(cat => {

            const { name } = cat
            const exists = _.findWhere(cats, { name: name })

            if (exists) {
                exists.number = exists.number + 1
            }
            else {
                cats.push({
                    id: cats.length,
                    name: cat.name,
                    number: 1
                })
            }
        })
    })

    return cats
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SEARCH_REQUEST]: (state, data) => {
        return Object.assign({}, state, {
            isFetching: true,
            postcode: data.postcode
        })
    },
    [SEARCH_SUCCESS]: (state, data) => {
        return Object.assign({}, state, {
            postcode: data.postcode,
            categories: setCategories(data.response.search, data.response.meta.total_results),
            list: data.response.search,
            number: data.response.meta.total_results,
            isFetching: false
        })
    },
    [SEARCH_FAILURE]: (state) => {
        return Object.assign({}, state, {
            isFetching: false
        })
    }
}


const initialState = {
    postcode: '',
    categories: [],
    list: [],
    number: 0,
    isFetching: false
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function restaurantListReducer(state = initialState, action = {}) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}