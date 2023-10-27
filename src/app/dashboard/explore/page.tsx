'use client'
import ExploreCarousel from '@/components/explore_component/carousel'
import SugestedUserSection from '@/components/explore_component/suggestedusersection'
import { useDetails } from '@/global-state/useUserDetails'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

function Explore() {

  const { firstName, lastName } = useDetails((state) => state);

  return ( 
    <Box width={"full"} px={"6"} overflowX={"hidden"} > 
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