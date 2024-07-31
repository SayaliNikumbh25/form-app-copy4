import React, { useState, useEffect } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import arrow_back from '../assets/arrow_back.png'
import triangle from "../assets/Signup/triangle.png"
import yellowEClips from "../assets/Signup/yellowEclips.png"
import pinkEclips from "../assets/Signup/pinkEclips.png"


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [serverError, setServerError] = useState("")
  const [error, setError] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    isPasswordMatch: false
  });

  let hasError = false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log("here")
    e.preventDefault();
   
    setError((prevState) => {
      return {
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
        isPasswordMatch:false
      };
    });
    setServerError("")
    console.log("start",error)
    if (!username) {
      hasError = true;
      setError((prevState) => {
        return {
          ...prevState,
          username: true,
        };
      });
    }
    if (!email || !emailRegex.test(email)) {
      hasError = true;
      setError((prevState) => {
        return {
          ...prevState,
          email: true,
        };
      });
    }

    if (!password || !passwordRegex.test(password)) {
      hasError = true;
      setError((prevState) => {
        return {
          ...prevState,
          password: true,
        };
      });
    }

    if (!confirmPassword) {
      hasError = true;
      setError((prevState) => {
        return {
          ...prevState,
          confirmPassword: true,
        };
      });
    }

    if(password && confirmPassword){
      if(password !== confirmPassword){
        console.log("compare", password !== confirmPassword)
        hasError = true;
        setError((prevState) => {
          return {
            ...prevState,
            isPasswordMatch: true,
          };
        });
      }
    }
    console.log('before if',error.isPasswordMatch)
    if (!hasError) {
        try {
          const res = await register({ username, email, password });
          console.log("User registered:", res.data);
          const token = res.data.token
          const user = res.data.user.username
          const userID = res.data.user.id
          localStorage.setItem('token',token)
          localStorage.setItem('userName',user) 
          localStorage.setItem('userID',userID)
          navigate('/dashboard')
        } catch (error) {
          console.error("Error registering user:", error.response.data.message);
          setServerError(error.response.data.message)
        
      }
      
    }

  };

  return (
    <> 
    <div className={styles.mainContainer}>
    <button className={styles.Backbutton} onClick={() => navigate("/")}>
      <img src={arrow_back} alt="arrow_back" />
    </button>
        <form>
          <div className={styles.container} >
            <div className={styles.containerFileds}>
              <label className={`${styles.label} ${error.username ? styles.labelError : ''}`}>Username</label>
              <input
                type="text"
                placeholder="Enter a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={`${styles.input} ${error.username ? styles.inputError : ''}`}
                style={{borderColor:error.username && "#FF4141"}}
              />
              {error.username && <p className={styles.errorMessage}> Please enter the Username</p>}
            </div>
            <div className={styles.containerFileds}>
              <label className={`${styles.label} ${error.email ? styles.labelError : ''}`}>Email</label>
              <input
                type="email"
                placeholder=" Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`${styles.input} ${error.email ? styles.inputError : ''}`}
                style={{borderColor:error.email && "#FF4141"}}
              />
              {error.email && <p className={styles.errorMessage}>Please enter the valid Email</p>}
            </div>
            <div className={styles.containerFileds}>
              <label className={`${styles.label} ${error.password ? styles.labelError : ''}`}>Password</label>
              <input
                type="password"
                placeholder="Enter the password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`${styles.input} ${error.password ? styles.inputError : ''}`}
                style={{borderColor:error.password && "#FF4141"}}
              />
              {error.password && <p className={styles.errorMessage}>Password must be at least 8 characters long and contain at least one letter and one number</p>}
            </div>
            <div className={styles.containerFileds}>
              <label className={`${styles.label} ${error.confirmPassword ? styles.labelError : ''}`}> Confirm Password</label>
              <input
                type="password"
                placeholder="Enter the password again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`${styles.input} ${error.confirmPassword ? styles.inputError : ''}`}
                style={{borderColor:error.confirmPassword && "#FF4141"}}
              />
              {error.confirmPassword && <p className={styles.errorMessage}>Please enter the password again</p>}
            </div>
            {serverError && <p className={styles.errorMessage}>{serverError}</p>}
            {error.isPasswordMatch && <p className={styles.errorMessage}>Enter same password in both fields</p>}
            <div className={styles.containerFileds}>
              <button className={styles.signUpButton} type="submit" onClick={handleSubmit}>Sign Up</button>
            </div>
            
            <p style={{textAlign:"center"}}>
              Already have an account?{" "}
              <span style={{color:"#1A5FFF"}} onClick={() => navigate("/login")}>Login</span>
            </p>
          </div>
        </form>

      <div className={styles.triangle}>
        <img src={triangle} alt="triangle" />
      </div>
      <div className={styles.pinkEclips}>
        <img src={pinkEclips} alt="pinkEclips" />
      </div>
      <div className={styles.yellowEClips}>
        <img src={yellowEClips} alt="yellowEClips" />
      </div>
    </div>
        
    </>
  );
};

export default Register;
