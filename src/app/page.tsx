'use client'

import React from 'react';
import { Flex } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
// import Image from 'next/image'
import EventComponent from '@/components/event_component';
import DashboardNavbar from '@/components/sharedComponent/dashboard_navbar';
import SelectEventPage from '@/components/event_component/select_event_page';
import './tailwind.css'
import { useDetails } from '@/global-state/useUserDetails';
import SearchBar from '@/components/explore_component/searchbar';

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
    <Flex width={"full"} flexDir={"column"} height={"100vh"} position={"relative"} overflowX={"hidden"} >
      <Flex w={"full"} position={"sticky"} zIndex={"30"} top={"0px"} >
        <DashboardNavbar home={true} pathname={pathname} />
      </Flex>
      <Flex width={"full"} mt={"120px"} px={["6", "8"]} flexDir={"column"} >
        <Flex justifyContent={"center"} width={"full"} pb={"5"} display={["flex", "flex", "none"]} >
          <SearchBar home={true} />
        </Flex>
        <Flex width={"full"} justifyContent={"space-between"} pb={"8"} alignItems={"center"}  >
          {(userId && email) && (
            <SelectEventPage />
          )}
          <Flex onClick={() => clickHander()} as={"button"} ml={"auto"} width={"fit-content"} fontWeight={"semibold"} border={"1px solid #3C41F0"} px={"10px"} color={"brand.chasescrollBlue"} fontSize={"12px"} height={"25px"} rounded={"32px"} alignItems={"center"} gap={"2"} >
            Create Event
          </Flex>
        </Flex>
        <EventComponent />
      </Flex>
    </Flex>
    // <VStack width='100%' height='100vh' justifyContent={'center'} alignItems={'center'} >
    //   <Image src='/assets/images/chasescroll-logo.png' width={200} height={200} alt='logo' />
    // </VStack>
  )
}
