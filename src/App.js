import './App.css';
import React from 'react';
import { auth } from './firebase/init.jsx';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


function App() {


  const [user, setUser] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


  // Stay logged in even after browser refreshes //

  React.useEffect(() => {

    onAuthStateChanged(auth, (user) => {

      setLoading(false);
      console.log(user);

      if (user){

        setUser(user);
      }
    })
  }, []);


  function register(){


    // Registered //

    console.log('registered')

    createUserWithEmailAndPassword(auth, 'email@email.com', 'test123')
    
    .then((user) => {

      console.log(user);
    })
    .catch((error) => {

      console.log(error);
    })
  }


  function login(){


    // Logged In //

    signInWithEmailAndPassword(auth, 'email@email.com', 'test123')

    .then(({ user }) => {

      setUser(user);
      console.log(user);
    })
    .catch((error) => {

      // setErrorMessage('The password is invalid or the user does not have A password.')

      console.log(error.message);
    })
  }

  function logout(){

    // Signed Out //

    signOut(auth);
    setUser({});
  }

  return (

    <div className="App">
      <button onClick={ register }>Register</button>
      <button onClick={ login }>Login</button>
      <button onClick={ logout }>logout</button>
      { loading ? 'Loading...' : user.email }
    </div>
  );
}

export default App;
