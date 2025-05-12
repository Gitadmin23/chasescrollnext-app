"use client"
import FundHeroSection from '@/components/landing_component/home/kiosk/HeroSection'
import HowItWorks from '@/components/landing_component/home/kiosk/HowItWorks'
import PlansSection from '@/components/landing_component/home/kiosk/PlansSection'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function Kiosk() {
    return ( 
        <Flex flexDir={"column"} color={"black"} w={"full"} >
            <FundHeroSection />
            <HowItWorks />
            <PlansSection />
        </Flex>
    )
}
