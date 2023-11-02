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
import CommunityChat from '@/components/Chat/CommunityChat';

function Community() {
  const [activeTab, setActiveTab] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);

  const router = useRouter();

  // function
  const handleTabChange = React.useCallback((tab: number) => {
    setActiveTab(tab);
  }, [])

  const switchPages = React.useCallback(() => {
    switch (activeTab) {
      case 1: {
        return <CommunityChat />
      }
      case 3: {
        return <Requests />
      }
    }
  }, [activeTab])
 
  return (
    <> 
      <VStack width='100%' height='100vh' spacing={0}>

        <CommunityTab activeTab={activeTab} setActiveTab={handleTabChange} showModal={() => setShowModal(true)} />

        <Box width='100%' flex={1} overflowY={'auto'} >
          {switchPages()}
        </Box>
      </VStack>
    </>
  )
}

export default Community