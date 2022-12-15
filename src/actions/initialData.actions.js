import axios from "../helpers/axios";
import { categoryConstants,productConstants,initialDataConstants,orderConstants } from "./constants";

export const getInitailData = function() {
    return async function(dispatch) {
        const token = window.localStorage.getItem('token');
        // console.log(token);
        dispatch({type: initialDataConstants.GET_INITIAL_DATA_REQUEST});
        await axios.post('initialdata', {}, { headers: { Authorization: `Bearer ${token}` }})
        .then(res => {
            if(res.status === 200) {
                // console.log(res);
                const {categoryList, products, orders} = res.data;
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                    payload: {
                        categoryList: categoryList
                    }
                });
                dispatch({
                    type: productConstants.GET_ALL_PRODUCT_SUCCESS,
                    payload: {
                        products: products
                    }
                });
                dispatch({
                    type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                    payload: { orders },
                });
                dispatch({
                    type: initialDataConstants.GET_INITIAL_DATA_SUCCESS,
                    payload: {
                        message: 'Initail Data Loaded successfully!'
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
                        type: initialDataConstants.GET_INITIAL_DATA_FAILURE,
                        payload: {
                            error: error.response.data.error
                        }
                    });
                }
                
            }
        });
    }
}