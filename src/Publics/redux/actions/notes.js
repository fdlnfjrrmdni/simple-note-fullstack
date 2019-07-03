import axios from 'axios';

export const getNotes = () => {
    return {
        type: 'GET_NOTES',
        payload: axios.get('http://192.168.6.130:9002/notes')
    }
};

export const getNotesAsc = () => {
    return {
        type: 'GET_NOTES_ASC',
        payload: axios.get('http://192.168.6.130:9002/notes&sort=asc')
    }
};

export const getNotesDesc = () => {
    return {
        type: 'GET_NOTES_DESC',
        payload: axios.get('http://192.168.6.130:9002/notes&sort=desc')
    }
};