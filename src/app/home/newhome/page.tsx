"use client"
import Faq from '@/components/landing_component/home/FAQ'
import UserComment from '@/components/landing_component/home/userComment'
import AboutEventSection from '@/components/landing_component/newhome/AboutEventSection';
import EventOrganiser from '@/components/landing_component/newhome/EventOrganiser';
import FundraisingSection from '@/components/landing_component/newhome/FundraisingSection';
import HeroSection from '@/components/landing_component/newhome/HeroSection';
import KioskSection from '@/components/landing_component/newhome/KioskSection';
import ProfessionService from '@/components/landing_component/newhome/ProfessionService';
import RentalSection from '@/components/landing_component/newhome/RentalSection';
import ServiceSection from '@/components/landing_component/newhome/ServiceSection';
import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

export default function NewHome() {

    return (
        <Flex flexDir={"column"} color={"black"} w={"full"} >
            <HeroSection />
            <AboutEventSection />
            <FundraisingSection />
            <ServiceSection />
            <KioskSection />
            <EventOrganiser />
            <ProfessionService />
            <RentalSection />
            <UserComment />
            <Faq />
        </Flex>
    )
}