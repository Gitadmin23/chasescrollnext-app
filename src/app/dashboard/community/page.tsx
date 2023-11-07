'use client'

import CommunityTab from '@/components/Community/CommunityTab';
import Requests from '@/components/Community/Requests';
import { Box, HStack, VStack } from '@chakra-ui/react'
import React from 'react' 
import { useRouter } from 'next/navigation'
import CommunityChat from '@/components/Community/chat/CommunityChat';

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

        <Box flex={1} height='100%' width='100%' overflowY={'scroll'} >
          {switchPages()}
        </Box>

      </VStack>
    </>
  )
}

export default Community