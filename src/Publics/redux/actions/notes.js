import axios from 'axios';

const origin = `http://192.168.6.129:9002/notes`;

export const fetch = (search ='', sort='', limit=10) => {
    let url = `${origin}?search=${search}&sort=${sort}&limit=${limit}`;
    return {
        type: "FETCH_NOTE",
        payload: axios.get(url)
    }
}

export const addNote = (data) => {
    return {
        type: "ADD_NOTE",
        payload: axios.post(origin, data)
    }
}