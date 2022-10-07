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
import Video from "./pages/Video";
import SettingsPage from "./pages/SettingsPage";
import VideoList from "./pages/VideoList";



function App() {

    // const [currentUserName, setCurrentUserName] = useState(localStorage.getItem("currentUserName"));

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/settingspage" element={<SettingsPage/>}/>
                    <Route path="/video" element={<Video/>}/>
                    <Route path="/videolist" element={<VideoList/>}/>
                </Routes>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
