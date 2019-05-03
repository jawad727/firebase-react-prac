import React from 'react';
import fire from "./fire";
import firebase from "firebase"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Signedin from './SignedIn'

// firebase.initializeApp({
//   apiKey: "AIzaSyCTXM2v_7mMOywwSYOs3eM4uFB2E6_FQls",
//   authDomain: "fir-practice-84b60.firebaseapp.com"
// })

// fire()


class App extends React.Component {
  
    state = {
      name: '',
      age: '',
      allData: [],
      isSignedIn: false
    };
  

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false,
      signInSuccessWithAuthResult: (authResult, redirectURL) => {
        console.log(authResult);
        console.log(fire.firestore());

        fire.firestore().collection('member').doc(authResult.user.uid)
        .get().then(user => {if (user.exists) {console.log(`user logging in: ${user}`)} else {
          console.log(user)
          fire.firestore().collection('member').doc(authResult.user.uid).set({
            name: authResult.user.displayName
          })
        }})

        .catch(err => {console.log(err)})

      }
    }
  }

  // .doc(authResult.additionalUserInfo.profile.id) -- use on line 59 after member

  componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {
      
      this.setState({isSignedIn: !!user})
      console.log("user", user)

    })

  }

  inputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div style={{margin:'30px'}}>

      
      {this.state.isSignedIn ? <Signedin/> : 
      <StyledFirebaseAuth 
        uiConfig={this.uiConfig} 
        firebaseAuth={fire.auth()} />}

      </div>
      );
    }
   }

export default App;