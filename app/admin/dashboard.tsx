'use client'
import { useRef, useState } from 'react';
import styles from './admin.module.css'
import NForders from './NForders';
import logout from '../images/logout.svg'
import Image from 'next/image'
import logoImg from '../images/jotdown_logo.png'
import { dashboardState } from '../types';
import LoadingBoundary from '../LoadingIndicatior';
  //FCA (For Control Area)
export default function Dashboard({onLogout}){
  var defaultDashboardState:dashboardState={controlAreaState:''}
  const [selectedValue, setSelectedValue] = useState('FF');
  const [ sessionStatus,setSessionStatus ]=useState<string>('')
  const [ dashboardState,setDashboardState ]=useState<dashboardState>(defaultDashboardState)
  function logoutAction(){localStorage.jwtToken='';onLogout()}
  function sessionExpiry(){localStorage.jwtToken='';setSessionStatus("Session Expired, Relogin");setDashboardState(defaultDashboardState)}
  function internalServerError(){setSessionStatus("Internal Server Error")}
  function setNFOrderStateFCA(){setDashboardState({controlAreaState:'NFOrders'});localStorage.nflist=''}
  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
    setNFOrderStateFCA()
    console.log(event.target.value)
  };
  return (
    <div className={styles.dashboardContainer}>
        <div className={styles.dashboardContainerHeading}>
          <Image className={styles.logoutButton} onClick={logoutAction} src={logout} alt='Image Of a Product' />
          <div className={styles.sessionStatus}>{sessionStatus}</div>
          Jotdown-prototype-admin-panel
        </div>
        <div className={styles.dashboardTabSwitcher}>
            <div className={styles.dashboardTabButton} >
            <form>
        <label form="dropdown">Select an option </label>
        <select id="dropdown" name="dropdown" value={selectedValue} onChange={handleDropdownChange}>
            <option value="NF">NF</option>
            <option value="SA">SA</option>
            <option value="AS">AS</option>
            <option value="PI">PI</option>
            <option value="DS">DS</option>
            <option value="FF">FF</option>
          
        </select>
        </form>
            </div> 
        </div>
        <div className={styles.dashboardControlArea}>
        {dashboardState.controlAreaState ? '' : <Image className={styles.logoImgX} src={logoImg} alt='logoBgImg'></Image>}
        <LoadingBoundary>
          {!dashboardState.controlAreaState && <div>''</div>}
          {dashboardState.controlAreaState === 'NFOrders' && <NForders orderStatus={selectedValue} onSessionExpired={sessionExpiry} onInternalServerError={internalServerError}></NForders>}
        </LoadingBoundary>
          
          
        </div>
        <div className={styles.dashboardInfoArea}>
        {/* <Image className={styles.logoImgX} src={logoImg} alt='logoBgImg' style={{left:'0px'}}></Image> */}
        </div>
    </div>
  )
}
  