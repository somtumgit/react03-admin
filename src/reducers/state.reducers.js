import { initSate as init } from "./initState";
import { authConstants,userConstants,categoryConstants,productConstants,initialDataConstants,pageConstants, orderConstants } from "../actions/constants";

const initState = init;

const buildNewCategories = function(parentId, categories, category) {
    let categoryArr = [];

    if(parentId == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: []
            }
        ]
    }

    for(let cat of categories) {
        if(cat._id === parentId){
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: []
            };
            categoryArr.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory]: [newCategory]
                // children: cat.children ? buildNewCategories(parentId, [
                //     ...cat.children,
                //     {_id: category._id, name: category.name, slug: category.slug, parentId: category.parentId, children: category.children }
                // ], category) : []
            });
        }else {
            categoryArr.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }
        
    }

    return categoryArr;
}

const buildNewProducts = function(products,product) {
    let productArr = [];
    productArr.push({
        ...products,
        product
    });

    return productArr;
}

const authReducer = function(state,action) {
    // console.log('authReducers');
    switch(action.type) {
        case authConstants.LOGIN_REQUEST:
            // console.log('authConstants.LOGIN_REQUEST');
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
            // console.log('authConstants.LOGIN_REQUEST',state);
            break;
        case authConstants.LOGIN_SUCCESS:
            // console.log('authConstants.LOGIN_SUCCESS');
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
            // console.log('authConstants.LOGIN_SUCCESS',state);
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

const userReducer = function(state,action) {
    switch(action.type) {
        case userConstants.REGISTER_REQUEST:
            state = {
                ...state,
                user: {
                    ...state.user,
                    loading: true
                },
                type: action.type
            }
            break;
        case userConstants.REGISTER_SUCCESS:
            state = {
                ...state,
                user: {
                    message: action.payload.message,
                    error: null,
                    loading: false
                },
                type: action.type
            }
            break;
        case userConstants.REGISTER_FAILURE:
            state = {
                ...state,
                user: {
                    error: action.payload.error,
                },
                type: action.type
            }
    }

    return state;
}

const categoryReducer = function(state,action) {
    switch(action.type) {
        case categoryConstants.GET_ALL_CATEGORY_REQUEST:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    category: {
                        ...state.adminApp.category,
                        loading: true,
                        type: action.type
                    }
                    
                },
                type: action.type
            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            // console.log('category.actions.categoryList',action.payload.categoryList)
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    category: {
                        ...state.adminApp.category,
                        categories: action.payload.categoryList,
                        error: null,
                        loading: false,
                        type: action.type
                    }
                    
                },
                type: action.type
            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_FAILURE:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    category: {
                        ...state.adminApp.category,
                        error: action.payload.error,
                        loading: false,
                        type: action.type
                    }
                    
                },
                type: action.type
            }
            break;
        case categoryConstants.ADD_CATEGORY_REQUEST:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    category: {
                        ...state.adminApp.category,
                        loading: true,
                        type: action.type
                    }
                    
                },
                type: action.type
            }
            break;
        case categoryConstants.ADD_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentId,state.categories,category);
            console.log(updatedCategories);
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    category: {
                        ...state.adminApp.category,
                        categories: updatedCategories,
                        error: null,
                        loading: false,
                        type: action.type
                    }
                },
                type: action.type
            }
            break;
        case categoryConstants.ADD_CATEGORY_FAILURE:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    category: {
                        ...state.adminApp.category,
                        error: action.payload.error,
                        loading: false,
                        type: action.type
                    }
                },
                type: action.type
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_REQUEST:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    category: {
                        ...state.adminApp.category,
                        loading: true,
                        type: action.type
                    }
                },
                type: action.type
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    category: {
                        ...state.adminApp.category,
                        // categories: action.payload.categories,
                        error: null,
                        loading: false,
                        type: action.type
                    }
                },
                type: action.type
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_FAILURE:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    category: {
                        ...state.adminApp.category,
                        error: action.payload.error,
                        loading: false,
                        type: action.type
                    }
                },
                type: action.type
            }
            break;

        case categoryConstants.DELETE_CATEGORY_REQUEST:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    category: {
                        ...state.adminApp.category,
                        loading: true,
                        type: action.type
                    }
                },
                type: action.type
            }
            break;
        case categoryConstants.DELETE_CATEGORY_SUCCESS:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    category: {
                        ...state.adminApp.category,
                        // categories: action.payload.categories,
                        error: null,
                        loading: false,
                        type: action.type
                    }
                },
                type: action.type
            }
            break;
        case categoryConstants.DELETE_CATEGORY_FAILURE:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    category: {
                        ...state.adminApp.category,
                        error: action.payload.error,
                        loading: false,
                        type: action.type
                    }
                },
                type: action.type
            }
            break;
    }

    return state;
}

