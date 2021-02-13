const initialstate = {
    items: [],
    isLoaded: false,
};

const pizzas = (state = initialstate, action) => {
    switch (action.type) {
        case 'SET_PIZZAS':
            return {
                ...state, //Берем старый state изменяем в нем items: action.payload и isLoaded: true и возвращаем
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