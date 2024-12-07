import { SET_USER, CLEAR_USER } from '../actions/authActions'

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null, 
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload }
        case CLEAR_USER:
            localStorage.removeItem('user')
            localStorage.removeItem('userId')
            return { ...state, user: null }
        default:
            return state
    }
}

export default authReducer