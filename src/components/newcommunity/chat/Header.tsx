import { useCommunityPageState } from '@/components/Community/chat/state';
import CustomText from '@/components/general/Text'
import ReportCommunityModal from '@/components/modals/community/ReportCommunityModal';
import { useDetails } from '@/global-state/useUserDetails';
import { IEvent } from '@/models/Events';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { IMAGE_URL, RESOURCE_BASE_URL, URLS } from '@/services/urls';
import { THEME } from '@/theme';
import httpService from '@/utils/httpService';
import {
  HStack, VStack, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Box,
  Spinner,
  useToast,
  Link, useColorMode, Flex, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay
} from '@chakra-ui/react'
import { uniqBy } from 'lodash';
import React, { useState } from 'react'
import { FiCalendar, FiPlusSquare, FiX } from 'react-icons/fi';
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ArrowLeft2 } from 'iconsax-react'
import ShareEvent from '@/components/sharedComponent/share_event';
import useCustomTheme from "@/hooks/useTheme";
import CustomButton from '@/components/general/Button';
import { useRouter } from 'next/navigation';
import { EditIcon } from '@/components/svg';
import CommunityInfo from '../communityInfo';



function CommunityChatHeader() {
  const { activeCommunity, setAll, events, eventHasNext, eventPageNumber, showEvents } = useCommunityPageState((state) => state);
  const { userId } = useDetails((state) => state);
  const [showModal, setShowModal] = React.useState(false);
  const queryClient = useQueryClient();
  const toast = useToast();
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const {
    bodyTextColor,
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
  } = useCustomTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  const getCommunityEventts = useQuery([`getAllMyEvents-${activeCommunity?.id}`, activeCommunity?.id], () => httpService.get(`${URLS.GET_SAVED_EVENTS}`, {
    params: {
      page: 0,
      typeID: activeCommunity?.id,
    }
  }), {
    enabled: activeCommunity !== null,
    onSuccess: (data) => {
      const item: PaginatedResponse<IEvent> = data.data;
      console.log(item);
      if (item.content?.length > 0) {
        if (events.length > 0) {
          const arr = [...events, ...item.content];
          setAll({ events: uniqBy(arr, 'id'), eventHasNext: item.last ? false : true })
        } else {
          setAll({ events: item.content, eventHasNext: item.last ? false : true })
        }
      }
    },
    onError: () => { }
  })

  const self = userId === activeCommunity?.creator.userId;

  const leaveGroup = useMutation({
    mutationFn: () => httpService.delete(`${URLS.LEAVE_GROUP}`, {
      params: {
        groupID: activeCommunity?.id,
        userID: userId
      }
    }),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Successfully left the group',
        status: 'success',
        position: 'top-right',
        duration: 5000,
      })
      queryClient.invalidateQueries(['getJoinedGroups']);
      setAll({ activeCommunity: null, pageNumber: 0, hasNext: false, messages: [] })
    },
    onError: () => {
      toast({
        title: 'Error'
      })
    }
  });

  const deleteGroup = useMutation({
    mutationFn: () => httpService.delete(`${URLS.DELETE_GROUP}/${activeCommunity?.id}`, {
    }),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Successfully deleted the group',
        status: 'success',
        position: 'top-right',
        duration: 5000,
      })
      queryClient.invalidateQueries(['getJoinedGroups']);
      setAll({ activeCommunity: null, pageNumber: 0, hasNext: false, messages: [] })
    },
    onError: () => {
      toast({
        title: 'Error'
      })
    }
  });

  return (
    <Flex width='100%' height={'72px'} bg={"white"} alignItems={"center"} borderBottomWidth={'0.5px'} borderBottomColor={borderColor} paddingX={['0px', '20px']} justifyContent={'space-between'}>
      <Box display={['block', 'none']}>
        <ArrowLeft2 size={'20px'} variant='Outline' onClick={() => setAll({ activeCommunity: null })} />
      </Box>
      {/* {MODAL} */}
      <ReportCommunityModal isOpen={showModal} onClose={() => setShowModal(false)} typeID={activeCommunity?.id as string} REPORT_TYPE='REPORT_COMMUNITY' />
      <Flex gap={"3"} >
        {/* <Link href={`/dashboard/community/info/${activeCommunity?.id}`}> */}
        <Box w={"42px"} h={"42px"} bgColor={"ButtonText"} borderWidth={'1px'} borderBottomLeftRadius={'20px'} borderBottomRadius={'20px'} borderTopLeftRadius={'20px'} overflow={'hidden'}>
          <Image src={`${activeCommunity?.data?.imgSrc?.includes("http") ? "" : IMAGE_URL}${activeCommunity?.data?.imgSrc}`} alt='image' style={{ width: '100%', height: '100%', objectFit: "cover" }} />
        </Box>
        {/* </Link> */}
        <VStack alignItems={'flex-start'} spacing={0}>
          <CustomText fontFamily={'DM-Medium'} fontSize={'16px'} >{activeCommunity?.data.name}</CustomText>
          <CustomText fontFamily={'DM-Regular'} fontSize={'12px'}>{activeCommunity?.data.memberCount} Members</CustomText>
        </VStack>
      </Flex>

      <Flex alignItems={"center"} gap={"4"} >
        <CustomButton onClick={() => setOpen(true)} text={"Details"} color={"black"} fontSize={"sm"} width={"113px"} borderWidth={"1px"} borderColor={"#E7E7E7"} borderRadius={"full"} backgroundColor={"white"} />
        <ShareEvent type='COMMUNITY' id={activeCommunity?.id} showText={false} />
        {events.length > 0 && (
          <Box onClick={() => setAll({ showEvents: !showEvents })} cursor='pointer' position={'relative'} marginRight={'10px'} >

            <Image src='/assets/images/note-add.png' alt='logo' width={'30px'} height={'30px'} />

            <VStack justifyContent={'center'} alignItems={'center'} zIndex={'10'} position={'absolute'} top='-15px' right='-15px' bg='white' width='30px' height='30px' borderRadius={'15px'} shadow={'lg'}>
              <CustomText fontFamily={'DM-Bold'} fontSize={'14px'} color='red'>{events.length}</CustomText>
            </VStack>

          </Box>
        )}
      </Flex>

      <Drawer isOpen={open} onClose={() => setOpen(false)} placement='right' size={'sm'}>
        <DrawerOverlay />
        <DrawerContent bg={secondaryBackgroundColor}>
          <DrawerHeader >
            <Flex justifyContent={'space-between'}>
              <Box as='button' > 
                <EditIcon />
              </Box>
              <CustomText fontWeight={"700"} >Community info</CustomText>
              <Box as='button' onClick={() => setOpen(false)}  >
                <FiX fontSize='25px' color={THEME.COLORS.chasescrollButtonBlue} />
              </Box>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <CommunityInfo />
          </DrawerBody>

        </DrawerContent>
      </Drawer>

    </Flex>
  )
}

export default CommunityChatHeader