import axios from 'axios'

const baseUrl = 'http://localhost:3001/v1/'

let user = localStorage.getItem('user');

export function getRestaurantsByLocation(location) {
    return axios.get(`${ baseUrl }search`, {
        params: {
            location: location
        }
    })
}

export function getRestaurantById(id) {
    return axios.get(`${ baseUrl }places/${ id }`)
}

export function getRestaurantProducts(id) {
    return axios.get(`${ baseUrl }places/${ id }/products`)
}

export function loginUser(params) {
    return axios({
        method: 'post',
        url: `${ baseUrl }login`,
        data: {
            email: params.email,
            password: params.password
        }
    })
}