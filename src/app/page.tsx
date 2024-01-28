'use client'

import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
// import Image from 'next/image'
import EventComponent from '@/components/event_component';
import DashboardNavbar from '@/components/sharedComponent/dashboard_navbar';
import SelectEventPage from '@/components/event_component/select_event_page';
import './tailwind.css'
import { useDetails } from '@/global-state/useUserDetails';
import SearchBar from '@/components/explore_component/searchbar';
import HomeEventSection from '@/components/home_event_section';
import HomeFooter from '@/components/home_event_section/home_footer';
import EventCategory from '@/components/event_component/event_category';
import FilterLocation from '@/components/home_event_section/filter_location';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  const { userId, email } = useDetails((state) => state);

  const clickHander = () => {
    if (userId && email) {
      router.push("/dashboard/event/create_event")
    } else {
      router.push("/auth")
    }
  }


  //  React.useEffect(() => {  
  //   router.push('/auth');
  //  }, [router]);

  return (
    <Flex flexDir={"column"} height={"100vh"} position={"relative"} overflowX={"hidden"} >
      <Flex w={"full"} position={"sticky"} zIndex={"30"} top={"0px"} >
        <DashboardNavbar home={true} pathname={pathname} />
      </Flex>
      <Flex width={"full"} mt={"120px"} px={["6", "8"]} flexDir={"column"} >
        <Flex justifyContent={"center"} width={"full"} pb={"5"} display={["flex", "flex", "none"]} >
          <SearchBar home={true} />
        </Flex>
        <Flex width={"full"} justifyContent={"space-between"} pb={"8"} alignItems={"center"}  >
          {/* {(userId && email) && (
            <SelectEventPage />
          )} */}
          <FilterLocation />
          <Flex onClick={() => clickHander()} as={"button"} ml={"auto"} width={"fit-content"} fontWeight={"medium"} border={"1px solid #3C41F0"} px={"10px"} color={"brand.chasescrollBlue"} fontSize={"14px"} lineHeight={"20px"} height={"44px"} rounded={"8px"} alignItems={"center"} gap={"2"} >
            Create Event
          </Flex>
        </Flex>
        <EventCategory />
        <Flex maxW={"1440px"} w={"full"} mx={"auto"} flexDir={"column"} >
          <HomeEventSection />
        </Flex>
        {/* </Flex> */}
      </Flex>
      <Box w={"full"} bg={"white"} display={["none", "none", "none", "none", "block"]} mt={"auto"} bottom={"0px"} >
        <HomeFooter />
      </Box>
    </Flex>
    // <VStack width='100%' height='100vh' justifyContent={'center'} alignItems={'center'} >
    //   <Image src='/assets/images/chasescroll-logo.png' width={200} height={200} alt='logo' />
    // </VStack>
  )
}
