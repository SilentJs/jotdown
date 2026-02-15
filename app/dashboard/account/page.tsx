'use client'
import { useEffect, useState } from 'react'
import style from './accounts.module.css'
import { useRouter } from 'next/navigation'
import { DecodedJwtPayload, order, serverUrl } from '../../types'
import AddressContainer from '../../addressCheck'


export default function ProfileHandler() {
  const router =  useRouter()
  const [profileData , setProfileData ] =useState<DecodedJwtPayload|null>()
  const [ loggedIn , setLoggedIn ] = useState(false)
  const [ orders , setOrders] = useState<[order] | []>([])
  const [ accountPanel,setAccountPanelState ] = useState<"Orders" | "Address" | "">("")
 
  useEffect(()=>{
    if(typeof window!==undefined&&localStorage.loggedIn==='true'&&localStorage.loggedInData&&!profileData){setProfileData(JSON.parse(localStorage.loggedInData))}
    if (typeof window !== 'undefined'&&localStorage.loggedIn==='true') {
      // Retrieve the value from localStorage when the component mounts
      setLoggedIn(true)
    }
    
  })
  function logout(){
    localStorage.loggedInData=''
    localStorage.loggedIn='false'
    router.push('/dashboard/order')
  }
  function requestOrders(){
    const apiUrl = serverUrl+'profileOrderStore';

          // Data you want to send in the POST request
          // Send POST request using fetch
          fetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  // Add any other custom headers as needed
              },
              body: JSON.stringify({id:profileData?.sub}),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Response from Express server:', data);
            setOrders(data)
          // Handle the response as needed
          })
          .catch(error => {
            console.error('Error sending POST request:', error);
          // Handle errors
          }); 
    setAccountPanelState('Orders')
  }
  
    return (
      <main>
        { typeof window!==undefined && loggedIn ? (
        <div>
          <div className={style.profileContainer}>
            <div className={style.profileImageContainer}><img src={profileData?.picture}></img></div>
            <div className={style.profileName}>{profileData?.name}</div>
            <div className={style.profileEmail}>{profileData?.email}</div>
            <div className={style.profileButtonContainer}>
            <div className={style.profileOrderButton} onClick={requestOrders}>Orders</div>
            <div className={style.profileTransactionsButton}>Transactions</div>
            <div className={style.profileAboutUsButton}>About US</div>
            <div className={style.profileLogout} onClick={logout}>Logout</div>
            <div className={style.addressButton} onClick={()=>setAccountPanelState('Address')}>Address</div>
          </div>
          </div>
          <div className={style.profileOrdersContainer}>
          {accountPanel==='Address' && <AddressContainer left='inherit' onAddressChange={()=>''}></AddressContainer>

          }
            {orders[0] && accountPanel==='Orders' && orders.map((item:order,index:number)=>(
              <div className={style.profileOrdersContainerOrder} key={index}>
                <div className={style.profileOrdersOrderId}>Order ID {item.orderid}</div>
                <div className={style.profileOrdersOrderType}>Order Type {item.ordertype==='REC' ? 'School Record' : 'A4 Assignment'}</div>
                <div className={style.profileOrdersPageNumber}>Total Pages{item.pagenumber}</div>
                <div className={style.profileOrdersDecorNumber}>Decorations {item.decornumber}</div>
                <div className={style.profileOrdersDiagramNumber}>Diagrams {item.diagramnumber}</div>
                <div className={style.profileOrdersInstructions}>Click To Show</div>
                <div className={style.profileOrdersFileLinks}>Click To Show</div>
                <div className={style.profileOrdersTotalAmount}>Total Amount ₹{item.totalamount}</div>
                <div className={style.profileOrdersOrderStatus}>{item.orderstatus==='NF' ? ('Not fullfiled') : item.orderstatus==='BF' ? ('Being Prepared') : item.orderstatus==='CC' ? ('Fullfilled'): ('Waiting for delivery')}</div>
                <div className={style.profileOrdersTimeStamp}>{JSON.parse(item.timestamp).date} {JSON.parse(item.timestamp).time}</div>
              </div>
            ))} {accountPanel==='' && <div className={style.profileOrdersContainerOrder}>No Orders? Try Refreshing</div>}
          </div>
        </div>
        ):(
          <div>Hello</div>
        )
        }
        </main>
    )
  }
  
  