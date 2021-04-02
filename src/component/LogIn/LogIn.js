import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { userContext } from '../../App';
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}


const LogIn = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


    const provider = new firebase.auth.GoogleAuthProvider();

    const handelSignIn = () => {
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            // The signed-in user info.
            var user = result.user;
            const newUser ={
                userLoggedIn : true,
                name : user.displayName ,
                email : user.email,
                img : user.photoURL ,
            }
            setLoggedInUser(newUser)
            history.replace(from);
            console.log(user);
        }).catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    console.log(loggedInUser);

    return (
        <div className="container m-5">
            <button onClick={handelSignIn}>click for loggedIn</button>
        </div>
    );
};

export default LogIn;