import React from "react";
import ReduxThunk from 'redux-thunk';
import { render } from "react-dom";
import { App } from "./app";
import {Provider} from 'react-redux';
import {stanfordApp} from "./reducers/reducers";
import {createStore, applyMiddleware} from 'redux';
import Cookies from "js-cookie";

if (module.hot) {
    module.hot.accept();
}

var touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
if (!touchsupport){ // browser doesn't support touch
    document.documentElement.className += " non-touch"
}

window.getHeader = {
    method: 'get',
    credentials: "same-origin",
    headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Accept": "application/json",
        "Content-Type": "application/json",
        "cache-control": "reload"
    },
};


window.postFormHeader = {
    method: 'post',
    credentials: "same-origin",
    headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "cache-control": "reload"
    },
};

window.postHeader = {
    method: 'post',
    credentials: "same-origin",
    headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Accept": "application/json",
        "Content-Type": "application/json",
        "cache-control": "reload"
    },
};

window.putHeader = {
    method: 'put',
    credentials: "same-origin",
    headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Accept": "application/json",
        "Content-Type": "application/json",
        "cache-control": "reload"
    },
};

window.deleteHeader = {
    method: 'delete',
    credentials: "same-origin",
    headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Accept": "application/json",
        "Content-Type": "application/json",
        "cache-control": "reload"
    },
};

window.store = createStore(stanfordApp, applyMiddleware(ReduxThunk));

render(<Provider store={store}><App /></Provider>, document.getElementById('react-app'));