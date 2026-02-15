'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './admin.module.css'
import logoImg from '../images/jotdown_logo.png'
import Image from 'next/image'
import { serverUrl } from '../types'


export default function Signin({signedIn}){
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const [ loading,setLoading ]=useState<boolean>(false)
    const [ loginStatus,setLoginStatus ]=useState<string>('About')
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!usernameRef.current.value || !passwordRef.current.value) return;
        if(loading) return;
        setLoading(true); 
        console.log('Input Value:',usernameRef.current.value)
        console.log('Input Value:',passwordRef.current.value)
            console.log('loggedIn');
            const apiUrl = serverUrl+'adviewaccesible';

            // Data you want to send in the POST request
            const postData= {
                type:'admin',
                username:usernameRef.current.value,
                password:passwordRef.current.value
            };
            const loginSafety = setTimeout(()=>{
                setLoading(false)
                setLoginStatus('Timed Out')
            },12000)
            
            // Send POST request using fetch
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other custom headers as needed
                },
                body: JSON.stringify(postData),
            })
            .then(response =>{
                setLoading(false)
                response.json().then(r=>{localStorage.jwtToken=r.jwtToken})
                clearTimeout(loginSafety)
                if(response.status>=400 && response.status<500){setLoginStatus('Invalid Credentials');return;}
                if(response.status>500){setLoginStatus('Internal Server Error');return;}
                setLoginStatus('About')
                signedIn()
            })
            // .then(data => {
            // console.log('Response from Express server:', data);
            // // Handle the response as needed
            //     setLoading(false)
            //     clearTimeout(loginSafety)
            // })
            .catch(error => {
            console.error('Error sending POST request:', error);
            // Handle errors
            }); 
    }
    function jwtHandler(){
        if(!localStorage.jwtToken) return;
        const apiUrl = serverUrl+'adviewaccesible';
        const postData= {
            type:'jwtToken',
            password:localStorage.jwtToken
        };
        fetch(apiUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other custom headers as needed
                },
                body: JSON.stringify(postData),
            }
        ).then(response=>{
            if(response.status>=400 && response.status<500){
                setLoginStatus('Session Expired');
                localStorage.jwtToken=''
                return;
            }
            if(response.status>500){setLoginStatus('Internal Server Error');return;}
            signedIn()
        })
        
    }
    useEffect(()=>{
        jwtHandler()
    })
    return(
        <div className={styles.mainBox}>
            <div className={styles.heading}>Admin Login</div>
            <input className={styles.username} ref={usernameRef} placeholder='Username'></input>
            <input className={styles.password} ref={passwordRef} type='password' placeholder='Password'></input>
            <div className={styles.button} onClick={handleSubmit} style={{background:loading ? 'grey' : 'var(--root-color)'}}>Login</div>
            <div className={styles.about}>{loading ? <div className='loading'></div> : loginStatus }</div>
            <div className={styles.companyEffect}>© 2024 Jotdown inc. All rights reserved</div>
            <div className={styles.helper}></div>
            <Image className={styles.logoImg} src={logoImg} alt='logoImg' width={600} height={360}/>
        </div>
    )
}