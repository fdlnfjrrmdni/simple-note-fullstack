const initialState = {
    number: 0,
    data: [],
    results: [],
    isLoading: false
}

export default notes = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_NOTES_PENDING':
            return {
                isLoading: true
            }

        case 'GET_NOTES_REJECTED':
            return {
                isLoading: false
            }

        case 'GET_NOTES_FULFILLED':
            return {
                isLoading: false,
                data: action.payload.data.data
            }

        default:
            return state;
    }
}