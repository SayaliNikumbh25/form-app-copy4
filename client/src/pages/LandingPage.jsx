import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import logo from '../assets/logo.png'
import triangleWidget from '../assets/triangle_widget.png'
import archWidget from '../assets/arch_widget.png'
import workspaceImage from '../assets/workspace_image.png'
import sampleForm from '../assets/sampleForm.png'
import sampleTypebot from '../assets/sampleTypebot.png'
import arrow from '../assets/arrow.png'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.png'
import gmail from '../assets/gmail.png'
import mailChimp from '../assets/mailChimp.png'
import box from '../assets/box.png'
import W from '../assets/W.png'
import whiteW from '../assets/whiteW.png'
import calender from '../assets/calender.png'
import redLogo from '../assets/redLogo.png'
import Gdrive from '../assets/Gdrive.png'
import slack from '../assets/slack.png'
import shopify from '../assets/shopify.png'
import logo2 from '../assets/logo2.png'
import excel from '../assets/excel.png'
import zapier from '../assets/zapier.png'
import c from '../assets/c.png'
import salesforce from '../assets/salesforce.png'
import botImage from '../assets/botImage.png'
import HiddenFilds from '../assets/HiddenFilds.png'
import teamColab from '../assets/teamColab.png'
import link from '../assets/link.png'
import customCode from '../assets/customCode.png'
import custDomain from '../assets/custDomain.png'
import folder from '../assets/folder.png'
import feature1 from '../assets/feature1.png'
import feature2 from '../assets/feature2.png'
import feature3 from '../assets/feature3.png'
import feature4 from '../assets/feature4.png'
import feature5 from '../assets/feature5.png'
import feature6 from '../assets/feature6.png'
import feature7 from '../assets/feature7.png'
import feature8 from '../assets/feature8.png'
import footerLink from '../assets/footerLink.png'


