const initialstate = {
    items: [],
    isLoaded: false,
};

const pizzas = (state = initialstate, action) => {
    switch (action.type) {
        case 'SET_PIZZAS':
            return {
                ...state,
                items: action.payload,
                isLoaded: true,
            }

        case 'SET_LOADED':
            return {
                ...state,
                isLoaded: action.payload,
            }

        default:
            return state;
    }
}

export default pizzas;