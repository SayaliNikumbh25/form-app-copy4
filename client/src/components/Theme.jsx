import React from 'react'
import profile from '../assets/profile.png'
import styles from '../pages/Workspace.module.css'
import lightTheme from '../assets/lightTheme.png'
import darkTheme from '../assets/darkTheme.png'
import blueTheme from '../assets/blueTheme.png'

const Theme = ({background,setBackground}) => {

    const handleThemeChange = (theme) => {
        setBackground(theme);
    };
    console.log(background)
  return (
    <div className={styles.container}>
        <div className={styles.optionsContainer}>
            <div>
                <h3  className={styles.heading}>Customize the theme</h3>
            </div>
            <div >
                <div className={`${styles.themeDiv} ${background === 'lightTheme' ? styles.selectedTheme : ''}`} onClick={()=>setBackground("lightTheme")}>
                    <div ><img className={styles.themeImage} src={lightTheme} alt={lightTheme} /></div>
                    <span className={styles.themeName}>Light</span>
                </div>
                <div className={`${styles.themeDiv} ${background === 'darkTheme' ? styles.selectedTheme : ''}`} onClick={()=>setBackground("darkTheme")}>
                    <div ><img className={styles.themeImage} src={darkTheme} alt={lightTheme} /></div>
                    <span className={styles.themeName}>Dark</span>
                </div>
                <div className={`${styles.themeDiv} ${background === 'blueTheme' ? styles.selectedTheme : ''}`} onClick={()=>setBackground("blueTheme")}>
                    <div ><img className={styles.themeImage} src={blueTheme} alt={lightTheme} /></div>
                    <span className={styles.themeName}>Tail Blue</span>
                </div>
            </div>
        </div>
        <div className={`${styles.themes}  ${styles[background]}` }>
            <div className={styles.displayTheme}>
                <div className={styles.inputs}>
                    <div className={styles.profileImagediv}><img style={{height:'2.5rem'}} src={profile} alt="profileImage" /></div>
                    <label className={styles.text}>Hello</label>
                </div>
                <div className={styles.userInputs}>
                    <label className={styles.userText}>Hi</label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Theme