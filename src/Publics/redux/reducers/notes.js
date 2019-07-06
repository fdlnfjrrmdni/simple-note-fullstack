const initialState = {
    notes: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default notes = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_NOTE_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'FETCH_NOTE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                data: action.payload.data.data
            }

        case 'FETCH_NOTE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'ADD_NOTE_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'ADD_NOTE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                notes: [...state.notes, action.payload.data]
            }

        case 'ADD_NOTE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'EDIT_NOTE_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'EDIT_NOTE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                notes: state.notes.map(note =>
                    (note.id == action.payload.data.id) ?
                        action.payload.data : note
                )
            }
            
        case 'EDIT_NOTE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'DELETE_NOTES_PENDING':
            return {
                ...state,
                isLoading: true,
            };

        case 'DELETE_NOTES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        case 'DELETE_NOTES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: [...state]
            };

        default:
            return state;
    }
}