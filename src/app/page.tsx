// 'use client'

// import React, { useEffect } from 'react';
// import { Box, Flex, Text } from '@chakra-ui/react'
// import { usePathname, useRouter } from 'next/navigation'
// // import Image from 'next/image'
// import EventComponent from '@/components/event_component';
// import DashboardNavbar from '@/components/sharedComponent/dashboard_navbar'; 
// import './tailwind.css' 
// import SearchBar from '@/components/explore_component/searchbar';
// import HomeEventSection from '@/components/home_event_section';
// import HomeFooter from '@/components/home_event_section/home_footer';
// import EventCategory from '@/components/event_component/event_category'; 
// import CreateEventBtn from '@/components/sharedComponent/create_event_btn';

// export default function Home() {

//   const pathname = usePathname();

//   useEffect(() => {
//     sessionStorage.setItem("tp_token", "")
//   }, [])

//   return (
//     <Flex flexDir={"column"} height={"100vh"} position={"relative"} overflowX={"hidden"} >
//       <Flex w={"full"} position={"sticky"} flexDir={"column"} gap={"5"} bgColor={"white"} pb={"4"} zIndex={"30"} top={"0px"} >
//         <DashboardNavbar home={true} pathname={pathname} />
//         <Flex pt={"90px"} bg={"white"} px={["6", "8"]} justifyContent={"center"} width={"full"} pb={"1"} display={["flex", "flex", "none"]} >
//           <SearchBar home={true} />
//         </Flex>

//         <Flex bg={"white"} pt={["0px", "0px", "85px"]} pb={"2"} alignItems={"center"} px={["6", "8"]} >
//           <EventCategory eventpage={true}  />
//         </Flex>
//       </Flex>
//       <Flex width={"full"} px={["6", "8"]} flexDir={"column"} >
//         <Flex width={"full"} bg={"white"} pt={"2"} justifyContent={"end"} pb={"4"} alignItems={"center"}  >
//           {/* <FilterLocation /> */}
//           <CreateEventBtn />
//         </Flex>
//         {/* <EventCategory /> */}
//         <Flex maxW={"1440px"} w={"full"} mx={"auto"} flexDir={"column"} >
//           <HomeEventSection />
//         </Flex>
//         {/* </Flex> */}
//       </Flex>
//       <Box w={"full"} bg={"white"} zIndex={"20"} display={["none", "none", "none", "none", "block"]} mt={"auto"} pt={"2"} borderTop={"1px"} borderTopColor={"#CDD3FD"} pos={"sticky"} bottom={"0px"} >
//         <HomeFooter />
//       </Box>
//     </Flex> 
//   )
// }
// "use client"
// import EventCategory from "@/components/event_component/event_category";
// import EventListing from "@/components/event_component/event_listing";
// import SearchBar from "@/components/explore_component/searchbar";
// import OurPartner from "@/components/landing_component/home/ourpartner";
// import HomeLandingPageCarousel from "@/components/landing_component/home_carousel";
// import LandingPageLayout from "@/components/landing_component/landingPageLayout";
// import useSearchStore from "@/global-state/useSearchData";
// import { setTokenInCookies } from "@/utils/tokenutil";
// import { Flex, Text } from "@chakra-ui/react";
// import { useState, useEffect } from "react";

// const Eventpage = () => {

//   const { event_category } = useSearchStore((state) => state);

//   const [size, setSize] = useState(9);

//   useEffect(() => {
//     setTokenInCookies();
//   }, [])

//   const clickHander = () => {
//     if (size === 9) {
//       setSize(50)
//     } else {
//       setSize(9)
//     }
//   }

//   return (
//     <LandingPageLayout>
//       <Flex flexDir={"column"} w={"full"} bg={"transparent"}  >
//         <Flex display={["flex", "flex", "none"]} pt={"4"} px={"6"} >
//           <SearchBar landing={true} home={true} />
//         </Flex>
//         <Flex px={["6", "6", "12"]} gap={["4", "4", "0px"]} w={"full"} flexDir={["column-reverse", "column-reverse", "column-reverse"]} justifyContent={"space-between"} alignItems={["start", "start", "start"]} pt={"4"} pb={"2"} >
//           <Text color={"#2B2D31"} fontSize={["18px", "18px", "24px"]} lineHeight={["16.94px", "16.94px", "29.05px"]} fontWeight={"500"} >{event_category ? event_category?.replaceAll("_", " ") : "Upcoming Events"}</Text>
//           <Flex width={["full", "full", "full"]} justifyContent={"end"} >
//             <EventCategory selector={true} />
//           </Flex>
//         </Flex>
//         {!event_category && (
//           <HomeLandingPageCarousel />
//         )}
//         <Flex py={["4", "4", "9"]} gap={"8"} flexDir={"column"} px={["0px", "12"]} >
//           <EventListing limit={true} landing={true}/>
//         </Flex>
//         <OurPartner />
//       </Flex>
//     </LandingPageLayout>
//   );
// }

// export default Eventpage;

"use client"
import Faq from '@/components/landing_component/home/FAQ'
import UserComment from '@/components/landing_component/home/userComment'
import LandingPageLayout from '@/components/landing_component/landingPageLayout';
import AboutEventSection from '@/components/landing_component/newhome/AboutEventSection';
import EventOrganiser from '@/components/landing_component/newhome/EventOrganiser';
import FundraisingSection from '@/components/landing_component/newhome/FundraisingSection';
import GetThingDone from '@/components/landing_component/newhome/getThingDone';
import HeroSection from '@/components/landing_component/newhome/HeroSection';
import KioskSection from '@/components/landing_component/newhome/KioskSection';
import ProfessionService from '@/components/landing_component/newhome/ProfessionService';
import RentalSection from '@/components/landing_component/newhome/RentalSection';
import ServiceProvider from '@/components/landing_component/newhome/serviceProvider';
import ServiceSection from '@/components/landing_component/newhome/ServiceSection';
import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

export default function NewHome() {

  return (
    <LandingPageLayout>
      <Flex flexDir={"column"} color={"black"} w={"full"} >
        <HeroSection />
        <AboutEventSection />
        <GetThingDone />
        {/* <FundraisingSection />
        <ServiceSection /> */}
        {/* <KioskSection /> */}
        <EventOrganiser />
        <ProfessionService />
        <ServiceProvider/>
        {/* <RentalSection /> */}
        <UserComment />
        <Faq />
      </Flex>
    </LandingPageLayout>
  )
}
