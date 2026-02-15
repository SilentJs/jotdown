'use client'
import { useEffect, useState } from 'react'
import { GoogleOneTapProps, GoogleOneTapResponse } from '../types'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import orderIcon from '../images/order.svg'
import homeIcon from '../images/home.svg'
import aboutIcon from '../images/info.svg'
import writerIcon from '../images/writer.svg'
import joinusIcon from '../images/joinus.svg'
import './dashboard.css'
import React from 'react'
import jwt from 'jsonwebtoken'
// import google from 'google-one-tap'  

export default function Sidebar(){
    const router = useRouter()
    const [loggedIn ,setLoggedIn] = useState(false)
    const [loggedInData,setLoggedInData] = useState<any>({})
    const routeToAccounts = () => {router.push('/dashboard/account') }
    const routeToOrder = () => {router.push('/dashboard/order') }
    const routeToHome = () => {router.push('/dashboard/') }

    // window.onload=()=>{
    //     if(localStorage&&localStorage.loggedIn==='true'){
    //         setLoggedIn(true)
    //         setLoggedInData(JSON.parse(localStorage.loggedInData))
    //     }
    // }
   useEffect(()=>{
  
        if(typeof window.google !== 'undefined' && window.google.accounts && window.google.accounts.id&&!loggedIn){
            if(localStorage.loggedInData&&localStorage.loggedIn==='true'){setLoggedInData(JSON.parse(localStorage.loggedInData));setLoggedIn(true);return;}
            console.log("it passed but how?")
            const handleOneTapCallback = (response:GoogleOneTapResponse)=>{
                console.log(response)
                var jwtDecoded=jwt.decode(response.credential,{complete:true})?.payload
                console.log(jwtDecoded)
                if(jwtDecoded){
                    setLoggedInData(jwtDecoded)
                    setLoggedIn(true)
                    localStorage.loggedIn='true'
                    localStorage.loggedInData=JSON.stringify(jwtDecoded)
                } 
            }
            const googleOneTapOptions={
                callback:handleOneTapCallback,
                client_id:"11191812842-entvdr7r4qsikc6oo24fdp43qghtdk9i.apps.googleusercontent.com",
            }
            //@ts-ignore
            google.accounts.id.initialize(googleOneTapOptions);
            //@ts-ignore
            google.accounts.id.prompt()
        }
        // const apiUrl = 'http://localhost:4000/api/';

        // // Data you want to send in the POST request
        // const postData = {
        // key: 'value',
        // anotherKey: 'anotherValue',
        // };

        // // Send POST request using fetch
        // fetch(apiUrl, {
        // method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        //     // Add any other custom headers as needed
        // },
        // body: JSON.stringify(postData),
        // })
        // .then(response => response.json())
        // .then(data => {
        // console.log('Response from Express server:', data);
        // // Handle the response as needed
        // })
        // .catch(error => {
        // console.error('Error sending POST request:', error);
        // // Handle errors
        // });
    })
    
    return (
        <div className='sideBar'>
            <div className='profileButton' onClick={routeToAccounts}>
                {loggedInData.name ? (<div><img className='profilePic' src={loggedInData.picture} alt=''></img>
                <div className='profileName'>{loggedInData.name}</div>
                <div className='profileEmail'>{loggedInData.email}</div>
                <div className='somebar'></div></div>):(
                    <div className='profileReplacer'>Click to Login</div>
                )}
                
            </div>
            <div style={{top:'100px'}} className='sideBarButton' onClick={routeToHome}><Image src={homeIcon} alt='orderIcon' className='orderIcon'></Image>Home</div>
            <div className='sideBarButton' onClick={routeToOrder}><Image src={orderIcon} alt='orderIcon' className='orderIcon'></Image>Order</div>
            <div style={{top:'270px'}} className='sideBarButton'><Image src={writerIcon} alt='orderIcon' className='orderIcon'></Image>Our Writers</div>
            <div style={{top:'355px'}} className='sideBarButton'><Image src={aboutIcon} alt='orderIcon' className='orderIcon'></Image>About us</div>
            <div style={{top:'440px'}} className='sideBarButton'><Image src={joinusIcon} alt='orderIcon' className='orderIcon'></Image>Join us</div>
        </div>
    )       
}

export function GoogleOneTapComponent<React,FC>(){
    
}
  