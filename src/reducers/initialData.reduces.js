import { initialDataConstants } from "../actions/constants";
import { initSate as init } from "./initState";

const initState = init;
// const initState = {
//     message: '',
//     error: null,
//     loading: false,
//     type: ''
// }

export default function(state = initState,action) {
    // console.log(action);
    switch(action.type) {
        case initialDataConstants.GET_INITIAL_DATA_REQUEST:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    initial: {
                        ...state.adminApp.initial,
                        loading: true,
                        type: action.type
                    },
                    
                }
            }
            break;
        case initialDataConstants.GET_INITIAL_DATA_SUCCESS:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    initial: {
                        ...state.adminApp.initial,
                        message: action.payload.message,
                        error: null,
                        loading: false,
                        type: action.type
                    }
                }
            }
            break;
        case initialDataConstants.GET_INITIAL_DATA_FAILURE:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    initial: {
                        ...state.adminApp.initial,
                        error: action.payload.error,
                        loading: false,
                        type: action.type
                    }
                }
            }
            break;
    }

   return state;
}