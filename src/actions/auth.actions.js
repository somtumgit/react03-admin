import axios from "../helpers/axios";
import { authConstants, userConstants } from "./constants";
import jwt_decode  from 'jwt-decode';

export const login = function(user) {
    console.log(user);

    return async (dispatch) => {
        dispatch({type: authConstants.LOGIN_REQUEST});
        await axios.post(`/admin/signin`, {
            ...user  
        }).then(res => {
            console.log(res);
            if(res.status === 200) {
                const {token,user,message} = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                // console.log(token);
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token: token,
                        user: user,
                        message: message
                    }
                });
                console.log(window.store.getState());
            }
        }).catch(function (error) {
            // if status = 400
            if (error.response) {
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if(error.response.status === 400) {
                    dispatch({
                        type: authConstants.LOGIN_FAILURE,
                        payload: {
                            error: error.response.data.error
                        }
                    });
                }
                
            }
        });
        
    }
}

export const isUserLoggedIn = function() {
    return async function(dispatch) {
        const token = localStorage.getItem('token');
        // console.log('isUserLoggedIn',token);
        // console.log(jwt_decode(token));
        if(token) {
            if (jwt_decode(token).exp < Date.now() / 1000) {
                // next(action);
                localStorage.clear();
                dispatch({
                    type: authConstants.LOGOUT_SUCCESS,
                    payload: {
                        message: 'Token expired!'
                    }
                });
            }else {
                const user = JSON.parse(window.localStorage.getItem('user'));
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token: token,
                        user: user
                    }    
                })
            }
            
        }else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: 'Failed to login!'
                }
            });
        }
    };
}

export const logout = function() {
    return async function(dispatch) {
        const token = window.localStorage.getItem('token');
        // console.log(token);
        dispatch({type: authConstants.LOGOUT_REQUEST});
        
        await axios.post(`/admin/signout`,{},{ headers: { 'Authorization': `Bearer ${token}` }}).then(res => {
            // console.log(res);
            if(res.status === 200) {
                localStorage.clear();
                const {message} = res.data;
                dispatch({
                    type: authConstants.LOGOUT_SUCCESS,
                    payload: {
                        message: message
                    }
                });
            }
        }).catch(function (error) {
            // if status = 400
            if (error.response) {
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                console.log(error.response);
                if(error.response.status === 400) {
                    dispatch({
                        type: authConstants.LOGOUT_FAILURE,
                        payload: {
                            error: error.response.data.error
                        }
                    });
                }
                
            }
        });

        
    }
}



