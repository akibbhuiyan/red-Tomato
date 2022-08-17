import React, { useContext, useState } from 'react';
import logo from '../../images/logo2.png'
import './Login.css'
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { userContext } from '../../App';

initializeApp(firebaseConfig)
const SignUp = () => {

    const navigate = useNavigate();
    const auth = getAuth();
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const handleBlur = (e) => {
        let isFeildValid = true;
        if (e.target.name === 'email') {
            isFeildValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
        }
        if (e.target.name === 'email') {
            const isPassValid = e.target.value.length > 6;
            const passHasNumber = /\d{1}/.test(e.target.value)
            isFeildValid = isPassValid && passHasNumber;
        }
        if (isFeildValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }
    console.log(user)
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true
                    setUser(newUserInfo)
                    upadateUserName(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    navigate("../home", { replace: true });
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = 'This Email Address is already used in another Account';
                    newUserInfo.success = false
                    setUser(newUserInfo)

                });
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    navigate("../home", { replace: true });
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = 'This Email Address is already used in another Account';
                    newUserInfo.success = false
                    setUser(newUserInfo)

                });
        }
        e.preventDefault()
    };

    const upadateUserName = name => {
        updateProfile(auth.currentUser, {
            displayName: name,
        })
            .then(() => {
                console.log('Name Updated Succesfully');

            }).catch((error) => {
                console.log(error);
            })

    }

    return (

        <div className='login-container'>
            <Link to='/home'><img src={logo} alt="LOGO" /></Link>
            <form onSubmit={handleSubmit} className='login_form'>
                {
                    newUser && <input type='text' onBlur={handleBlur} name='name' placeholder='Name' />
                }
                <input type='email' onBlur={handleBlur} name='email' placeholder='Email' />
                <input type='password' onBlur={handleBlur} name='password' placeholder='Password' />
                {
                    newUser && <input type='password' onBlur={handleBlur} name='confirmPass' placeholder='Confirm Password' />
                }
                <input type="submit" className='main-btn' value={newUser ? 'Sign in' : 'Log in'} />
                <span onClick={() => setNewUser(!newUser)}> {!newUser ? "Don't have an account?" : 'Already have an account?'}</span>
            </form>


            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} SuccesFully</p>
            }
            <p style={{ color: 'red' }}>{user.error}</p>
        </div>
    );
};

export default SignUp;