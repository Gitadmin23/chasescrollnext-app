"use client"
import FundHeroSection from '@/components/landing_component/home/event/HeroSection'
import HowItWorks from '@/components/landing_component/home/event/HowItWorks'
import PlansSection from '@/components/landing_component/home/event/PlansSection'
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
