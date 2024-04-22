import React from "react";
import ReduxThunk from 'redux-thunk';
import { render } from "react-dom";
import { App } from "./app";
import {Provider} from 'react-redux';
import {stanfordApp} from "./reducers/reducers";
import {createStore, applyMiddleware} from 'redux';
import Cookies from "js-cookie";
import 'babel-polyfill';
import 'draft-js/dist/Draft.css';

if (module.hot) {
    module.hot.accept();
}

var touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
if (!touchsupport){ // browser doesn't support touch
    document.documentElement.className += " non-touch"
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

window.getHeader = {
    method: 'get',
    credentials: "same-origin",
    headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Accept": "application/json",
        "Content-Type": "application/json",
        "cache-control": "no-cache"
    },
};


window.postFormHeader = {
    method: 'post',
    credentials: "same-origin",
    headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "cache-control": "no-cache"
    },
};

window.postHeader = {
    method: 'post',
    credentials: "same-origin",
    headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Accept": "application/json",
        "Content-Type": "application/json",
        "cache-control": "no-cache"
    },
};

window.putHeader = {
    method: 'put',
    credentials: "same-origin",
    headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Accept": "application/json",
        "Content-Type": "application/json",
        "cache-control": "no-cache"
    },
};

window.patchHeader = {
    method: 'PATCH',
    credentials: "same-origin",
    headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Accept": "application/json",
        "Content-Type": "application/json",
        "cache-control": "no-cache"
    },
};

window.deleteHeader = {
    method: 'delete',
    credentials: "same-origin",
    headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Accept": "application/json",
        "Content-Type": "application/json",
        "cache-control": "no-cache"
    },
};

window.store = createStore(stanfordApp, applyMiddleware(ReduxThunk));

render(<Provider store={store}><App /></Provider>, document.getElementById('react-app'));