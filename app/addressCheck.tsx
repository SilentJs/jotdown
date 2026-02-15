'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './admin.module.css'
import logoImg from '../images/jotdown_logo.png'
import Image from 'next/image'


export default function AddressContainer({onAddressChange,left}) {
    const [ aCCS,setACCS ] = useState<string>('Addresses are only stored in this browser')
    if(!left) left='inherit'
    const scrollRef = useRef(null)
    const [ scrollDone, setScrollDone ] =useState(false)
    const [details, setDetails] = useState({
        firstName: '',
        lastName: '',
        address: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        email: ''
    });

    const [savedDetails, setSavedDetails] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedDetails = localStorage.getItem('savedDetails');
            setSavedDetails(storedDetails ? JSON.parse(storedDetails) : []);
        }
    },[]);
   const scrollIntoView =  () => {
        if(scrollRef.current && !scrollDone){
            scrollRef.current.scrollIntoView({behaviour:'smooth'})
        }
    }
    useEffect(()=>{
        scrollIntoView()
    },[])
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };
    const outputSelectedAdress= (index:number) =>{
        onAddressChange(savedDetails[index])
    }
    const handleSaveDetails = () => {
        if(!details.address || !details.city || !details.phone || !details.firstName || !details.landmark || !details.lastName || !details.lastName || !details.pincode || !details.state){setACCS("Please fill out missing information"); return;}
        const updatedDetails = [details, ...savedDetails.slice(0, 2)];
        localStorage.setItem('savedDetails', JSON.stringify(updatedDetails));
        setSavedDetails(updatedDetails);
        setDetails({
            firstName: '',
            lastName: '',
            address: '',
            landmark: '',
            city: '',
            state: '',
            pincode: '',
            phone: '',
            email: ''
        });
    };

    return (
        <div className="addressCheckerContainer" style={{left:`${left}`}}>
            <div className='addressContainerInfo'>{aCCS}</div>
            <form onMouseEnter={()=>{scrollIntoView();setScrollDone(true)}}>
                <input
                    className='addressContainerInputBox addressCustomFirstName'
                    name="firstName"
                    placeholder='First Name'
                    value={details.firstName}
                    onChange={handleInputChange}
                    onClick={()=>setACCS('Example Vivan in Vivan Sharma')}
                />
                <input
                    className='addressContainerInputBox addressCustomLastName'
                    name="lastName"
                    placeholder='Last Name'
                    value={details.lastName}
                    onChange={handleInputChange}
                    onClick={()=>setACCS('Example Sharma in Vivan Sharma')}
                />
                <input
                    className='addressContainerInputBox addressCustomAddress'
                    name="address"
                    placeholder='Full Address'
                    value={details.address}
                    onChange={handleInputChange}
                    onClick={()=>setACCS('Complete Address including block,sector,pincode etc')}
                />
                <input
                    className='addressContainerInputBox addressCustomLandmark'
                    name="landmark"
                    placeholder='Landmarks'
                    value={details.landmark}
                    onChange={handleInputChange}
                    onClick={()=>setACCS('Example "Near Green Park"')}
                />
                <input
                    className='addressContainerInputBox addressCustomCity'
                    name="city"
                    placeholder='City'
                    value={details.city}
                    onChange={handleInputChange}
                    onClick={()=>setACCS('City you are residing in')}
                />
                <input
                    className='addressContainerInputBox addressCustomState'
                    name="state"
                    placeholder='State'
                    value={details.state}
                    onChange={handleInputChange}
                    onClick={()=>setACCS('State you are residing in')}
                />
                <input
                    className='addressContainerInputBox addressCustomPincode'
                    name="pincode"
                    placeholder='Pincode'
                    value={details.pincode}
                    onChange={handleInputChange}
                    onClick={()=>setACCS('Pincode of your area, crucial for delivering goods')}
                />
                <input
                    className='addressContainerInputBox addressCustomPhone'
                    name="phone"
                    placeholder='Phone'
                    value={details.phone}
                    onChange={handleInputChange}
                    onClick={()=>setACCS('Your phone number will only be shared with our delivery partners')}
                />
                <input
                    className='addressContainerInputBox addressCustomEmail'
                    name="email"
                    placeholder='Email'
                    value={details.email}
                    onChange={handleInputChange}
                    onClick={()=>setACCS('Optional for receving delivery related information')}
                />
                <div className='addressContainerSaveButton' onClick={handleSaveDetails}>Save Address</div>
            </form>

            <div className='addressCheckerContainerStatus'>
                <h3>Saved Addresses:</h3>

                {savedDetails.map((detail, index) => (
                    <div  ref={scrollRef} className='addressContainerStoredAddress' onClick={()=>outputSelectedAdress(index)} key={index} >
                        <div className='addressContainerStoredAddressListNumber'>{index}</div>
                        <strong>Name:</strong> {detail.firstName} {detail.lastName}, &nbsp;
                        <strong>Address:</strong> {detail.address}, &nbsp;
                        <strong>Landmark:</strong> {detail.landmark}, &nbsp;
                        <strong>City:</strong> {detail.city}, &nbsp;
                        <strong>State:</strong> {detail.state}, &nbsp;
                        <strong>Pincode:</strong> {detail.pincode}, &nbsp;
                        <strong>Phone:</strong> {detail.phone}, &nbsp;
                        <strong>Email:</strong> {detail.email}
                    </div>
                ))}
                
            </div>
        </div>
    );
}
