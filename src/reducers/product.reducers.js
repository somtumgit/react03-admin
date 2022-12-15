import { productConstants } from "../actions/constants";
import { initSate as init } from "./initState";

const initState = init;
// const initState = {
//     products: [],
//     message: '',
//     error: null,
//     loading: false
// }

const buildNewProducts = function(products,product) {
    let productArr = [];
    productArr.push({
        ...products,
        product
    });

    return productArr;
}

export default function(state = initState,action) {
    // console.log(action);
    switch(action.type) {
        case productConstants.GET_ALL_PRODUCT_REQUEST:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    product: {
                        ...state.adminApp.product,
                        loading: true
                    }
                    
                }
            }
            break;
        case productConstants.GET_ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    product: {
                        ...state.adminApp.product,
                        products: action.payload.products,
                        error: null,
                        loading: false
                    }
                    
                }
            }
            break;
        case productConstants.GET_ALL_PRODUCT_FAILURE:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    product: {
                        ...state.adminApp.product,
                        error: action.payload.error,
                        loading: false
                    }
                    
                }
            }
            break;
        case productConstants.ADD_PRODUCT_REQUEST:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    product: {
                        ...state.adminApp.product,
                        loading: true
                    }
                }
            }
            break;
        case productConstants.ADD_PRODUCT_SUCCESS:
            const product = action.payload.product;
            const updatedProducts = buildNewProducts(state.products,product);
            console.log(updatedProducts);
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    product: {
                        ...state.adminApp.product,
                        categories: updatedProducts,
                        error: null,
                        loading: false
                    }
                }
            }
            break;
        case productConstants.ADD_PRODUCT_FAILURE:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    product: {
                        ...state.adminApp.product,
                        error: action.payload.error,
                        loading: false
                    }
                }
            }
            break;
    }

   return state;
}