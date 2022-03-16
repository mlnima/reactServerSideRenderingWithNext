import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import reducer from './adminRootReducer';
const middleware = [thunk];

export const adminStore = createStore(reducer, compose(applyMiddleware(...middleware)));