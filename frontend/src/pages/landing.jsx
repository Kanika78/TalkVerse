import React from 'react';
import "../App.css";
import { Link } from 'react-router-dom';
export default function LandingPage() {
    return(
        <div className="LandingPageContainer">
            <nav>
                <div className='navHeader'>
                    <h2>TalkVerse</h2>
                </div>
                <div className='navList'>
                    <p>Join as Guest</p>
                    <p>Register</p>
                    <div role='button'>
                        <p>Login</p>
                    </div>

                </div>
            </nav>
            <div className="landingMainContainer">
                <div>
                    <h1><span style={{color:"#4ADE80"}}>Connect </span>with your loved ones</h1>
                    <p>Cover a distance by TalkVerse</p>
                    <div role='button'>
                        <Link to={"/home"}>Get Started</Link>
                    </div>
                </div>
                <div>
                    <img src="Home1.png" ></img>
                </div>
            </div>

        </div>
    )

}
