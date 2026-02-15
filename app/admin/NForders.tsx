'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './admin.module.css'
import Signin from './signin';
import Dashboard from './dashboard';
import { adminPanelAction, credentialsJson, order, serverUrl, tokenJson } from '../types';
import dotenv from 'dotenv';
import Image from 'next/image'
import LinkEmbed from '../linkEmbed';
import './admin.css'
import JsonDownloadButton from '../jsonFileGenerator';
dotenv.config();

export default function NForders({orderStatus,onSessionExpired,onInternalServerError}) {
  const [ signedIn , setSignedIn ] = useState(true)
  const writerRef = useRef(null)
  const [ adminPanelAction,setAdminPanelAction ] =useState<adminPanelAction>()
  const [  writerButtonImage,setWriterButtonImage ] = useState<any>("OK")
  const [ displayOrderNumber , setDisplayOrderNumber ] = useState<number>(0)
  const [ nfOrdersList,setNfOrdersList   ] = useState<Array<order>>([])
  function execute(){
    if(!localStorage.nflist){
      const apiUrl = serverUrl+'nonadviewaccesible';
    const postData:credentialsJson= {
        type:'admin',
        password:localStorage.jwtToken,
        orderstatus:orderStatus
    };
    console.log(orderStatus)
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
            onSessionExpired()
            return;
        }
        if(response.status>500){onInternalServerError();return;}
        response.json().then(r=>{         
          setNfOrdersList(r) 
          localStorage.nflist='set'
          console.log(r)                  
        })
      })
    }
  }
  execute()
  function writerSelector(orderId,writerId?){
      console.log(orderId)
      const apiUrl = serverUrl+'adminPanelStore';
    fetch(apiUrl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other custom headers as needed
            },
            body: JSON.stringify({
              jwtToken:localStorage.jwtToken,
              settings:{
                action:writerRef.current ? 'WA' : 'WDA',
                orderId,
                writerId: writerRef.current ? writerRef.current.value : nfOrdersList[displayOrderNumber].assignedwriterid
              }
            } as tokenJson),
      }
    ).then(response=>{
        if(response.status>=400 && response.status<500){
            onSessionExpired()
            return;
        }
        if(response.status>500){onInternalServerError();return;}
        response.json().then(r=>{
          console.log(r)                  
        })
    })
  }  
  function writerRemove(){
    setAdminPanelAction('WDA');writerSelector(nfOrdersList[displayOrderNumber].orderid,nfOrdersList[displayOrderNumber].assignedwriterid)
  }
  function writerAssign(){
    setAdminPanelAction('WA');writerSelector(nfOrdersList[displayOrderNumber].orderid)
  }
  useEffect(()=>{
  })
  return (
    <div>
      {nfOrdersList[0] && nfOrdersList?.reverse()?.map((order:order, index: number) => (
          <div className={styles.orderContainer} onClick={()=>setDisplayOrderNumber(index)} key={index} style={{top:`${index*140}px`}}>
            <div className={styles.jsonDownloadButton}><JsonDownloadButton jsonData={order} jsonKey='orderid'></JsonDownloadButton></div>
            <div className={styles.orderId}>ORDER ID {order.orderid}</div>
            <div className={styles.orderType}>{order.ordertype}</div>
            <div className={styles.userId}>USER ID {order.id}</div>
            <div className={styles.totalAmount}>AMOUNT ₹{order.totalamount}</div>
            <div className={styles.orderStatus} style={{color:`--info-color-${order.orderstatus}`}}>{order.orderstatus}</div>
            <div className={styles.orderTotalLinks}>Total Links {JSON.parse(order.filelinks)?.length}</div>
            <div className={styles.orderPaymentId}>PAYMENT ID {order.paymentid}</div>
            <div className={styles.orderDate}>{JSON.parse(order.timestamp).date}</div>
            <div className={styles.orderTime}>{JSON.parse(order.timestamp).time}</div>
            
          </div>
      ))}
      {nfOrdersList[0] && (<div className={styles.orderInfoContainer}>
          <div className={styles.infoOrderId}>ORDER ID {nfOrdersList[displayOrderNumber].orderid}</div>
          {
          nfOrdersList[displayOrderNumber].orderstatus==='SA' ? 
          <div className={styles.infoAssignedWriterId}>Assigned Writer ID {nfOrdersList[displayOrderNumber].assignedwriterid}<div className={styles.writerSelectorButton} onClick={writerRemove}>REMOVE</div></div> :  
          <div className={styles.writerSelectorContainer}><div className={styles.writerSelectorButton} onClick={writerAssign}>{writerButtonImage}</div><input className={styles.writerSelectorInput} placeholder='Paste a USER ID to assign' ref={writerRef} /></div>
          }
          <div className={styles.infoOrderType}>{nfOrdersList[displayOrderNumber].ordertype}</div>
          <div className={styles.infoUserId}>USER ID {nfOrdersList[displayOrderNumber].id}</div>
          <div className={styles.infoTotalAmount}>AMOUNT ₹{nfOrdersList[displayOrderNumber].totalamount}</div>
          <div className={styles.infoOrderStatus}>{nfOrdersList[displayOrderNumber].orderstatus}</div>
          <div className={styles.infoOrderTotalLinks}>Total Links {JSON.parse(nfOrdersList[displayOrderNumber].filelinks)?.length}</div>
          <div className={styles.infoOrderPaymentId}>PAYMENT ID {nfOrdersList[displayOrderNumber].paymentid}</div>
          <div className={styles.infoOrderDate}>{JSON.parse(nfOrdersList[displayOrderNumber].timestamp).date}</div>
          <div className={styles.infoOrderTime}>{JSON.parse(nfOrdersList[displayOrderNumber].timestamp).time}</div>
          <div className={styles.infoPageNumber}>Pages {nfOrdersList[displayOrderNumber].pagenumber}</div>
          <div className={styles.infoDecorationNumber}>Decorations {nfOrdersList[displayOrderNumber].decornumber}</div>
          <div className={styles.infoDiagramNumber}>Diagrams {nfOrdersList[displayOrderNumber].diagramnumber}</div>
          <div className={styles.infoFileUploaded}>File Uploaded {nfOrdersList[displayOrderNumber].ogfilename ? 'YES' : 'NO'}</div>
          <div className={styles.infoOgFileName}>Customer File <a target="_blank" rel="noopener noreferrer" href={serverUrl+'download/'+nfOrdersList[displayOrderNumber].serverfilename}>{nfOrdersList[displayOrderNumber].ogfilename}</a></div>
          <div className={styles.infoAddress}>ADDRESS {JSON.parse(nfOrdersList[displayOrderNumber].fulladdress).address}</div>
          <div className={styles.infoServerFileName}>Server File <a target="_blank" rel="noopener noreferrer" href={serverUrl+'download/'+nfOrdersList[displayOrderNumber].serverfilename}></a></div>
          <div className={styles.infoLinkEmbedContainer} > 
          {JSON.parse(nfOrdersList[displayOrderNumber].filelinks)?.map((link: string, index: number) => (
            <LinkEmbed key={index} link={link} offset={90+index*60} onComponentRemove='' unMountAllowed='false' darkMode='true'/>
            ))}
          </div>
      </div>)}
    </div>
  )
}
  