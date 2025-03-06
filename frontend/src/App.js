import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Lessons from './components/Lessons';
import Transcribe from './components/Transcribe';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lessons/:id" element={<div>Lesson Detail Page (To be implemented)</div>} />
            <Route path="/transcribe" element={<Transcribe />} />
            <Route path="*" element={
              <div className="not-found">
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
              </div>
            } />
          </Routes>
        </main>
        <footer className="app-footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} PhraseBridge. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
