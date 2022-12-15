import { authConstants } from "../actions/constants";
import { initSate as init } from "./initState";

const initState = init;
// const initState = {
//     token: null,
//     user: {
//         firstName: '',
//         lastName: '',
//         email: '',
//         picture: ''
//     },
//     message: '',
//     error: '',
//     authenticate: false,
//     authenticating: false
// }

export default function(state = initState,action) {
    console.log(action);
    switch(action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                auth: {
                    ...state.auth,
                    message: '',
                    error: '',
                    authenticating: true,
                    authenticate: false
                },
                type: action.type
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                auth: {
                    ...state.auth,
                    token: action.payload.token,
                    user: action.payload.user,
                    message: action.payload.message,
                    error: '',
                    authenticating: false,
                    authenticate: true
                },
                type: action.type
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                auth: {
                    ...state.auth,
                    message: '',
                    error: action.payload.error,
                    authenticating: false,
                    authenticate: false
                },
                type: action.type
                
            }
            break;

        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                auth: {
                    ...state.auth,
                    authenticating: true
                },
                type: action.type
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...state,
                auth: {
                    token: null,
                    user: {
                        firstName: '',
                        lastName: '',
                        email: '',
                        picture: ''
                    },
                    error: '',
                    authenticate: false,
                    authenticating: false,
                    message: action.payload.message,
                },
                type: action.type
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                auth: {
                    ...state.auth,
                    error: action.payload.error,
                    authenticating: false
                },
                type: action.type
            }
            break;
    }

   return state;
}