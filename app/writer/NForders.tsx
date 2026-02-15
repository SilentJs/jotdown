'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './writer.module.css'
import Signin from './signin';
import Dashboard from './dashboard';
import Image from 'next/image'
import { credentialsJson, order, serverUrl } from '../types';
import dotenv from 'dotenv';
import LinkEmbed from '../linkEmbed';
import Fileupload from '../fileUpload';
import addImage from '../images/add.svg'
dotenv.config();

export default function NForders({onSessionExpired,onInternalServerError}) {
  const [ signedIn , setSignedIn ] = useState(true)
  const [ fileLinks , setFileLinks ] =useState<Array<any>>([])
  const [ orderLoaded , setOrderLoaded] =useState(false)
  const [ displayOrderNumber , setDisplayOrderNumber ] = useState<number>(0)
  const [ uploadFile,setUploadedFile] =useState(null)
  const [ nfOrdersList,setNfOrdersList   ] = useState<Array<order>>([])
  const fileLinksRef = useRef(null)

  const fileLinksHandler = ({ link, action }: { link: string, action: 'add' | 'remove' }) => {
    if (action === 'add'&&link) {
      if(fileLinks.length>2) return;
      setFileLinks(fileLinks => [...fileLinks, link]); // Add link to state array
    } else if (action === 'remove') {
      setFileLinks(fileLinks => fileLinks.filter(item => item !== link)); // Remove link from state array
    }
    console.log(fileLinks)
  };
  // function execute(){
  //   if(!localStorage.nflist){
  //     const apiUrl = serverUrl+'nonadviewaccessible';
  //   const postData= {
  //       jwtToken:localStorage.writerJwtToken
  //   };
  //   fetch(apiUrl,
  //       {
  //           method: 'POST',
  //           headers: {
  //               'Content-Type': 'application/json',
  //               // Add any other custom headers as needed
  //           },
  //           body: JSON.stringify(postData),
  //       }
  //   ).then(response=>{
  //       if(response.status>=400 && response.status<500){
  //           onSessionExpired()
  //           return;
  //       }
  //       if(response.status>500){onInternalServerError();return;}
        // response.json().then(r=>{
          
        //   setNfOrdersList(r) 
        //   localStorage.nflist='set'
        //   console.log(r)                  
        // })
  //   })
  //   }
  // }
  //   execute()
  function addFileLinks(e){e.preventDefault();fileLinksHandler({link:fileLinksRef.current.value,action:'add'});fileLinksRef.current.value=''}
  function removeFileLinks(link){fileLinksHandler({link,action:'remove'})}
  function jwtHandler(){
    if(orderLoaded) return;
    if(!localStorage.writerJwtToken) return;
    const apiUrl = serverUrl+'nonadviewaccesible';
    const postData:credentialsJson= {
        type:'writer',
        uuid:localStorage.uuid,
        password:localStorage.writerJwtToken,
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
          onSessionExpired()
          return;
        }
        if(response.status>500){onInternalServerError();return;}
        response.json().then(r=>{
          
          setNfOrdersList(r) 
          localStorage.nflist='set'
          console.log(r)
          if(!r) setNfOrdersList([])                  
        })
    })
    setOrderLoaded(true)
  }
  function handleUpload(result){
    setUploadedFile(result)
  }
  jwtHandler()
  return (
    <div>
      {nfOrdersList[0] && nfOrdersList?.map((order:order, index: number) => (
          <div className={styles.orderContainer} onClick={()=>setDisplayOrderNumber(index)} key={index} style={{top:`${index*140}px`}}>
            <div className={styles.orderId}>ORDER ID {order.orderid}</div>
            <div className={styles.orderType}>{order.ordertype}</div>
            <div className={styles.userId}>USER ID {order.id}</div>
            <div className={styles.totalAmount}>AMOUNT ₹{order.totalamount}</div>
            <div className={styles.orderStatus}>{order.orderstatus}</div>
            <div className={styles.orderTotalLinks}>Total Links {order.filelinks!=='undefined' && JSON.parse(order.filelinks)?.length}</div>
            
            <div className={styles.orderPaymentId}>PAYMENT ID {order.paymentid}</div>
            <div className={styles.orderDate}>{JSON.parse(order.timestamp).date}</div>
            <div className={styles.orderTime}>{JSON.parse(order.timestamp).time}</div>
          </div>
      ))}
      {nfOrdersList[0] && (<div className={styles.orderInfoContainer}>
        {nfOrdersList[displayOrderNumber].orderstatus==='SA' ? <div className={styles.filelinksContainer}>
              <Image className={styles.filelinkButton} onClick={addFileLinks} alt="wtf" src={addImage} />
              <input className={styles.filelinkInput} ref={fileLinksRef} placeholder='Add other file links'></input>
            </div> : '' }
          <div className={styles.linkEmbedContainer2}>{fileLinks?.map((link: string, index: number) => (
              <div className={styles.linkEmbedContainerContainer}><LinkEmbed key={index} link={link} offset={90+index*50} onComponentRemove={removeFileLinks} unMountAllowed={nfOrdersList[displayOrderNumber].orderstatus==='SA' ? 'true' : 'false' } darkMode='true'/></div>
            ))}</div>  
          <div className={styles.infoCompleteOrderButton}>COMPLETE ORDER</div>
          <div className={styles.infoOrderId}>ORDER ID {nfOrdersList[displayOrderNumber].orderid}</div>
          <div className={styles.infoOrderType}>{nfOrdersList[displayOrderNumber].ordertype}</div>
          <div className={styles.infoUserId}>USER ID {nfOrdersList[displayOrderNumber].id}</div>
          <div className={styles.infoTotalAmount}>AMOUNT ₹{nfOrdersList[displayOrderNumber].totalamount}</div>
          <div className={styles.infoOrderStatus}>{nfOrdersList[displayOrderNumber].orderstatus}</div>
          <div className={styles.infoOrderTotalLinks}>Total Links {nfOrdersList[displayOrderNumber].filelinks!=='undefined' && JSON.parse(nfOrdersList[displayOrderNumber].filelinks)?.length}</div>
          <div className={styles.infoOrderPaymentId}>PAYMENT ID {nfOrdersList[displayOrderNumber].paymentid}</div>
          <div className={styles.infoOrderDate}>{JSON.parse(nfOrdersList[displayOrderNumber].timestamp).date}</div>
          <div className={styles.infoOrderTime}>{JSON.parse(nfOrdersList[displayOrderNumber].timestamp).time}</div>
          <div className={styles.infoPageNumber}>Pages {nfOrdersList[displayOrderNumber].pagenumber}</div>
          <div className={styles.infoDecorationNumber}>Decorations {nfOrdersList[displayOrderNumber].decornumber}</div>
          <div className={styles.infoDiagramNumber}>Diagrams {nfOrdersList[displayOrderNumber].diagramnumber}</div>
          <div className={styles.infoFileUploaded}>File Uploaded {nfOrdersList[displayOrderNumber].ogfilename ? 'YES' : 'NO'}</div>
          <div className={styles.orderFileUpload}>{nfOrdersList[displayOrderNumber].orderstatus==='SA' ? <Fileupload onUploadChange={handleUpload}></Fileupload>: ''}</div>
          <div className={styles.infoOgFileName}>Customer File <a target="_blank" rel="noopener noreferrer" href={serverUrl+'download/'+nfOrdersList[displayOrderNumber].serverfilename}>{nfOrdersList[displayOrderNumber].ogfilename}</a></div>
          <div className={styles.infoServerFileName}>Server File <a target="_blank" rel="noopener noreferrer" href={process.env.SERVER_ADDRESS+'/'+nfOrdersList[displayOrderNumber].serverfilename}></a>{process.env.SERVER_ADDRESS+'/'+nfOrdersList[displayOrderNumber].serverfilename}</div>
          <div className={styles.infoLinkEmbedContainer} > 
          {nfOrdersList[displayOrderNumber].filelinks!=='undefined'&& JSON.parse(nfOrdersList[displayOrderNumber].filelinks)?.map((link: string, index: number) => (
            <LinkEmbed key={index} link={link} offset={90+index*60} onComponentRemove='' unMountAllowed='false' darkMode='true'/>
            ))}
          </div>
      </div>)}
    </div>
  )
}
  