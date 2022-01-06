import axios from 'axios'


const HTTP = axios.create({
    baseURL:'https://ty-shop.herokuapp.com'
})

const JSONHTTP = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com/'
})


export default HTTP
export {JSONHTTP}