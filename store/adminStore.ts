import {applyMiddleware, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import adminRootReducer from './adminRootReducer';
import {Context, createWrapper} from 'next-redux-wrapper';

//NOT IN USE
const debug = false;
//process.env.NODE_ENV === "development";

export const makeStore = (context: Context) => {
    return createStore(adminRootReducer,
        process.env.NODE_ENV === "production" ?
            compose(applyMiddleware(thunk)) :
            composeWithDevTools(applyMiddleware(thunk))
    );
};

export const wrapper = createWrapper(makeStore, {debug});