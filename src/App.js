import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Navbar from "./pages/Navbar";
import HeroPage from "./pages/HeroPage";
import Footer from "./pages/Footer";
import Teacher from "./pages/Teacher";
import About from "./pages/About";
import Youtube from "./pages/Youtube";
import Register from "./pages/Register";

// Lazy load components


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar will be rendered on all pages */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HeroPage/>} />
            <Route path="/teachers" element={<Teacher/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/youtube" element={<Youtube/>} />
            <Route path="/courses" element={<Register/>} />
            
            
          </Routes>
        </Suspense>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
