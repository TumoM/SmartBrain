import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl, box}) =>{
return(
    <div className="center ma">
        <div className="absolute">
            <img id="inputImage" src={imageUrl} alt="Chosen pic"/>
            {/* <div style={{top:box.top, bottom:box.bottom, right:box.right, left:box.left}} className="bounding-box"></div> */}
        </div>
    </div>
)

}

export default FaceRecognition;