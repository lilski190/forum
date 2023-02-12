import * as authenticationActions from '../actions/AuthenticationAction'

const inatialState ={
    user : null,
    loginPending: false,
    showLoginDialog: false,
    error: null
};

function rootReducer(state = inatialState, action){
    console.log("in Reucer: " + action.type)
    
    switch(action.type)
    {
        case authenticationActions.SHOW_LOGIN_DIALOG:
        return {
            ...state,
            showLoginDialog: true,
            error: null
        }
        case authenticationActions.HIDE_LOGIN_DIALOG:
        return {
            ...state,
            showLoginDialog: false,
            error: null
        }
        case authenticationActions.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                showLoginDialog: false,
                pending: false, 
                user: action.user,
                accessToken: action.accessToken,
                error: null
            }
            case authenticationActions.AUTHENTICATION_ERROR:
                return {
                    ...state,
                    pending: false,
                    error: 'Authenticaton Failed :('
                }
            case authenticationActions.AUTHENTICATION_PENDING:
                return {
                    ...state,
                    pending: true,
                    error: null
                }
       default:
        return state;
    }
    
    
};

export default rootReducer;