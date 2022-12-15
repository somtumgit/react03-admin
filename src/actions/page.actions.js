import axios from "../helpers/axios";
import { pageConstants } from "./constants";

export const createPage = (form) => {
    return async function(dispatch) {
        const token = window.localStorage.getItem('token');
        // console.log(token);
        dispatch({type: pageConstants.CREATE_PAGE_REQUEST});
        await axios.post('page/create',form,{ headers: { Authorization: `Bearer ${token}` }}).then(res => {
            if(res.status === 201) {
                // console.log('res',res);
                const {page} = res.data;
                // console.log('page',page);
                dispatch({
                    type: pageConstants.CREATE_PAGE_SUCCESS,
                    payload: {
                        page: page
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
                    // console.log(error.response.data.error);
                    if(error.response.data.error.code = '1100') {
                        dispatch({
                            type: pageConstants.CREATE_PAGE_FAILURE,
                            payload: {
                                error: 'Duplicate category!'
                            }
                        });
                    }else {
                        dispatch({
                            type: pageConstants.CREATE_PAGE_FAILURE,
                            payload: {
                                error: error.response.data.error
                            }
                        });
                    }
                    
                }
                
            }
        });
    }
}