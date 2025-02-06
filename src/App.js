import './App.css';
import React from 'react';
import { auth, db } from './firebase/init.jsx';
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


function App() {


  const [user, setUser] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


  // Update existing post. //

  async function updatePost(){

    const hardCodedId = 'GRtbtWxuov7bpnhfVqNT';
    const postRef = doc(db, "posts", hardCodedId)
    const post = await getPostByID(hardCodedId)
    console.log(post)

    // How change specific A specific field. //

    const newPost = {

      ...post,
      title: "Land A $600k Job!",
    } 
    // console.log(newPost)
    updateDoc(postRef, newPost);
  }


  function deletePost(){

    const hardCodedId = "0IxRxLCuFHWbUP9ghh1nuZzDsB32";
    const postRef = doc(db, "posts", hardCodedId)
    console.log(hardCodedId)
    deleteDoc(postRef)
  }


  // Created A new post. //

  function createPost(){

    const post = {

      title: "Land A $100k Job!",
      description: "Finish Firebase Firestore lesson.",
      uid: user.uid
    }
    addDoc(collection(db, "posts"), post)
  }


  // Fetch and log all posts. //

  async function getAllPosts(){

    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({ ...elem.data(), id: elem.id }));

    console.log(posts);
  }


    // Fetch post by ID //

  async function getPostByID(id){

    // const hardCodedId = 'GRtbtWxuov7bpnhfVqNT';

    const postRef = doc(db, "posts", id)
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }


  // Fetch post by UID //

  async function getPostByUID(){
    
    const postCollectionRef = await query(

      collection(db, "posts"),
      where('uid', '==', user.uid)
    )
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(docs => docs.data()));
  }


  // Stay logged in even after browser refreshes. //

  React.useEffect(() => {

    onAuthStateChanged(auth, (user) => {

      setLoading(false);

      if (user){

        setUser(user);
      }
    })
  }, []);


  // Register A new user. //

  function register(){

    // Registered. //

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

    // Logged In. //

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

    // Signed Out. //

    signOut(auth);
    setUser({});
  }

  return (

    <div className="App">
      
      <button onClick={ register     }>Register</button>
      <button onClick={ login        }>Login</button>
      <button onClick={ logout       }>logout</button>
      <button onClick={ createPost   }>Create Post</button>
      <button onClick={ updatePost   }>Update Post</button>
      <button onClick={ deletePost   }>Delete Post</button>
      <button onClick={ getAllPosts  }>Get All Posts</button>
      <button onClick={ getPostByID  }>Get Post By ID</button>
      <button onClick={ getPostByUID }>Get Post By UID</button>

      { loading ? 'Loading...' : user.email }

    </div>
  );
}

export default App;
