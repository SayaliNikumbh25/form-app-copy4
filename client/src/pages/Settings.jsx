import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../services/api";
import styles from "./Register.module.css";
import arrow_back from "../assets/arrow_back.png";
import logoutLogo from "../assets/Signup/logoutLogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profile from "../assets/Signup/Profile.png";
import lock from "../assets/Signup/lock.png";
import eye from "../assets/Signup/eye.png";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
    oldPassword: false,
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const navigate = useNavigate();
  let hasError = false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    setUsername(localStorage.getItem("userName"));
  }, []);

  const handleUpdateButton = async (e) => {
    e.preventDefault();

    setError({
      email: false,
      password: false,
      oldPassword: false,
    });
    setServerError("");
    hasError = false;

    if (!email && !password) {
      hasError = true;
      setError((prevState) => ({
        ...prevState,
        email: true,
        password: true,
      }));
    }

    if (email && !emailRegex.test(email)) {
      hasError = true;
      setError((prevState) => ({
        ...prevState,
        email: true,
      }));
    }

    if (password && !passwordRegex.test(password)) {
      hasError = true;
      setError((prevState) => ({
        ...prevState,
        password: true,
      }));
    }

    if (!oldPassword) {
      hasError = true;
      setError((prevState) => ({
        ...prevState,
        oldPassword: true,
      }));
    }

    if (hasError) return;

    const id = localStorage.getItem("userID");
    const token = localStorage.getItem("token");
    try {
      const updateData = { oldPassword };

      if (email) {
        updateData.email = email;
      }
      if (password) {
        updateData.password = password;
      }

      const response = await updateUser(id, updateData, token);
      toast.success("User updated successfully ✓");
    } catch (error) {
      console.error("Error updating user:", error.response.data);
      setServerError(error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    navigate("/");
  };

  return (
    <div className={styles.settingsContainer}>
      <button
        className={styles.Backbutton}
        onClick={() => navigate("/dashboard")}
      >
        <img src={arrow_back} alt="arrow_back" />
      </button>
      <div className={styles.logoutButton} onClick={handleLogout}>
        <img src={logoutLogo} alt="logoutLogo" style={{ width: "1.2rem" }} />{" "}
        &nbsp; Log out
      </div>

      <h2 className={styles.heading}>Settings</h2>
      <form>
        <div className={styles.container}>
          <div className={styles.containerFileds}>
            <div className={styles.inputDiv}>
            <img className={styles.inputImages} src={profile} alt="profile" />
            <input
              type="text"
              placeholder="Enter a username"
              value={username}
              required
              className={styles.inputSettings}
              style={{ borderColor: error.username && "#FF4141" }}
            />
            </div>
            
          </div>
          <br />
          <div className={styles.containerFileds}>
            <div className={styles.inputDiv}>
            <img className={styles.inputImages} src={profile} alt="lock" />
            <input
              type="email"
              placeholder="Update email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={` ${styles.inputSettings} ${
                error.email ? styles.inputError : ""
              }`}
              style={{ borderColor: error.email && "#FF4141" }}
            />
            
            </div>
            {error.email && (
              <p className={styles.errorMessage}>Please enter a valid Email</p>
            )}
          </div>
          <br />
          <div className={styles.containerFileds}>
            <div className={styles.inputDiv}>
            <img className={styles.inputImages} src={lock} alt="lock" />
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className={`${styles.inputSettings} ${
                error.oldPassword ? styles.inputError : ""
              }`}
              style={{ borderColor: error.oldPassword && "#FF4141" }}
            />
            <img
            className={styles.inputImages}
              onClick={() => setShowOldPassword(!showOldPassword)}
              src={eye}
              alt="eye"
            />
            </div>

            {error.oldPassword && (
              <p className={styles.errorMessage}>
                Please enter the valid Password
              </p>
            )}
          </div>
          <br />
          <div className={styles.containerFileds}>
            <div className={styles.inputDiv}>
            <img className={styles.inputImages} src={lock} alt="lock" />
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`${styles.inputSettings} ${
                error.password ? styles.inputError : ""
              }`}
              style={{ borderColor: error.password && "#FF4141" }}
            />
            <img
              className={styles.inputImages}
              onClick={() => setShowNewPassword(!showNewPassword)}
              src={eye}
              alt="eye"
            />
            </div>
            
            {error.password && (
              <p className={styles.errorMessage}>
                Password must be at least 8 characters long and contain at least
                one letter and one number
              </p>
            )}
          </div>
          <br />
          {serverError && <p className={styles.errorMessage}>{serverError}</p>}
          <div className={styles.containerFileds}>
            <button
              className={styles.signUpButton}
              type="submit"
              onClick={handleUpdateButton}
            >
              Update
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Settings;
