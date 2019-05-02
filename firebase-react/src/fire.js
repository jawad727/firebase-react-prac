import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCTXM2v_7mMOywwSYOs3eM4uFB2E6_FQls",
    authDomain: "fir-practice-84b60.firebaseapp.com",
    databaseURL: "https://fir-practice-84b60.firebaseio.com",
    projectId: "fir-practice-84b60",
    storageBucket: "fir-practice-84b60.appspot.com",
    messagingSenderId: "265277776068"
  };

  const fire = firebase.initializeApp(config);

  export default fire