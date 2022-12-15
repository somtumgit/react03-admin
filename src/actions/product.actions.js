import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getAllProduct = function() {
    return async function(dispatch) {
       const token = window.localStorage.getItem('token');
       // console.log(token);
       dispatch({type: productConstants.GET_ALL_PRODUCT_REQUEST});
       await axios.get('product/get',{ headers: { Authorization: `Bearer ${token}` }}).then(res => {
           if(res.status === 200) {
               // console.log(res);
               const {products} = res.data;
               dispatch({
                   type: productConstants.GET_ALL_PRODUCT_SUCCESS,
                   payload: {
                    products: products
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
                       type: productConstants.GET_ALL_PRODUCT_FAILURE,
                       payload: {
                           error: error.response.data.error
                       }
                   });
               }
               
           }
       });
    }
}

export const addProduct = function(form) {
   return async function(dispatch) {
       dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
       await axios.post('product/create', form).then(function(res) {
           console.log(res);
           if(res.status === 201) {
               dispatch({
                    type: productConstants.ADD_PRODUCT_SUCCESS,
                    payload: {
                        product: res.data.product
                    }
               });
               dispatch(getAllProduct());
           }
       }).catch(function(error) {
           // if status = 400
           if (error.response) {
               // console.log(error.response.data);
               // console.log(error.response.status);
               // console.log(error.response.headers);

               if(error.response.status === 400) {
                   dispatch({
                       type: productConstants.ADD_PRODUCT_FAILURE,
                       payload: {
                           error: error.response.data.error
                       }
                   });
               }
               
           }
       });
   }
}

export const deleteProductById = (payload) => {
    return async (dispatch) => {
      try {
        const token = window.localStorage.getItem('token');
        dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST });
        await axios.delete(`product/deleteProductById`, {
          data: { payload },
        },{ headers: { Authorization: `Bearer ${token}` }}).then(res => {
            if(res.status === 202) {
                // console.log(res);
                dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS });
                dispatch(getAllProduct());
            }
        }).catch(function (error) {
            // if status = 400
            if (error.response) {
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if(error.response.status === 400) {
                    dispatch({
                        type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
                        payload: {
                            error: error.response.data.error
                        }
                    });
                }
                
            }
        });
        
      } catch (error) {
        console.log(error);
      }
    };
}