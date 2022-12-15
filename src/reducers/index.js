import {combineReducers} from "redux";
import stateReducer from "./state.reducers";
// import authReducer from "./auth.reducers";
// import userReducer from "./user.reducers";
// import categoryReducer from "./category.reducers";
// import productReducer from "./product.reducers";
// import orderReducer from "./order.reducers";
// import initialDataReduces from "./initialData.reduces";

const rootReducer = combineReducers({
    state: stateReducer,
    // auth: authReducer,
    // user: userReducer,
    // category: categoryReducer,
    // product: productReducer,
    // order: orderReducer,
    // initailData: initialDataReduces,
});

export default rootReducer;

