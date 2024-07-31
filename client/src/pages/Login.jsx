import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import styles from "./Register.module.css";
import arrow_back from '../assets/arrow_back.png'
import triangle from "../assets/Signup/triangle.png"
import yellowEClips from "../assets/Signup/yellowEclips.png"
import pinkEclips from "../assets/Signup/pinkEclips.png"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [serverError, setServerError] = useState("")
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  let hasError = false;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError((prevState) => {
      return {
        email: false,
        password: false,
      };
    });
    setServerError("")

    if (!email) {
      hasError = true;
      setError((prevState) => {
        return {
          ...prevState,
          email: true,
        };
      });
    }

    if (!password) {
      hasError = true;
      setError((prevState) => {
        return {
          ...prevState,
          password: true,
        };
      });
    }
    if (!hasError){
      try {
        console.log(email)
        const res = await login({ email, password });
        console.log('User logged in:', res.data);
        const token = res.data.token
        const username = res.data.user.username
        const userID = res.data.user.id
        localStorage.setItem('token',token)
        localStorage.setItem('userName',username) 
        localStorage.setItem('userID',userID)
    
        navigate('/dashboard')
      } catch (error) {
        console.error('Error logging in:', error.response.data);
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
              {error.email && <p className={styles.errorMessage}>Please enter the Email</p>}
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
              {error.password && <p className={styles.errorMessage}>Please enter the password</p>}
            </div>
            {serverError && <p className={styles.errorMessage}>{serverError}</p>}
            <div className={styles.containerFileds}>
              <button className={styles.signUpButton} type="submit" onClick={handleSubmit}>Sign Up</button>
            </div>
            
            <p style={{textAlign:"center"}}>
                Don’t have an account? {" "}
              <span style={{color:"#1A5FFF"}} onClick={() => navigate("/register")}>Register now</span>
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

export default Login;
