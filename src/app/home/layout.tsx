import React from 'react'
import '../tailwind.css'
import Navbar from './home_container/Navbar'
import Footer from './home_container/Footer'

function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className='overflow-x-hidden ' >
        <div className="max-w-[1440px]  mx-auto  ">
          <div className=' w-full sticky top-0 z-10 left-0 right-0 ' > 
          <Navbar /> 
          </div>
          <div className="px-4 xl:px-0 lg:pt-0 pt-8 " >
            {children}
          </div> 
          <Footer /> 
        </div>
      </body>
    </html>
  )
}

export default HomeLayout