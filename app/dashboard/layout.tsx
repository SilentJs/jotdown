// import { isMobile,isBrowser } from 'react-device-detect'
import Sidebar from './sidebar'
import Navbar from './navbar'
import RazorpayService from './order/razorpayHandler'
export const razorPayService = new RazorpayService()
// import '../../lib/database/database'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    //11191812842-entvdr7r4qsikc6oo24fdp43qghtdk9i.apps.googleusercontent.com
    <html lang="en">
      <head>
      <script src="https://accounts.google.com/gsi/client" async></script>
      <script src="https://checkout.razorpay.com/v1/checkout.js" defer></script>
      </head>
      <body>
        <Navbar />
        <Sidebar />
        <div className='inside'>{children}</div>
      </body>
    </html>
  )
}


