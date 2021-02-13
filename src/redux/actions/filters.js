export const setSortBy = ({type, order}) => ({ //type: "price", order: "desc"
    type: 'SET_SORT_BY',
    payload: {type, order}, 
})

export const setCategory = (catIndex) => ({
    type: 'SET_CATEGORY',
    payload: catIndex,
})
