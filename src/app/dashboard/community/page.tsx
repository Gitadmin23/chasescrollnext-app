'use client'

import CommunityTab from '@/components/Community/CommunityTab';
import FindCommunity from '@/components/Community/FindCommunity';
import MyCommunities from '@/components/Community/MyCommunities';
import Requests from '@/components/Community/Requests';
import CustomText from '@/components/general/Text';
import { THEME } from '@/theme';
import { Box, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { FiPlusSquare } from 'react-icons/fi';
import { useRouter } from 'next/navigation'
import { FiPlusSquare } from 'react-icons/fi';
import { useRouter } from 'next/navigation'

function Community() {
  const [activeTab, setActiveTab] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);

  const router = useRouter();

  // function
  const handleTabChange = React.useCallback((tab: number) => {
    setActiveTab(tab);
  }, [])

  const switchPages = React.useCallback(() => {
    switch(activeTab) {
      case 1: {
        return <MyCommunities />
      }
      case 2: {
        return <FindCommunity />
      }
      case 3: {
        return <Requests />
      }
      default: {
        return <MyCommunities />
      }
    }
  }, [activeTab])
  const [activeTab, setActiveTab] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);

  const router = useRouter();

  // function
  const handleTabChange = React.useCallback((tab: number) => {
    setActiveTab(tab);
  }, [])

  const switchPages = React.useCallback(() => {
    switch(activeTab) {
      case 1: {
        return <MyCommunities />
      }
      case 2: {
        return <FindCommunity />
      }
      case 3: {
        return <Requests />
      }
      default: {
        return <MyCommunities />
      }
    }
  }, [activeTab])
  return (
    <VStack width='100%' height='100vh' spacing={0}>

      <CommunityTab activeTab={activeTab} setActiveTab={handleTabChange} showModal={() => setShowModal(true)}  />

      {/* SMALL SCREEN CREATE COMMUNITY BUTTON */}
      <HStack onClick={() => router.push('community/create')} display={['flex', 'none']} width='100%' height='50px' justifyContent={'center'} alignItems={'center'}>
        <FiPlusSquare size='20' color={THEME.COLORS.chasescrollButtonBlue} />
        <CustomText fontFamily={'Satoshi-Medium'} fontSize={'16px'}>Create community</CustomText>
      </HStack>

      <Box width='100%' flex={1} overflowY={'auto'} >
        {switchPages()}
      </Box>
    </VStack>
    <VStack width='100%' height='100vh' spacing={0}>

      <CommunityTab activeTab={activeTab} setActiveTab={handleTabChange} showModal={() => setShowModal(true)}  />

      {/* SMALL SCREEN CREATE COMMUNITY BUTTON */}
      <HStack onClick={() => router.push('community/create')} display={['flex', 'none']} width='100%' height='50px' justifyContent={'center'} alignItems={'center'}>
        <FiPlusSquare size='20' color={THEME.COLORS.chasescrollButtonBlue} />
        <CustomText fontFamily={'Satoshi-Medium'} fontSize={'16px'}>Create community</CustomText>
      </HStack>

      <Box width='100%' flex={1} overflowY={'auto'} >
        {switchPages()}
      </Box>
    </VStack>
  )
}

export default Community