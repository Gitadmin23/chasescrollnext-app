'use client'
import ExploreCarousel from '@/components/explore_component/carousel'
import SugestedUserSection from '@/components/explore_component/suggestedusersection'
import { useDetails } from '@/global-state/useUserDetails'
import {Box, Flex, Text, useColorMode} from '@chakra-ui/react'
import React from 'react'
import useCustomTheme from "@/hooks/useTheme";

function Explore() {

  const { firstName, lastName } = useDetails((state) => state);

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

  return ( 
    <Box width={"full"} px={"6"} overflowX={"hidden"} bg={mainBackgroundColor} >
      <Box py={"6"} > 
        <Text fontSize={"24px"} fontWeight={"medium"} >Hello {firstName+" "+lastName}</Text>
        <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} mt={"2"} >Top Events</Text>
      </Box>
      <ExploreCarousel />
      <SugestedUserSection />
    </Box>
  )
}

export default Explore