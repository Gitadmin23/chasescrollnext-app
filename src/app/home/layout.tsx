import React from 'react'
import '../tailwind.css'

function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <html>
        <body>
            {children}
        </body>
    </html>
  )
}

export default HomeLayout