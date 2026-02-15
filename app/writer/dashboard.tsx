'use client'
import { useRef, useState } from 'react';
import styles from './writer.module.css'
import NForders from './NForders';
import logout from '../images/logout.svg'
import Image from 'next/image'
import logoImg from '../images/jotdown_logo.png'
import { dashboardState } from '../types';
import LoadingBoundary from '../LoadingIndicatior';
  //FCA (For Control Area)
export default function Dashboard({onLogout}){
  var defaultDashboardState:dashboardState={controlAreaState:''}
  const [ sessionStatus,setSessionStatus ]=useState<string>('')
  const [ dashboardState,setDashboardState ]=useState<dashboardState>(defaultDashboardState)
  function logoutAction(){localStorage.writerJwtToken='';onLogout()}
  function sessionExpiry(){localStorage.writerJwtToken='';setSessionStatus("Session Expired, Relogin");setDashboardState(defaultDashboardState)}
  function internalServerError(){setSessionStatus("Internal Server Error")}
  function setNFOrderStateFCA(){setDashboardState({controlAreaState:'NFOrders'});localStorage.nflist=''}
  return (
    <div className={styles.dashboardContainer}>
        <div className={styles.dashboardContainerHeading}>
          <Image className={styles.logoutButton} onClick={logoutAction} src={logout} alt='Image Of a Product' />
          <div className={styles.sessionStatus}>{sessionStatus}</div>
          Jotdown-prototype-writer-panel
        </div>
        <div className={styles.dashboardTabSwitcher}>
            <div className={styles.dashboardTabButton} onClick={setNFOrderStateFCA}>Orders</div> 
        </div>
        <div className={styles.dashboardControlArea}>
        <NForders onSessionExpired={sessionExpiry} onInternalServerError={internalServerError}></NForders>
 
          
          
        </div>
        <div className={styles.dashboardInfoArea}>
        {/* <Image className={styles.logoImgX} src={logoImg} alt='logoBgImg' style={{left:'0px'}}></Image> */}
        </div>
    </div>
  )
}
  