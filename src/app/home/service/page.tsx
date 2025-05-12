"use client"
import FundHeroSection from '@/components/landing_component/home/service/HeroSection'
import HowItWorks from '@/components/landing_component/home/service/HowItWorks'
import PlansSection from '@/components/landing_component/home/service/PlansSection'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function Fundraising() {
    return ( 
        <Flex flexDir={"column"} color={"black"} w={"full"} >
            <FundHeroSection />
            <HowItWorks />
            <PlansSection />
        </Flex>
    )
}
