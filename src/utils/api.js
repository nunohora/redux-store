import axios from 'axios'

const baseUrl = 'http://localhost:3001/v1/'

let user = localStorage.getItem('user');

function getRestaurantsByLocation(location) {
    return axios.get(`${ baseUrl }search`, {
        params: {
            location: location
        }
    })
}

function getRestaurantById(id) {
    return axios.get(`${ baseUrl }places/${ id }`)
}

function getRestaurantProducts(id) {
    return axios.get(`${ baseUrl }places/${ id }/products`)
}

function loginUser(params) {
    return axios({
        method: 'post',
        url: `${ baseUrl }login`,
        data: {
            email: params.email,
            password: params.password
        }
    })
}

export default () => ({
    getRestaurantsByLocation,
    getRestaurantById,
    getRestaurantProducts,
    loginUser
})