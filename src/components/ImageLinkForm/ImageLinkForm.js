import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onSubmitBtn}) =>{
return(
    <div className="ma4 mt0">
        <p className="f3">
            {`This Magic Brain will detect faces in your picture. Give it a try!`}
        </p>
        <div className="center grow">
        <div className='form center pa4 br3 shadow-5'>
            <input onChange={onInputChange} type="text" className="f4 pa2 w-70 center"/>
            <button onClick={onSubmitBtn} className="w-30 grow link ph3 pv2 dib white bg-light-purple">Detect</button>
        </div>
        </div>
    </div>
)

}

export default ImageLinkForm;