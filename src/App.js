import React, {Component} from 'react';
import {css} from '@emotion/core';
import {ClipLoader} from 'react-spinners';
import Background from './components/Swirl/Background';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


const initialState = {
  input: '',
  imgUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user:{
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
  loading: false
}
class App extends Component{
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data)=>{
    this.setState({
      user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }
  claculateFaceLocation = (data) =>{
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    const clarifaiFaceRegions = data.outputs[0].data.regions;
    const boxes = [];
    clarifaiFaceRegions.forEach(region => {
      let { bounding_box } = region.region_info;
      boxes.push({
        leftCol: bounding_box.left_col * width,
        topRow: bounding_box.top_row * height,
        rightCol: width - (bounding_box.right_col * width),
        bottomRow: height - (bounding_box.bottom_row * height)
      });
    });
    return boxes;
  }

  displayFaceBox = (boxes) =>{
    console.log('boxes: ', boxes);
    this.setState({boxes: boxes});
  }
  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = ()=>{
    this.setState({imgUrl: this.state.input, loading: true });
    fetch('https://whispering-stream-46813.herokuapp.com/imageUrl', {
          method: 'post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
    .then(response => response.json())
    .then((response) =>{
      if(response){
        this.setState({loading: false});
        fetch('https://whispering-stream-46813.herokuapp.com/image', {
          method: 'put',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user, {entries: count }));
        })
        .catch(console.log);
      }
      this.displayFaceBox(this.claculateFaceLocation(response));
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState(initialState)
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
     const { isSignedIn, imgUrl, route, boxes, loading} = this.state;
        return (
      <div className="tc vh-100">
        <Background/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' ?
          <div className="w-100 h-100">
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            {
               loading ? 
              <ClipLoader loader={'GridLoader'} css={override} sizeUnit={'px'} size={100} color={'#ff53ff'} loading={loading}/>:
              <FaceRecognition boxes={boxes} imgUrl={imgUrl}/>
            }
          </div>
          : (
            route === 'signin' ? 
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> : 
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          ) 
        }
      </div>
    );
  }
}

export default App;
 