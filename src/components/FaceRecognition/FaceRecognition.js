import React from 'react';
import FaceBoxes from  '../FaceBoxes/FaceBoxes';

const FaceRecognition = ({imgUrl, boxes}) => {
    return (
        <div className='center ma1 flex flex-column justify-start items-center' style={{width: '500px', height:'60%' }}>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imgUrl} width='500px' height='auto'/>
                <FaceBoxes boxes={boxes}/>
            </div>
        </div>
    );
}
export default FaceRecognition;