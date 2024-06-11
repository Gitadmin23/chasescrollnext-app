import FooterLandingPage from "@/components/landing_component/footer"
import LandingPageLayout from "@/components/landing_component/landingPageLayout"
import HomeNavbar from "@/components/landing_component/navbar"
import { Flex } from "@chakra-ui/react"
import React from "react"

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return(
      <LandingPageLayout>
        {children}
      </LandingPageLayout>
    )
  }