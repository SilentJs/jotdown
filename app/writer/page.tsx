'use client'
import { useRef, useState } from 'react';
import styles from './writer.module.css'
import Signin from './signin';
import Dashboard from './dashboard';

export default function Home() {
  const [ signedIn , setSignedIn ] = useState(false)
  function signedInStateSetter(){
    if(signedIn){setSignedIn(false);return;}
    setSignedIn(true)
  }
  return (
    <div>
      {signedIn ? <Dashboard onLogout={signedInStateSetter}></Dashboard> : <Signin signedIn={signedInStateSetter}></Signin> }
    </div>
  )
}
  