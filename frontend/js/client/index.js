import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Application from "./Application";
import {getCombinedReducer} from './Reducers/CombinedReducer';



function domReady(callback) {
    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', function fn() {
        document.removeEventListener('DOMContentLoaded', fn);
        callback();
        });
    } else {
        callback();
    }
}

domReady(() => {
    const store = createStore(
        getCombinedReducer(), 
        applyMiddleware(thunk));

    render(
        <Provider store={store}>
            <Application />
        </Provider>,  
        document.querySelector('#react-app-root'), 
        () => {
            console.log('app rendered');
        });
});