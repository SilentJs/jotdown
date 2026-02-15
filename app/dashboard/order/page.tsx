'use client'
import Image from 'next/image';
import { use, useEffect, useRef, useState } from 'react'
import styles from './order.module.css'
import addImage from '../../images/add.svg' 
import substractImage from '../../images/minus-sign_svg.svg'
import recordImageMain from '../../images/recordImageMain.png'
import a4ImageMain from '../../images/a4ImageMain.png'
import leftarrow from '../../images/left-arrow.svg'
import rightarrow from '../../images/right-arrow.svg'
import backgroundImg from '../../images/background.png'
import instructionBoxImg from '../../images/instuctionBoxBg.jpg'
import uploadInstructionBoxImg from '../../images/uploadInstructionBg.png'
import billBoxButton from '../../images/bill-button.svg'
import { dashboardStateA4, dashboardStateSR } from './dashboardStates';
import LinkEmbed from '../../linkEmbed';
import { DecodedJwtPayload, billValues, ordersDashboardState, order, order2, orderCustomizationSettings, serverUrl } from '../../types';


import * as dotenv from 'dotenv'
import Fileupload from '../../fileUpload';
import DialogueBox from '../../Dialogue';
import AddressContainer from '../../addressCheck';
import { schoolRecordImage } from '../../multiImage';
dotenv.config()


