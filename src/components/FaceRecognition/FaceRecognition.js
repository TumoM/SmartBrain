import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl}) =>{
return(
    <div className="center ma">
        <div className="absolute">
            <img src={imageUrl} alt="Chosen pic"/>
        </div>
    </div>
)

}

export default FaceRecognition;