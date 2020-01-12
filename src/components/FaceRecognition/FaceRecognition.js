import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl}) =>{
return(
    <div className="center">
        {console.log("imgURL:",imageUrl)}
        <img src={imageUrl} alt="Chosen pic"/>
    </div>
)

}

export default FaceRecognition;