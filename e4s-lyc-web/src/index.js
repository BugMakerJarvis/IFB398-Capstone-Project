import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import firebase from "firebase/compat/app";

firebase.initializeApp({
    apiKey: "AIzaSyB55nB6biTGAYkXTuqdT22XHdk5M5z6yLA",
    authDomain: "e4s-lyc-web-f1383.firebaseapp.com",
    projectId: "e4s-lyc-web-f1383",
    storageBucket: "e4s-lyc-web-f1383.appspot.com",
    messagingSenderId: "1079123934925",
    appId: "1:1079123934925:web:d05bc5ae532b4790187384",
    measurementId: "G-DDPZP04QRM"
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
