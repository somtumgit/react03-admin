import { userConstants } from "../actions/constants";

const initState = {
    message: '',
    error: null,
    loading: false
}

export default function(state = initState,action) {
    // console.log(action);
    switch(action.type) {
        case userConstants.REGISTER_REQUEST:
            state = {
                ...initState,
                loading: true
            }
            break;
        case userConstants.REGISTER_SUCCESS:
            state = {
                ...initState,
                message: action.payload.message,
                error: null,
                loading: false
            }
            break;
        case userConstants.REGISTER_FAILURE:
            state = {
                ...initState,
                error: action.payload.error,
            }
    }

   return state;
}