export default function ProfileHandler() {
    const [ dashboardState, setDashboardState ] =useState<ordersDashboardState>(dashboardStateSR)
    const [ fileLinks , setFileLinks ] =useState<Array<any>>([])
    // const [ fileUploadJson , setFileUploadJson ] = useState<any>()
    const [ billState , setBillState ] = useState<billValues>({billProperty1:0,billProperty2:0,billProperty3:0,billProperty4:0})
    function addPageNumber():void{if(dashboardState.noteBookNumber!==0 && dashboardState.pageNumber<dashboardState.noteBookNumber)dashboardStateChange('pageNumber',dashboardState.pageNumber+5)}
    function substractPageNumber():void{if(dashboardState.pageNumber>0) dashboardStateChange('pageNumber',dashboardState.pageNumber-5)}
    function addNoteBookNumber():void{dashboardStateChange('noteBookNumber',dashboardState.noteBookNumber+5)}
    function substractNoteBookNumber():void{if(dashboardState.noteBookNumber>0) dashboardStateChange('noteBookNumber',dashboardState.noteBookNumber-5);if(dashboardState.noteBookNumber-1===0) {dashboardStateChange('pageNumber',0);dashboardStateChange('diagramNumber',0);};if(dashboardState.pageNumber>dashboardState.noteBookNumber-5&&dashboardState.pageNumber!==0) dashboardStateChange('pageNumber',dashboardState.pageNumber-5)}
    function addDiagramNumber():void{if(dashboardState.noteBookNumber!==0) dashboardStateChange('diagramNumber',dashboardState.diagramNumber+1);}
    function substractDiagramNumber():void{if(dashboardState.diagramNumber>0) dashboardStateChange('diagramNumber',dashboardState.diagramNumber-1);}
    function setRecordState():void{setDashboardState(dashboardStateSR)}
    function setA4State():void{setDashboardState(dashboardStateA4)}
    function setNotebookState():void{
      if(dashboardState.isType1Selected){dashboardStateChange('isType1Selected',false);dashboardStateChange('selectedTypeCost',dashboardState.type2Cost);return;}
      dashboardStateChange('isType1Selected',true);dashboardStateChange('selectedTypeCost',dashboardState.type1Cost)
    }
    const billRef1 = useRef(null);const billRef2 = useRef(null);const billRef3 = useRef(null);const billRef4 = useRef(null);const fileLinksRef = useRef(null);const instructionsRef = useRef(null)
    function addFileLinks(e){e.preventDefault();fileLinksHandler({link:fileLinksRef.current.value,action:'add'});fileLinksRef.current.value=''}
    function removeFileLinks(link){fileLinksHandler({link,action:'remove'})}
    const fileLinksHandler = ({ link, action }: { link: string, action: 'add' | 'remove' }) => {
      if (action === 'add'&&link) {
        if(fileLinks.length>2) return;
        setFileLinks(fileLinks => [...fileLinks, link]); // Add link to state array
      } else if (action === 'remove') {
        setFileLinks(fileLinks => fileLinks.filter(item => item !== link)); // Remove link from state array
      }
      console.log(fileLinks)
    };
    const dashboardStateChange = (key:string,value:any) =>{
      setDashboardState((prevState:ordersDashboardState)=>({
        ...prevState,
        [key]:value
      }))
    }
    const orderImageMainShift = (change:number)=>{
      var _number =dashboardState.imageSelected
      const imageSelectorNumber =()=>{if(_number+change>3){return 0}else if(_number+change<0){return 3}else{return _number+change}}
      console.log(imageSelectorNumber())
      dashboardStateChange('imageSelected',imageSelectorNumber())
      dashboardStateChange('image',dashboardState.imageFunction(dashboardState.imageSelected))
    }
    
    async function paymentHandler(){
        const response:any = await fetch(serverUrl+'create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: orderListPriceSummation(), // Set your desired amount
        }),
      });

      const orderData = await response.json();

      const options = {
        key_id: 'rzp_test_7lzt9XHzGCDSqY',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'jotdown',
        description: 'Payment for your service',
        order_id: orderData.id,
        handler: function(response) {
          orderCheck(response.razorpay_payment_id)
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9876543210',
        },
        theme: {
          color: '#0e0906',
        },
        image:'https://imgur.com/a/1cynITk'
      };
      // @ts-ignore
      const rzp = new Razorpay(options);
      rzp.open();
      rzp.on('payment.success',()=>{
        alert('Payment Sucessful')
      })
    }
    const updateScreenWidth = () => {
      dashboardStateChange('screenWidth',window.innerWidth);
      if(window.innerWidth<1820) {dashboardStateChange('displayBillList',false)}
      else{dashboardStateChange('displayBillList',true)}
    };
    const toggleSetDisplayBillList = () =>{
      console.log('Bogus')
      dashboardStateChange('billBoxNotification',false)
      if(dashboardState.displayBillList){dashboardStateChange('displayBillList',false)}
      else{dashboardStateChange('displayBillList',true)}
    }
    var fileUploadJson
    const fileUploadHandler = (fileState:any) => {
      localStorage.uploadName=fileState.uploadName
      localStorage.serverName=fileState.serverName
    }
    useEffect(()=>{
      window.addEventListener('resize',updateScreenWidth)
    })
    useEffect(()=>{
      if(!dashboardState.displayBillList){dashboardStateChange('billBoxNotification',true)}
      
    },[dashboardState.diagramNumber,dashboardState.isType1Selected,dashboardState.noteBookNumber,dashboardState.pageNumber])
    return (
    //   <div className={styles.orderBackground}>dafsq</div>
    
    <div className={styles.orderContainer}>
        <div className='transparentGlass'></div>

        <div className={styles.orderImageContainer}><Image className={styles.orderImage} src={dashboardState.image}  alt='Image Of a Product' /><Image className={styles.orderImageRightButton} onClick={()=>orderImageMainShift(1)} src={rightarrow} alt='rightarrow' /><Image className={styles.orderImageLeftButton} onClick={()=>orderImageMainShift(-1)} src={leftarrow} alt='leftarrow' /><div className={styles.orderImageGlass}></div><div className={styles.orderImageTextHeading}>{dashboardState.type}</div><div className={styles.orderText}>Lorem Ipsum Kya Lorem Ipsum? Teri Maa ka Lorem Ipsum Arrae Nahi chahiye mughe lorem ipsum </div></div>
        <div className={styles.orderSelectionContainer}>
            <div className={styles.orders}>
                <div className={styles.order} onClick={setRecordState}><Image src={recordImageMain} alt='wtf' className={styles.orderSelectionImage}></Image><div className={styles.ordertext}>School Record</div><div className={styles.ordertextGlass}></div></div>
                <div className={styles.order2} onClick={setA4State}><Image src={a4ImageMain} alt='wtf' className={styles.orderSelectionImage}></Image><div className={styles.ordertext}>A4 Assignment</div><div className={styles.ordertextGlass}></div></div>
                {/* <div className={styles.order3}><Image src={recordImageMain} alt='wtf' className={styles.orderSelectionImage}></Image><div className={styles.ordertext}>School Record</div><div className={styles.ordertextGlass}></div></div>
                <div className={styles.order4}><Image src={recordImageMain} alt='wtf' className={styles.orderSelectionImage}></Image><div className={styles.ordertext}>School Record</div><div className={styles.ordertextGlass}></div></div> */}
            </div>
        </div>
        <div className={styles.orderCustomizationContainer}>
        {/* <Image src={substractImage} alt="-" width={20} height={20} /> */}
            <textarea className={styles.instructionBox} ref={instructionsRef} placeholder='Jotdown your instructions'></textarea>
            <div className={styles.mathButtonContainer2}><div className={styles.mathButtonContainerInfo}>Number of Pages </div><div className={styles.mathAddButton} onClick={addNoteBookNumber}><Image src={addImage} alt="+" width={20} height={20} /></div><div className={styles.mathSubstractButton} onClick={substractNoteBookNumber}><Image src={substractImage} alt="+" width={20} height={20} style={{width: '20px',position: 'absolute'}} /></div><div className={styles.mathButtonsAmount}>{dashboardState.noteBookNumber}</div></div>
            <div className={styles.mathButtonContainer}><div className={styles.mathButtonContainerInfo}>Number of Decoration </div><div className={styles.mathAddButton} onClick={addPageNumber}><Image src={addImage} alt="+" width={20} height={20} /></div><div className={ dashboardState.noteBookNumber===0 ? styles.mathSubstractButton2 : styles.mathSubstractButton} onClick={substractPageNumber}><Image src={substractImage} style={{width: '20px',position: 'absolute'}} alt="+" width={20} height={20} /></div><div className={styles.mathButtonsAmount}>{dashboardState.pageNumber}</div></div>
            <div className={styles.mathButtonContainer3}><div className={styles.mathButtonContainerInfo}>Number of Diagrams</div><div className={styles.mathAddButton} onClick={addDiagramNumber}><Image src={addImage} alt="+" width={20} height={20} /></div><div className={ dashboardState.noteBookNumber===0 ? styles.mathSubstractButton2 : styles.mathSubstractButton} onClick={substractDiagramNumber}><Image src={substractImage} alt="+" width={20} height={20} style={{width: '20px',position: 'absolute'}} /></div><div className={styles.mathButtonsAmount}>{dashboardState.diagramNumber}</div></div>
            <Fileupload onUploadChange={fileUploadHandler}></Fileupload>
            <div className={styles.filelinksContainer}>
              <Image className={styles.filelinkButton} onClick={addFileLinks} alt="wtf" src={addImage} />
              <input className={styles.filelinkInput} ref={fileLinksRef} placeholder='Add other file links'></input>
            </div>
            {fileLinks?.map((link: string, index: number) => (
              <LinkEmbed key={index} link={link} offset={90+index*50} onComponentRemove={removeFileLinks} unMountAllowed='true' darkMode='false'/>
            ))}
            <div className={styles.noteBookTypeContainer}><div className={`${dashboardState.isType1Selected ? styles.noteBookType1 : styles.noteBookType2} ${styles.noteBookButton1}`} onClick={setNotebookState}>{dashboardState.notebooktype1}</div><div className={`${dashboardState.isType1Selected ? styles.noteBookType2 : styles.noteBookType1} ${styles.noteBookButton2}`} onClick={setNotebookState}>{dashboardState.notebooktype2}</div></div>
        </div>
        {/* <DialogueBox>{typeof window!== undefined && <AddressContainer left='10px' onAddressChange={(r)=>dashboardStateChange('fullAddress',r)}></AddressContainer>}</DialogueBox> */}
        <div className={styles.orderBillContainer} style={{right:dashboardState.displayBillList ? '10px' : '-420px'}}>
        <div className={styles.orderListCrossButton} onClick={toggleSetDisplayBillList}>Close</div>

            <div className={styles.orderBillContainerHeading}>Bill</div>
            <div className={styles.orderListContainer}>
                <div>{dashboardState.isType1Selected ? dashboardState.notebooktype1 : dashboardState.notebooktype2}</div>
                <div>Number of Pages {`(${dashboardState.noteBookNumber})`} @₹50/5</div>
                <div>Number of Decorations {`(${dashboardState.pageNumber})`} @₹18/5</div>
                <div>Number of Diagrams {`(${dashboardState.diagramNumber})`} @₹5/1</div>
                <div>Total</div>
                <div>Delivery Charges</div>
            </div>
            <div className={styles.orderListPriceContainer}>
                <div ref={billRef1}>₹{dashboardState.selectedTypeCost}</div>
                <div ref={billRef2}>₹{(dashboardState.noteBookNumber/5)*50}</div>
                <div ref={billRef3}>₹{(dashboardState.pageNumber/5)*15}</div>
                <div ref={billRef4}>₹{dashboardState.diagramNumber*5}</div>
                <div className={styles.orderListPriceSummation}>₹{orderListPriceSummation()}</div>
                <div>+₹70</div>
            </div>
            <div className={styles.orderBuyButton} onClick={paymentHandler}>Buy Now</div>
            <div className={styles.orderAddToCartButton} >Add To Cart</div>
            
        </div>
        <div className={styles.billBoxButton} onClick={toggleSetDisplayBillList}>{dashboardState.billBoxNotification ? <div className={styles.billBoxButtonNotification}></div> : ''}Show Order Summary</div>
        {/* <Image className={styles.billBoxButton} onClick={toggleSetDisplayBillList} src={billBoxButton} alt='Bill Box Button'></Image> */}
    </div>
    )
    function orderListPriceSummation():string{
      return `${dashboardState.selectedTypeCost+((dashboardState.noteBookNumber/5)*50)+((dashboardState.pageNumber/5)*15)+(dashboardState.diagramNumber*5)}`
    } 
    function orderCheck(paymentid){
            var instructionValue = instructionsRef.current.value.replace('.',' ').replace(",",' ').replace("`",' ').replace("'",' ').replace(`"`,' ')
            console.log(fileUploadJson)
            console.log(paymentid)
            const localStorageJSON:DecodedJwtPayload = JSON.parse(localStorage.loggedInData);
            if(localStorage.loggedIn==='false') {console.log('Not Logged In')}
            console.log('loggedIn');
            const apiUrl = serverUrl+'orderCheck';

            // Data you want to send in the POST request
            const postData:order = {
                id: localStorageJSON.sub,
                ordertype:dashboardState.type,
                pagenumber:dashboardState.noteBookNumber.toString(),
                decornumber:dashboardState.pageNumber.toString(),
                diagramnumber:dashboardState.diagramNumber.toString(),
                instructions:instructionValue,
                filelinks:JSON.stringify(fileLinks),
                totalamount:orderListPriceSummation(),
                ogfilename:localStorage.uploadName,
                serverfilename:localStorage.serverName,
                fulladdress:JSON.stringify(JSON.parse(localStorage.savedDetails)[0]) ,
                paymentid
            };
            instructionsRef.current.value=''
            fileLinksRef.current.value=''
            billRef1.current.value=''
            billRef2.current.value=''
            billRef3.current.value=''
            billRef4.current.value=''
            
            // Send POST request using fetch
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other custom headers as needed
                },
                body: JSON.stringify(postData),
            })
            .then(response => response.json())
            .then(data => {
            console.log('Response from Express server:', data);
            // Handle the response as needed
            })
            .catch(error => {
            console.error('Error sending POST request:', error);
            // Handle errors
            }); 

    }
  }
  