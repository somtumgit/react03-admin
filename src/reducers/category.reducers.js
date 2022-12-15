import { categoryConstants } from "../actions/constants";
import { initSate as init } from "./initState";

const initState = init;
// const initState = {
//     categories: [],
//     message: '',
//     error: null,
//     loading: false,
//     type: ''
// }

const buildNewCategories = function(parentId, categories, category) {
    let categoryArr = [];

    if(parentId == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
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

export default function(state = initState,action) {
    // console.log(action);
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
                    
                }
            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
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
                    
                }
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
                    
                }
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
                    
                }
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
                }
                
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
                }
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
                }
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
                }
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
                }
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
                }
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
                }
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
                }
            }
            break;
    }

   return state;
}