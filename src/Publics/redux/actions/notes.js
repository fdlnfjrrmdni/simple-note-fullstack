import axios from 'axios';

export const getNotes = (search ='', sort='', limit=10) => {
    let url = `http://192.168.6.129:9002/notes?search=${search}&sort=${sort}&limit=${limit}`;
    return {
        type: 'GET_NOTES',
        payload: axios.get(url)
    }
};