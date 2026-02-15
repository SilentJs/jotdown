import './dashboard.css'
import logo from '../images/JOTDOWN_standalone_logo.png'
import Image from 'next/image'
import Version from '../version'
export default function Navbar() {
    return (
        <div className='navBar'>
            <Version></Version>
            <Image className='navbarLogo' alt='navbarLogo' src={logo}></Image>
        </div>
    )
}