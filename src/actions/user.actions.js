import axios from "../helpers/axios";
import { userConstants } from "./constants";

export const register = function(registerData) {
    console.log(registerData);

    return async (dispatch) => {
        dispatch({type: userConstants.REGISTER_REQUEST});
        await axios.post(`/admin/signup`, {
            ...registerData
        }).then(res => {
            if(res.status === 201) {
                const {message} = res.data.message;
                dispatch({
                    type: userConstants.REGISTER_SUCCESS,
                    payload: {
                        message: message,
                    }
                });
            }
        }).catch(function (error) {
            // if status = 400
            if (error.response) {
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if(error.response.status === 400) {
                    dispatch({
                        type: userConstants.REGISTER_FAILURE,
                        payload: {
                            error: error.response.data.error
                        }
                    });
                }
                
            }
        });
        
    }
}