const LandingPage = () => {
  const logoImages = [gmail,mailChimp,box, W, whiteW,calender, redLogo,Gdrive,slack,shopify,logo2,excel,zapier,c, salesforce]
  const featureImages = [feature1, feature3, feature3, feature4, feature5, feature6, feature7, feature8]
  const navigate = useNavigate() 
  if(localStorage.getItem("userName")){
    localStorage.removeItem("userName")
  }
  if(localStorage.getItem("token")){
    localStorage.removeItem("token")
  }
  if(localStorage.getItem("userID")){
    localStorage.removeItem("userID")
  }

  return (
    <div className= {styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src={logo} alt="logo" />
          <p className={styles.logoText}>FormBot</p>
        </div>
        <div>
          <button className={styles.headerButtons} onClick={()=> navigate('/login')}>Sign in</button>
          <button className={styles.headerButtons} onClick={()=> navigate('/register')}>Create a FormBot</button>
        </div>
      </div>
      
      <div className={styles.container1}>
        <div className={styles.container1Image} > 
          <img src={triangleWidget} alt="triangleWidget" />
        </div>
        <div className={styles.container1Info}>
          <h1 className={styles.container1Heading}>Build advanced chatbots visually</h1>
          <p className={styles.paragraph} style={{color:"white"}}>Typebot gives you powerful blocks to create unique chat experiences. Embed them
          anywhere on your web/mobile apps and start collecting results like magic.</p>
          <button className={styles.container1Button} onClick={()=> navigate('/register')}>Create a FormBot  for free</button>
        </div>
        <div className={styles.container1Image} >
          <img  src={archWidget} alt="archWidget" /></div>
      </div>

      <div className={styles.container2}>
        <div className={styles.blurredCircleOrange}>
          <svg xmlns="http://www.w3.org/2000/svg" width="680" height="680" viewBox="0 0 680 680" fill="none">
            <g filter="url(#filter0_f)"><rect x="40" y="40" width="600" height="600" rx="300" fill="#E67200"/></g>
            <defs><filter id="filter0_f" x="0" y="0" width="680" height="680" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="30" result="effect1_foregroundBlur"/></filter></defs></svg>
        </div>
         <img className={styles.container2Image} src={workspaceImage} alt="workspaceImage" />
        <div className={styles.blurredCircleBlue}>
          <svg xmlns="http://www.w3.org/2000/svg" width="680" height="680" viewBox="0 0 680 680" fill="none">
            <g filter="url(#filter0_f)"><rect x="40" y="40" width="600" height="600" rx="300" fill="#007BFF"/></g>
            <defs><filter id="filter0_f" x="0" y="0" width="680" height="680" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="30" result="effect1_foregroundBlur"/></filter></defs></svg>
        </div>
      </div>

      <div className={styles.container3}>
        <div>
          <h1 className={styles.boldHeading}>Replace your old school forms <br/> with <br/> chatbots</h1>        
        </div>
        <div>
          <p className={styles.paragraph} style={{marginBottom:"2.5rem"}}>Typebot is a better way to ask for information. It leads to an increase in customer satisfaction and retention and multiply by 3 <br/>
          your conversion rate compared to classical forms.</p>
        </div>
        <div className={styles.exampleDiv}>
          <div className={styles.sampleForm}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
              <path d="M50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50C38.8071 50 50 38.8071 50 25Z" fill="#F87171" fill-opacity="0.8"/>
              <path d="M33.3327 16.6666L16.666 33.3333L33.3327 16.6666Z" fill="black"/>
              <path d="M33.3327 16.6666L16.666 33.3333" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.666 16.6666L33.3327 33.3333L16.666 16.6666Z" fill="black"/>
              <path d="M16.666 16.6666L33.3327 33.3333" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <img className={styles.examples} src={sampleForm} alt="sampleForm" />
          </div>
          <div className={styles.sampleTypebot}>
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
            <path d="M50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50C38.8071 50 50 38.8071 50 25Z" fill="#4ADE80" fill-opacity="0.8"/>
            <path d="M33.3327 19.3334L21.8743 30.7917L16.666 25.5834" fill="#40B76F" fill-opacity="0.8"/>
            <path d="M33.3327 19.3334L21.8743 30.7917L16.666 25.5834" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <img className={styles.examples} src={sampleTypebot} alt="sampleTypebot" />
          <img className={styles.sampleTypebotArrow} src={arrow} alt="arrow" />
          <p className={styles.tryItOut}>try it out!</p>
          </div>
        </div>
      </div>

      <div className={styles.container4}>
        <div className={styles.rightContainer}>
          <div>
            <img className={styles.image1} src={image1} alt="image1" />
          </div>
          <div className={styles.rightContainerInfo}>
            <h1 className={styles.heading}>Easy building experience</h1>
            <p className={styles.paragraph}>All you have to do is drag and drop blocks to create your app. Even if you have custom needs, you can always add custom code.</p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.rightContainerInfo}>
            <h1 className={styles.heading}>Embed it in a click</h1>
            <p className={styles.paragraph}>Embedding your typebot in your applications is a walk in the park. Typebot gives you several step-by-step platform-specific instructions. Your typebot will always feel "native".</p>
          </div>
          <div>
            <img className={styles.image1} src={image2} alt="image2" />
          </div>
        </div>
      </div>

      <div className={styles.container5}>
        <div className= {styles.logoContainer}>
              <svg className={styles.svgleft} xmlns="http://www.w3.org/2000/svg" width="462" height="288" viewBox="0 0 462 288" fill="none">
              <rect width="462" height="288" fill="url(#paint0_linear_1_596)"/>
              <defs>
              <linearGradient id="paint0_linear_1_596" x1="0" y1="144" x2="462" y2="144" gradientUnits="userSpaceOnUse">
              <stop stop-color="#171923"/>
              <stop offset="1" stop-color="#171923" stop-opacity="0"/>
              </linearGradient>
              </defs>
              </svg>
            {logoImages.map((logo)=>(
                <div className={styles.logoDiv}>
                <img className={styles.divLogoImg} src={logo} alt={logo} />
              </div>
            ))} 
                <svg className={styles.svgRight} xmlns="http://www.w3.org/2000/svg" width="462" height="288" viewBox="0 0 462 288" fill="none">
                <rect width="462" height="288" fill="url(#paint0_linear_1_597)"/>
                <defs>
                <linearGradient id="paint0_linear_1_597" x1="462" y1="144" x2="0" y2="144" gradientUnits="userSpaceOnUse">
                <stop stop-color="#171923"/>
                <stop offset="1" stop-color="#171923" stop-opacity="0"/>
                </linearGradient>
                </defs>
              </svg>  
        </div>
        <div className={styles.container5Info}>
          <h1 className={styles.rightContainerHeading}>Integrate with any platform</h1>
          <p className={styles.paragraph}>Typebot offers several native integrations blocks as well as instructions on <br/> how to embed typebot on particular platforms</p>
        </div> 
      </div>

      <div className={styles.container6}>
        <h1 className={styles.boldHeading}>Collect results in real-time</h1>
        <p className={styles.paragraph} >One of the main advantage of a chat application is that you collect the user's responses on each question. </p>
        <span className={styles.paragraph} style={{fontWeight:"bold"}}>You won't lose any valuable data.</span>
        <img className={styles.container6Image} src={botImage} alt="botImage" />
      </div>

      <div className={styles.container7}>
            <div className={styles.container7Info}>
              <h1 className={styles.heading} style={{margin:0}}>And many more features</h1>
              <p className={styles.paragraph} >Typebot makes form building easy and comes with powerful features</p>
            </div>
            <div className={styles.featureContainer}>
              <div className={styles.feature}>
                <div className={styles.featureLogo}>
                  <img className='featureImage' src={HiddenFilds} alt="HiddenFilds" />
                </div>
                <div>
                  <h4 className={styles.featureHeading}>Hidden fields</h4>
                  <p className={styles.featurePara}>Include data in your form URL to segment your user and use its data directly in your form.</p>
                </div>

              </div>
              <div className={styles.feature}>
                <div className={styles.featureLogo}>
                  <img className='featureImage' src={teamColab} alt="teamColab" />
                </div>
                <div>
                  <h4 className={styles.featureHeading}>Team collaboration</h4>
                  <p className={styles.featurePara}>Invite your teammates to work on your typebots with you</p>
                </div>

              </div>
              <div className={styles.feature}>
                <div className={styles.featureLogo}>
                  <img className='featureImage' src={link} alt="link" />
                </div>
                <div>
                  <h4 className={styles.featureHeading}>Link to sub typebots</h4>
                  <p className={styles.featurePara}>Reuse your typebots in different parent bots.</p>
                </div>

              </div>
              <div className={styles.feature}>
                <div className={styles.featureLogo}>
                  <img className='featureImage' src={customCode} alt="customCode" />
                </div>
                <div>
                  <h4 className={styles.featureHeading}>Custom code</h4>
                  <p className={styles.featurePara}>Customize everything with your own Javascript & CSS code</p>
                </div>

              </div>
              <div className={styles.feature}>
                <div className={styles.featureLogo}>
                  <img className='featureImage' src={custDomain} alt="custDomain" />
                </div>
                <div>
                  <h4 className={styles.featureHeading}>Custom domain</h4>
                  <p className={styles.featurePara}>Connect your typebot to the custom URL of your choice</p>
                </div>

              </div>
              <div className={styles.feature}>
                <div className={styles.featureLogo}>
                  <img className='featureImage' src={folder} alt="folder" />
                </div>
                <div>
                  <h4 className={styles.featureHeading}>Folder management</h4>
                  <p className={styles.featurePara}>Organize your typebots in specific folders to keep it clean and work with multiple clients</p>
                </div>

              </div>
            </div>
            <div className={styles.featureImagesContainer}>
              <h3 style={{fontSize:"1.5rem", fontWeight:'inherit'}}>Loved by teams and creators from all around the world</h3>
              <div className= {styles.featureImagesDiv}>
                  {featureImages.map((feature)=>(
                    <img className= {styles.featureImage} src={feature} alt= "feature"/>
                  ))}
              </div>
            </div>
            
      </div>

      <div className={styles.container8}>
          <div className={styles.triangleWidget}>
            <img style={{ width: "25rem"}} src={triangleWidget} alt="triangleWidget" />
          </div>
          <div className={styles.container8Info}>
            <h1>Improve conversion and user engagement with FormBots </h1>
            <button className={styles.container1Button} onClick={()=> navigate('/register')}>Create a FormBot </button>
            <p className={styles.paragraph} >No trial. Generous <span style={{fontWeight:'bold'}}>free</span> plan.</p>
          </div>
          <div className={styles.archWidget}>
            <img style={{ width: "25rem"}}  src={archWidget} alt="archWidget" />
          </div>
      </div>

      <footer style={{backgroundColor:"#111114"}} >
        <div className={styles.footer}>
        <div>
          <ul className={styles.FooterList}>
            <li>Made with ❤️ by</li>
            <li><a href="#">@cuvette</a></li>
          </ul>
        </div>
        <div>
            <ul className={styles.FooterList}>
              <li> <a href="#">Status <img src={footerLink} alt="footerLink" /></a> </li>
              <li><a href="#">Documentation <img src={footerLink} alt="footerLink" /></a> </li>
              <li> <a href="#">Raodmap <img src={footerLink} alt="footerLink" /></a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
        </div>
        <div>
            <ul className={styles.FooterList}>
              <li> <a href="#">Discord <img src={footerLink} alt="footerLink" /></a></li>
              <li> <a href="#">GitHub repository <img src={footerLink} alt="footerLink" /></a></li>
              <li><a href="#">Twitter <img src={footerLink} alt="footerLink" /></a></li>
              <li> <a href="#">LinkdIn <img src={footerLink} alt="footerLink" /></a></li>
              <li><a href="#">OSS Friends</a></li>
            </ul>
        </div>
        <div>
          <ul className={styles.FooterList}>
            <li><a href="#">About</a></li>
            <li><a href="#">Contacts</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privancy policy</a></li>
          </ul>
        </div>
        </div>
      </footer>
      
    </div>
  );
};

export default LandingPage;
