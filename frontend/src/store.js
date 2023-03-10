import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers.js";

// import logger from "redux-logger";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
});
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

// const store = configureStore(
//   {reducer:{},
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// });

const store = configureStore({
  reducer,
  initialState,
  middleware: [...middleware],
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat(applyMiddleware(...middleware)),

  //   middleware: composeWithDevTools(applyMiddleware(...middleware)),
  // composeWithDevTools(applyMiddleware(...middleware))
});
export default store;
