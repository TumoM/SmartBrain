import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import tachyons from 'tachyons';
import Particles from 'react-particles-js';

import Clarifai from 'clarifai';

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: 'f3ba43889e7946579ffb301dd5999467'
});

const particleOptions = {
  particles: {
    "number": {
      "value": 70,
      "density": {
        "enable": true,
        "value_area": 500
      }
    },
    "shape": {
      "type": "polygon",
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    
      "move": {
        "enable": true,
        "speed": 8,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": true,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
      "interactivity": {
        "detect_on": "window",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        }
      }
  }

class App extends React.Component {
constructor(){
  super();
  this.state = {
  input: '',
  imageUrl: ''
  }
}

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
    
  }

  onSubmitBtn = event =>{
    this.setState({imageUrl: this.state.input})
    console.log("Button Clicked");
    console.log('Input URL 2: ',this.state.input);
  //   app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
  //   function(response) {
  //     // do something with response
  //     console.log(response);
      
  //   },
  //   function(err) {
  //     // there was an error
  //   }
  // );
  }
  render(){
  return (
    <div className="App">
      <Particles className="particles" 
        params={particleOptions} 
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
          onInputChange={this.onInputChange}
          onSubmitBtn={this.onSubmitBtn}
        />
      {<FaceRecognition imageUrl={this.state.imageUrl}/>}
    </div>
  );
}
}
export default App;
