import React from 'react'; // ✅ React comes from 'react'
import {Router ,Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/landing';
import Authentication from './pages/authetication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeet from './pages/VideoMeet';
import HomeComponent from './pages/HomeComponent';
function App(){
    return (
        <>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<Authentication/>}/>
                <Route path="/home" element={<HomeComponent/>}/>

                <Route path="/:url" element={<VideoMeet />} />
                
            </Routes>
        </AuthProvider>
       
        </>
     
    )
}
export default App;