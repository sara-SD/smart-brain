import React from 'react';
import './FaceBoxes.css';

const FaceBoxes = ({boxes}) =>{
    const element = 
        boxes ? 
        boxes.map((box, index)=>{
            return (
                <div key={index} className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            )
        }) :
        <div></div>;
    return (element);
}
export default FaceBoxes