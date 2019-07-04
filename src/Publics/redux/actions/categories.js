import axios from 'axios';

export const getCategories = () => {
    return {
        type: 'GET_CATEGORIES',
        payload: axios.get('http://192.168.6.129:9002/categories')
    }
};