import * as userActions from "./userActions";
const InitialState = {
    usersList: [],
    currentUser: {},
    token: null,
    error: null,
    loading: false
}

const userReducer = ( state= InitialState,action )=>{
    switch(action.type){
        case  userActions.GET_ALL_USERS:
            return {
                ...state,
                error: null,
                usersList: action.payload,
            }
        case userActions.USER_LOGIN:
            return {
                ...state,
                error: null,
                currentUser: action.payload,
                token: action.payload?.token,
            }
        case userActions.USER_LOGOUT:
            return {
                ...state,
                error: null,
                currentUser: {}
            }
        case userActions.ERROR_LOGIN:
            return {
                ...state, 
                error: action?.payload?.error
            }
        case userActions.NULL_THE_ERROR:
            return {
                ...state,
                error: null
            }
            default: 
               return state
    }
        
}

export default userReducer;