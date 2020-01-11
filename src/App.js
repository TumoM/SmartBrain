import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import tachyons from 'tachyons';
import Particles from 'react-particles-js';

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
  render(){
  return (
    <div className="App">
      <Particles className="particles" 
        params={particleOptions} 
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*
      <FaceRecognition />*/}
    </div>
  );
}
}
export default App;
