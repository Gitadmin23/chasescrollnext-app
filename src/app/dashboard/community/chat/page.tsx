'use client';
import MainArea from '@/components/Community/chat/MainArea';
import Sidebar from '@/components/Community/chat/Sidebar';
import CustomText from '@/components/general/Text';
import { Box, HStack, VStack,  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, } from '@chakra-ui/react';
import React from 'react'
import { useCommunityPageState } from './state';
import { useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';
import { IComment } from '@/models/Comment';

function CommunityChat() {
  const [comment, setComment] = React.useState<IComment[]>([]);
  const { drawerOpen, setAll, activeCommunity } = useCommunityPageState((state) => state);

  const {} = useQuery([`getComments-${activeCommunity?.id}`, activeCommunity?.id], () => httpService.get(`${URLS.GET_ALL_COMMENTS}`, {
    params: {
      postID: activeCommunity?.id
    }
  }), {
    enabled: activeCommunity !== null,
    onSuccess: (data) => {
      setComment(data.data.content);
    },
    onError: (error) => {
      alert('An erro')
    }
  })
  return (
    <HStack width={'100%'} height='100%' spacing={0} padding='5px'>
        {/* DRAWER */}
          <Drawer isOpen={drawerOpen} onClose={() => setAll({ drawerOpen: false })} placement='right' size={'md'}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader>
                <HStack justifyContent={'space-between'}>
                  <CustomText>Comments</CustomText>
                </HStack>
              </DrawerHeader>

              <DrawerBody>

              </DrawerBody>
            </DrawerContent>
          </Drawer>
        {/* END OF DRAWER */}
        <Box width={'30%'} height={'100%'} borderRightColor={'lightgrey'} borderWidth={activeCommunity !== null ? '1px':'0px'} >
            <Sidebar />
        </Box>
        <VStack flex={1} height='100%' bg='white' borderWidth={activeCommunity !== null ? 0:1}  borderColor={'brand.chasescrollButtonBlue'}  borderRadius={activeCommunity !== null ? '0px':'20px'}>
            <MainArea />
        </VStack>
    </HStack>
  )
}

export default CommunityChat