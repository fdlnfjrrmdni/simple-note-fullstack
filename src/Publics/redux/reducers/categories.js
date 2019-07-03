const initialState = {
    number: 0,
    data: [],
    results: []
}

export default categories = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES_FULFILLED':
            return {
                data: action.payload.data.data
            }

        default:
            return state;
    }
}