'use client'

import CommunityTab from '@/components/Community/CommunityTab';
import Requests from '@/components/Community/Requests';
import {Box, HStack, Spinner, useColorMode, VStack} from '@chakra-ui/react'
import React from 'react' 
import { useRouter } from 'next/navigation'
import CommunityChat from '@/components/Community/chat/CommunityChat';
import { useSearchParams } from 'next/navigation'
import CustomText from '@/components/general/Text';
import useCustomTheme from "@/hooks/useTheme";

function Community() {
  const [activeTab, setActiveTab] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);

  const router = useRouter();
  const query = useSearchParams();

  const {
    bodyTextColor,
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
  } = useCustomTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  React.useEffect(() => {
    const tab = query?.get('tab');
    if (tab) {
      if (tab === 'request') {
        setActiveTab(2);
      }
    }
  }, [query])

  // function
  const handleTabChange = React.useCallback((tab: number) => {
    setActiveTab(tab);
  }, [])

  const switchPages = React.useCallback(() => {
    switch (activeTab) {
      case 1: {
        return <CommunityChat />
      }
      case 2: {
        return <Requests />
      }
      default: {
       return (
        <VStack width='100%' height='100%' justifyContent={'center'} alignItems={'center'}>
          <Spinner size='sm' colorScheme='blue' />
          <CustomText>Loading...</CustomText>
        </VStack>
       )
      }
    }
  }, [activeTab])
 
  return (
    <> 
      <VStack width='100%' height='100vh' spacing={0}>

        <CommunityTab activeTab={activeTab} setActiveTab={handleTabChange} showModal={() => setShowModal(true)} />

        <Box flex={1} height='100%' width='100%' overflowY={'scroll'} bg={mainBackgroundColor} >
          {switchPages()}
        </Box>

      </VStack>
    </>
  )
}

export default Community