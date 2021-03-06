import { storage } from '../utils'

const BASE_URL = 'http://localhost:3001/v1/'

function callApi(endpoint, authenticated) {

    return storage.load({
        key: 'id_token'
    }).then(res => {
        let config = {}

        if (authenticated) {
            config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }

            fetch(BASE_URL + endpoint, config)
                .then(response =>
                    response.text()
                        .then(text => ({ text, response }))
                ).then(({ text, response }) => {
                if (!response.ok) {
                    return Promise.reject(text)
                }

                return text
            }).catch(err => console.log(err))
        }
    }).catch((err, res) => {
        console.log('error: ', err)
        console.log('response: ', res)
    })
}

export const CALL_API = 'CALL_API'

export default store => next => action => {

    const callAPI = action[CALL_API]

    // So the middleware doesn't get applied to every single action
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint, types, authenticated } = callAPI

    const [ requestType, successType, errorType ] = types

    // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
    return callApi(endpoint, authenticated).then(
        response =>
            next({
                response: JSON.parse(response),
                authenticated,
                type: successType
            }),
        error => next({
            error: error.message || 'There was an error.',
            type: errorType
        })
    )
}
