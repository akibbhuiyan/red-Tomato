import React, { useContext, useEffect, useState } from "react";
import logo from "../../images/logo2.png";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";

initializeApp(firebaseConfig);
const SignUp = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const auth = getAuth();
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const handleBlur = (e) => {
    let isFeildValid = true;
    if (e.target.name === "email") {
      isFeildValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPassValid = e.target.value.length > 6;
      const passHasNumber = /\d{1}/.test(e.target.value);
      isFeildValid = isPassValid && passHasNumber;
    }
    if (isFeildValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          upadateUserName(newUserInfo.name);
          setLoggedInUser(newUserInfo);
          console.log("Success");

          navigate("../placeorder", { replace: true });
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error =
            "This Email Address is already used in another Account";
          newUserInfo.success = false;
          setUser(newUserInfo);
          console.log(error);
        });
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          navigate("../placeorder", { replace: true });
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "Wrong Password or Email Address";
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  const upadateUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("Name Updated Succesfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (password === confirmPassword) {
      setError("");
    } else {
      setError("Confirm Password should be same as Password");
    }
  }, [password, confirmPassword]);

  return (
    <div className="login-container">
      <Link to="/home">
        <img src={logo} alt="LOGO" />
      </Link>
      <form onSubmit={handleSubmit} className="login_form">
        {newUser && (
          <input
            type="text"
            onBlur={handleBlur}
            name="name"
            placeholder="Name"
            required
          />
        )}
        <input
          type="email"
          onBlur={handleBlur}
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          onBlur={handleBlur}
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          required
        />
        {newUser && (
          <input
            type="password"
            onBlur={handleBlur}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            name="confirmPass"
            placeholder="Confirm Password"
            required
          />
        )}{" "}
        {newUser && <span>{error}</span>}
        <input
          type="submit"
          className="main-btn"
          value={newUser ? "Sign in" : "Log in"}
        />
        <span onClick={() => setNewUser(!newUser)}>
          {" "}
          {!newUser ? "Don't have an account?" : "Already have an account?"}
        </span>
      </form>

      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged In"} SuccesFully
        </p>
      )}
      <p style={{ color: "red" }}>{user.error}</p>
    </div>
  );
};

export default SignUp;
