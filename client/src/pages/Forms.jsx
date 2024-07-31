import React from 'react'
import Form from '../components/Form.jsx'
import styles from './Forms.module.css';
import arrow_back from '../assets/arrow_back.png'
import { useNavigate } from 'react-router-dom';

const Forms = () => {
    const userID = localStorage.getItem('userID')
    const token = localStorage.getItem("token")
    const navigate = useNavigate();

    const handleBackButton =()=>{
      localStorage.removeItem('folderId')
      navigate("/dashboard")
    }
  return (
    <>
        <div className={styles.container}>
        <Form userID={userID} token ={token}/>
        <button className={styles.Backbutton} onClick={handleBackButton}>
          <img src={arrow_back} alt="arrow_back" />
        </button>
        </div>
    </>
    
  )
}

export default Forms