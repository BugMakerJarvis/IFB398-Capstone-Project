import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './style.css'
import firebase from "firebase/compat/app";
import * as React from 'react';
import ReactDOM from 'react-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";


function App() {
    return (
        <BrowserRouter>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      );
//   return <Button variant="contained">hello Jarvis</Button> ;
}

// function App() {
//     const firebaseApp = firebase.apps[0];
//     return (
//         <div>
//             <h1>React & Firebase</h1>
//             <code>
//                 <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
//             </code>
//         </div>
//     );
// }

export default App;
