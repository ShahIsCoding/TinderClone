import React from 'react'
import {Link} from 'react-router-dom';
function LandingPage() {
    return (
            <div className="landingPage">
                <div className="mainBox">
                    
                    <h3 className="mainBox__title">Tinder</h3>
                    <img src="assets/tinder.png" alt="tinderlogo" className="mainBox__logo" />
                    <Link to='/userAuth'><button className="mainBox__btn">Let Go</button></Link>
                </div>
            </div>
    )
}

export default LandingPage
