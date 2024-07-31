import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../pages/Dashboards.module.css';
import arrowUP from '../assets/dashboard/arrowUP.png'

const Navbar = ({ userName }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    navigate('/');
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.button1div} onClick={() => setShow(!show)}>
        <button
          className={styles.navbarButton}
          
        >
          {userName}'s Workspace 
        </button>
        <img style={{width:"1.5rem"}} src={arrowUP} alt="arrowUP" />
      </div>
      
      {show && (
        <div className={styles.dropdownMenu}>
          <div className={styles.button2div}>
            <button
              className={styles.dropdownButton}
              onClick={() => navigate(`/user/${userID}`)}
            >
              Settings
            </button>
          </div>
          <div className={styles.button2div}>
            <button
              className={styles.dropdownButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Navbar;
