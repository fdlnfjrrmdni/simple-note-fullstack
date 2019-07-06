const initialState = {
    data: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default categories = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES_FULFILLED':
            return {
                data: action.payload.data.data
            }

        case 'ADD_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'ADD_CATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                categories: [...state.categories, action.payload.data]
            }
        case 'ADD_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'DELETE_CATEGORIES_PENDING':
            return {
                ...state,
                isLoading: true,
            };

        case 'DELETE_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        case 'DELETE_CATEGORIES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: [...state]
            };

        default:
            return state;
    }
}