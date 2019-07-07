const initialState = {
    notes: [],
    page: [],
    isLoading: false,
    isFinish: false,
    isError: false,
    // totalPage: 0
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
                // totalPage: action.payload.totalPage,
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

        // case 'MORE_NOTES_PENDING':
        //     return {
        //         ...state,
        //         isLoading: true,
        //         isError: false
        //     }
        // case 'MORE_NOTES_FULFILLED':
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isError: false,
        //         // page: action.payload.data.page,
        //         data: [...state.notes, ...action.payload.data.data]
        //     }
        // case 'MORE_NOTES_REJECTED':
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isError: true
        //     }

        default:
            return state;
    }
}