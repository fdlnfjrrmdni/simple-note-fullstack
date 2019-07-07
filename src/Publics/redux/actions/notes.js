import axios from 'axios';

const origin = `http://192.168.6.129:9002/notes`;

export const fetch = (search ='', sort='', limit='', searchBy='') => {
    let url = `${origin}?search=${search}&search_by=${searchBy}&sort=${sort}&limit=${limit}`;
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

export const editNote = (id, data) => {
    return {
        type: "EDIT_NOTE",
        payload: axios.patch(`${origin}/${id}`, data)
    }
}

export const deleteNote = (id) => {
    return {
        type: "DELETE_NOTE",
        payload: axios.delete(`${origin}/${id}`)
    }
}