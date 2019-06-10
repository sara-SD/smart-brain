import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';


const Logo = () =>{
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ reverse: true ,max : 60, perspective: 1000, scale: 1.1 , speed: 300 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa2"> 
                    <img style={{paddingButtom: '15px'}} alt='logo' src={brain}/>
                </div>
            </Tilt>
        </div>
    );
}
export default Logo;