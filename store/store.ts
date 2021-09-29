import {applyMiddleware, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducer from './reducers';
import {Context, createWrapper} from 'next-redux-wrapper';
const debug = false;
//const debug = process.env.NODE_ENV === "development";

export const makeStore = (context: Context) => {
    return createStore(reducer,
        process.env.NODE_ENV === "production" ?
            compose(applyMiddleware(thunk)) :
            composeWithDevTools(applyMiddleware(thunk))
    );
};

// @ts-ignore
export const wrapper = createWrapper(makeStore, {debug});

