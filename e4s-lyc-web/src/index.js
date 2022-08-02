import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"

import firebase from "firebase/compat/app";
import {getFirebaseConfig} from "./config/firebase-config";
import {getAuth, onAuthStateChanged} from "firebase/auth";

firebase.initializeApp(getFirebaseConfig());
onAuthStateChanged(getAuth(), function (user) {
    if (user) {
        localStorage.setItem("currentUserEmail", user.email);
        localStorage.setItem("currentUserName", user.displayName);
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
