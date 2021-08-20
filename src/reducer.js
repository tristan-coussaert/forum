export const initialState = {
    loggedinuser: null
}

const reducer = (state, action) => {
    
    switch(action.type){
        default:
        case 'SET_LOGIN':
            return {
                ...state,
                loggedinuser: action.user
            }
    }
}

export default reducer;