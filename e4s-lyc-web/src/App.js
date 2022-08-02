import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import './style.css'
import firebase from "firebase/compat/app";
import * as React from 'react';
import ReactDOM from 'react-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import {useState} from "react";


function App() {

    const [currentUserName, setCurrentUserName] = useState(localStorage.getItem("currentUserEmail"));

    return (
        <BrowserRouter>
            <div className="App">
                <Header currentUserName={currentUserName} onChange={(name) => setCurrentUserName(name)}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signin" element={<SignIn onChange={(name) => setCurrentUserName(name)}/>}/>
                    <Route path="/signup" element={<SignUp onChange={(name) => setCurrentUserName(name)}/>}/>
                </Routes>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
