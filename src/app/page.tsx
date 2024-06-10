'use client'

import React, { useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
// import Image from 'next/image'
import EventComponent from '@/components/event_component';
import DashboardNavbar from '@/components/sharedComponent/dashboard_navbar'; 
import './tailwind.css' 
import SearchBar from '@/components/explore_component/searchbar';
import HomeEventSection from '@/components/home_event_section';
import HomeFooter from '@/components/home_event_section/home_footer';
import EventCategory from '@/components/event_component/event_category'; 
import CreateEventBtn from '@/components/sharedComponent/create_event_btn';

export default function Home() {

  const pathname = usePathname();

  useEffect(() => {
    sessionStorage.setItem("tp_token", "")
  }, [])

  return (
    <Flex flexDir={"column"} height={"100vh"} position={"relative"} overflowX={"hidden"} >
      <Flex w={"full"} position={"sticky"} flexDir={"column"} gap={"5"} bgColor={"white"} pb={"4"} zIndex={"30"} top={"0px"} >
        <DashboardNavbar home={true} pathname={pathname} />
        <Flex pt={"90px"} bg={"white"} px={["6", "8"]} justifyContent={"center"} width={"full"} pb={"1"} display={["flex", "flex", "none"]} >
          <SearchBar home={true} />
        </Flex>

        <Flex bg={"white"} pt={["0px", "0px", "85px"]} pb={"2"} alignItems={"center"} px={["6", "8"]} >
          <EventCategory eventpage={true}  />
        </Flex>
      </Flex>
      <Flex width={"full"} px={["6", "8"]} flexDir={"column"} >
        <Flex width={"full"} bg={"white"} pt={"2"} justifyContent={"end"} pb={"4"} alignItems={"center"}  >
          {/* <FilterLocation /> */}
          <CreateEventBtn />
        </Flex>
        {/* <EventCategory /> */}
        <Flex maxW={"1440px"} w={"full"} mx={"auto"} flexDir={"column"} >
          <HomeEventSection />
        </Flex>
        {/* </Flex> */}
      </Flex>
      <Box w={"full"} bg={"white"} zIndex={"20"} display={["none", "none", "none", "none", "block"]} mt={"auto"} pt={"2"} borderTop={"1px"} borderTopColor={"#CDD3FD"} pos={"sticky"} bottom={"0px"} >
        <HomeFooter />
      </Box>
    </Flex> 
  )
}