const productReducer = function(state,action) {
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
                    
                },
                type: action.type
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
                    
                },
                type: action.type
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
                    
                },
                type: action.type
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
                },
                type: action.type
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
                        // products: updatedProducts,
                        error: null,
                        loading: false
                    }
                },
                type: action.type
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
                },
                type: action.type
            }
            break;


            case productConstants.DELETE_PRODUCT_BY_ID_REQUEST:
                state = {
                    ...state,
                    adminApp: {
                        ...state.adminApp,
                        product: {
                            ...state.adminApp.product,
                            loading: true
                        }
                    },
                    type: action.type
                }
                break;
            case productConstants.DELETE_PRODUCT_BY_ID_SUCCESS:
                state = {
                    ...state,
                    adminApp: {
                        ...state.adminApp,
                        product: {
                            ...state.adminApp.product,
                            error: null,
                            loading: false
                        }
                    },
                    type: action.type
                }
                break;
            case productConstants.DELETE_PRODUCT_BY_ID_FAILURE:
                state = {
                    ...state,
                    adminApp: {
                        ...state.adminApp,
                        product: {
                            ...state.adminApp.product,
                            error: action.payload.error,
                            loading: false
                        }
                    },
                    type: action.type
                }
                break;
    }

    return state;
}

const initialDataReducer = function(state,action) {
    switch(action.type) {
        case initialDataConstants.GET_INITIAL_DATA_REQUEST:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    initailData: {
                        ...state.adminApp.initailData,
                        loading: true,
                        type: action.type
                    },
                    
                },
                type: action.type
            }
            break;
        case initialDataConstants.GET_INITIAL_DATA_SUCCESS:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    initailData: {
                        ...state.adminApp.initailData,
                        message: action.payload.message,
                        error: null,
                        loading: false,
                        type: action.type
                    }
                },
                type: action.type
            }
            break;
        case initialDataConstants.GET_INITIAL_DATA_FAILURE:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    initailData: {
                        ...state.adminApp.initailData,
                        error: action.payload.error,
                        loading: false,
                        type: action.type
                    }
                },
                type: action.type
            }
            break;
    }

    return state;
}

const pageReducer = function(state,action) {
    switch(action.type) {
        case pageConstants.CREATE_PAGE_REQUEST:
            console.log('state',action);
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    page: {
                        ...state.adminApp.page,
                        loading: true,
                        type: action.type
                    },
                    
                },
                type: action.type
            }
            break;
        case pageConstants.CREATE_PAGE_SUCCESS:
            console.log('state',action);
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    page: {
                        ...state.adminApp.page,
                        pages: action.payload.page,
                        error: null,
                        loading: false,
                        type: action.type
                    }
                },
                type: action.type
            }
            break;
        case pageConstants.CREATE_PAGE_FAILURE:
            console.log('state',action);
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    page: {
                        ...state.adminApp.page,
                        error: action.payload.error,
                        loading: false,
                        type: action.type
                    }
                },
                type: action.type
            }
            break;
    }

    return state;
}

const orderReducer = function(state,action) {
    switch (action.type) {
        case orderConstants.GET_CUSTOMER_ORDER_REQUEST:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    order: {
                        ...state.adminApp.order,
                        loading: true,
                        type: action.type
                    }
                },
                type: action.type
            };
            break;
        case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    order: {
                        ...state.adminApp.order,
                        orders: action.payload.orders,
                        error: null,
                        loading: false,
                        type: action.type
                    }
                },
                type: action.type
            };
            break;
        case orderConstants.GET_CUSTOMER_ORDER_FAILURE:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    order: {
                        ...state.adminApp.order,
                        error: action.payload.error,
                        loading: false,
                        type: action.type
                    }
                },
                type: action.type
            };
            break;


        case orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    order: {
                        ...state.adminApp.order,
                        loading: true,
                        type: action.type
                    }
                },
                type: action.type
            };
            break;
        case orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    order: {
                        ...state.adminApp.order,
                        error: null,
                        loading: false,
                        type: action.type
                    }
                },
                type: action.type
            };
            break;
        case orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE:
            state = {
                ...state,
                adminApp: {
                    ...state.adminApp,
                    order: {
                        ...state.adminApp.order,
                        error: action.payload.error,
                        loading: false,
                        type: action.type
                    }
                },
                type: action.type
            };
            break;
    }
    
    return state;
}

export default function(state = initState,action) {
    // console.log('state',action);
    // console.log('state',state);
    state = authReducer(state, action);
    state = userReducer(state, action);
    state = categoryReducer(state, action);
    state = productReducer(state, action);
    state = initialDataReducer(state, action);
    state = pageReducer(state, action);
    state = orderReducer(state, action);
    // switch(action.type) {
        
    // }
    // console.log('state',state);

   return state;
}