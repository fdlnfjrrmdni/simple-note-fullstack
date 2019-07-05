import axios from 'axios';

const origin = `http://192.168.6.129:9002/categories`;

export const getCategories = () => {
    return {
        type: 'GET_CATEGORIES',
        payload: axios.get(`${origin}`)
    }
};

export const addCategory = (data) => {
    return {
        type: "ADD_CATEGORY",
        payload: axios.post(origin, data)
    }
}