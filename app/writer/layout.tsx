import { Inter } from 'next/font/google'
import './writer.css'
// import { isMobile,isBrowser } from 'react-device-detect'

// import '../../lib/database/database'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
        <div className='inside'>{children}</div>
      </body>
    </html>
  )
}

