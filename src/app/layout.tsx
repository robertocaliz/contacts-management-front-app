'use client'

import { ReactNode } from "react"
import NextAuthContext from "@/contexts/next-auth-context"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Nav from "@/components/nav";
import '../../styles/global.css'


export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <NextAuthContext>
          <Nav />
          {children}
          <ToastContainer />
        </NextAuthContext>
      </body>
    </html>
  )
}
