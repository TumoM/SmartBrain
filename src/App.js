import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
    "fps_limit": 28,
    "number": {
      "value": 200,
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
        "speed": 5,
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
const initialState = {
  input: '',
  imageUrl: '',
  box:{},
  route: 'signin',
  isSignedIn: false,
  user:{
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}
class App extends React.Component {
constructor(){
  super();
  this.state = initialState
  }

  loadUser = (user) =>{
    this.setState({user})
  }

  calcFaceLocations = (data) =>{
    const faceLocation = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    const box = {
      top:faceLocation.top_row * height,
      bottom:(1 - faceLocation.bottom_row) * height,
      right:(1 - faceLocation.right_col) * width,
      left:faceLocation.left_col * width
    }
    // console.log("Box",box);
    // let div = document.createElement('div');
    // div.classList.add("bounding-box");
    // div.style.cssText = {top:box.top, bottom:box.bottom, right:box.right, left:box.left}
    // image.appendChild(div)
    // console.log("CSS TEXT", div.style);
    
    return box;
  }

  displayFaceBox = (box) =>{
    this.setState({box})
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
    
  }

  onPictureSubmit = event =>{
    this.setState({imageUrl: this.state.input})
    console.log("Button Clicked");
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then((response) =>{
        if (response) {
          fetch("http://localhost:4000/image",{
            method: 'put',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState(Object.assign(this.state.user, {entries:data}))
        })
      }
        this.displayFaceBox(this.calcFaceLocations(response))
      })
        .catch((err) =>{console.log("Somethings up?", err)});
  }

  onRouteChange = (route) =>{
    if (route === 'signout') {
      this.setState({isSignedIn:false})
    }else if(route === 'home'){
      this.setState({isSignedIn:true})

    }
    this.setState({route: route});
  }

  render(){
  return (
    <div className="App">
      <Particles className="particles" 
        params={particleOptions} 
      />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route === 'home' 
        ? <div>
          <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm 
            onInputChange={this.onInputChange}
            onPictureSubmit={this.onPictureSubmit}
          />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
          : (
            this.state.route === 'signin'?
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )}
      </div>
  );
}
}
export default App;
