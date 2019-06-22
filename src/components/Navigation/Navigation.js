import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn})=>{
        if(isSignedIn){
            return (
                <nav className="tc w-100 flex justify-end">
                    <p onClick={() => onRouteChange('signout')} className='f4 link glow nav-link-color pa3 pointer'>Sign Out</p>
                </nav>);
        } else{
            return (
                <nav className="tc w-100 flex justify-end">
                    <p onClick={() => onRouteChange('signin')} className='f4 link glow nav-link-color pa3 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f4 link glow nav-link-color pa3 pointer'>Register</p>
                </nav>
            );
        }
}
export default Navigation;