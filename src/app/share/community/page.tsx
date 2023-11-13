
'use client';
import CustomText from '@/components/general/Text'
import { Box, HStack, Spinner, VStack, InputGroup, InputLeftElement, Input, Image, Grid, GridItem, Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { FiBell, FiChevronLeft, FiDownloadCloud, FiEdit2, FiLink, FiLogIn, FiSettings } from 'react-icons/fi'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { IMAGE_URL, URLS } from '@/services/urls';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { ICommunity, ICommunityMember } from '@/models/Communitty';
import { IUser } from '@/models/User';
import SettingsChip from '@/components/Community/SettingsChip';
import { THEME } from '@/theme';
import MemberCard from '@/components/Community/MemberCard';
import { IMediaContent } from '@/models/MediaPost';
import { FILE_FORMATS } from '@/utils/acceptedMediatypes';
import { useDetails } from '@/global-state/useUserDetails';
import { uniqBy } from 'lodash';
import ShareEvent from '@/components/sharedComponent/share_event';
import { useSearchParams } from 'next/navigation'


function ShareCommunity() {
  const query = useSearchParams();
  const type = query?.get('type');
  const typeID = query?.get('typeID');
  const [details, setDetails] = React.useState<ICommunity|null>(null);
  const [members, setMembers] = React.useState<ICommunityMember[]>([]);
  const [posts, setPosts] = React.useState<IMediaContent[]>([])
  const [search, setSearch] = React.useState('');
  const [mediaTab, setMediaTab] = React.useState(1);
  const router = useRouter();
  const { userId } = useDetails((state)=> state)

  const admin = userId === details?.creator?.userId;
  const toast = useToast();

  // query
  const community = useQuery(['getCommunity', typeID], () => httpService.get(`${URLS.GET_GROUP_BY_ID}`, {
    params: {
      groupID: typeID,
    }
  }), {
  enabled: typeID !== null || typeID !== undefined,
  onSuccess: (data) => {
    const item: PaginatedResponse<ICommunity> = data.data;
    setDetails(item.content[0]);
  }
  });

  const joinGroup = useMutation({
    mutationFn: () => httpService.post(`${URLS.JOIN_GROUP}`, {
      groupID: typeID,
      joinID: userId
    }),
    onSuccess: (data) => {
      toast({
        title: 'Success',
        description: 'You have joined the group',
        status: 'success',
        duration: 4000,
        position: 'top-right',
      });
      router.push(`/dashboard/community?activeID=${typeID}`)
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: 'An Error occured while you where trying to join the community',
        status: 'error',
        duration: 4000,
        position: 'top-right',
      });
    }
  })

  const mediaposts = useQuery(['getMediaPosts', typeID], () => httpService.get(`${URLS.GET_GROUP_MESSAGES}`, {
    params: {
      groupID: typeID,
    }
  }), {
  enabled: typeID !== null || typeID !== undefined,
  onSuccess: (data) => {
    const item: PaginatedResponse<IMediaContent> = data.data;
    setPosts(uniqBy(item.content, 'id'));
  }
  });

  const communityMembers = useQuery(['getCommunityMembers', typeID], () => httpService.get(`${URLS.GET_GROUP_MEMBERS}`, {
    params: {
      groupID: typeID,
      page: 0,
    }
  }), {
  enabled: typeID !== null || typeID !== undefined,
  onSuccess: (data) => {
    const item: PaginatedResponse<ICommunityMember> = data.data;
    setMembers(prev => uniqBy([...prev, ...item.content], 'id'));
  }
  });

  const admins = () => {
    return members.filter((item) => item.role === 'ADMIN');
  }

  const users = () => {
    return members.filter((item) => item.role === 'USER');
  }

  const media = () => {
    if (posts.length < 1) return [];
    return posts.filter((item) => {
      if(item.type === 'WITH_IMAGE' || item.type === 'WITH_VIDEO_POST') {
        return item;
      }
    })
  }

  const files = () => {
    if (posts.length < 1) return [];
    return posts.filter((item) => {
      if(item.type === 'WITH_FILE') {
        return item;
      }
    })
  }

  if (community.isLoading || communityMembers.isLoading ) {
    return (
      <VStack width='100%' height={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Spinner />
        <CustomText>Loading...</CustomText>
      </VStack>
    )
  }


  return (
    <Box overflowY='auto' width='100%' height='100%' bg='white' paddingTop='40px' paddingBottom={'100px'}>

        <VStack width='100%'>


        <VStack width={['100%', '25%']} height='100%' bg='white' paddingTop='20px' paddingX={['20px', '0px']}>

          {/* HEADER SECTIOONS */}
          <VStack alignItems={'center'} borderWidth={'1px'} borderRadius={'32px'} borderColor={'#D0D4EB'} width='100%' height={'auto'} padding='20px'>
            
            <HStack justifyContent={'space-between'} width='100%'>
              <FiChevronLeft color='black' fontSize='20px' onClick={() => router.back()} />
              <CustomText fontFamily={'DM-Bold'} fontSize={'16px'}>Community Info</CustomText>
              <Box>
                {admin && <FiEdit2 color='black' fontSize='20px' />}
              </Box>
            </HStack>

            <Box width='97px' height={'97px'} borderRadius={'999px 0px 999px 999px'} borderWidth={'3px'} borderColor={'#3C41F0'} overflow={'hidden'}>
                { details?.data?.imgSrc === null && (
                        <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                            <CustomText fontFamily={'DM-Regular'}>{details.data.name[0].toUpperCase()}</CustomText>
                        </VStack>
                    )}
                    {
                        details?.data?.imgSrc && (
                            <Image src={`${IMAGE_URL}${details.data.imgSrc}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
                        )
                    }
            </Box>

            <CustomText fontFamily={'DM-Bold'} fontSize={'18px'} color="brand.chasescrollButtonBlue" textAlign={'center'}>{details?.data?.name}</CustomText>
            <CustomText textAlign={'center'} fontFamily={'DM-Light'} fontSize={'14px'} color={'black'}>{members.length} Members</CustomText>

            <InputGroup>
                    <InputLeftElement>
                      <Image alt='searc' src='/assets/images/search-normal.png' width='20px' height='20px' />
                    </InputLeftElement>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search' />
            </InputGroup>


          </VStack>

          {/* MEMBERS */}
          <Box width='100%' height={'330px'}  position={'relative'} zIndex={'10'}  marginTop={'30px'}  borderWidth={'1px'} borderRadius={'32px'} borderColor={'#D0D4EB'}>

              <HStack justifyContent={'center'} bg='white' width='150px' position='absolute' left='40px' top='-20px' padding='10px'>
                  <CustomText fontFamily={'DM-Light'} color={THEME.COLORS.chasescrollButtonBlue} >Members</CustomText>
                </HStack>  

            <Box paddingY={'30px'} width='100%' height={'100%'}  paddingX='10px' overflowY='scroll'>

              

                {admins().length > 0 && admins().filter((item) => {
                  if (search === '') {
                    return item;
                  } else {
                    if (item.user.firstName.toLowerCase().includes(search.toLowerCase()) || item.user.lastName.toLowerCase().includes(search.toLowerCase()) || item.user.username.toLowerCase().includes(search.toLowerCase())) {
                      return item;
                    }
                  }
                }).map((item, index) => (
                  <MemberCard member={item} key={index.toString()} isAdmin />
                ))}
                {users().length > 0 && users().filter((item) => {
                  if (search === '') {
                    return item;
                  } else {
                    if (item.user.firstName.toLowerCase().includes(search.toLowerCase()) || item.user.lastName.toLowerCase().includes(search.toLowerCase()) || item.user.username.toLowerCase().includes(search.toLowerCase())) {
                      return item;
                    }
                  }
                }).map((item, index) => (
                  <MemberCard member={item} key={index.toString()} isAdmin={false} />
                ))}

              </Box>
          </Box>

          

          </VStack>

        </VStack>

        <VStack width='100%' height="auto" overflowY='auto' marginTop={'30px'}  paddingTop='20px' paddingX={['20px', '0px']}>


              <VStack width={['100%', '25%']} height={'100%'} >

                    {/* header */}
                    <Button width='100%' height='40px' borderRadius='20px' isLoading={joinGroup.isLoading} type='button' variant={'solid'} bg='brand.chasescrollButtonBlue' color='white' onClick={() => joinGroup.mutate()}>Join Community</Button>
     

            </VStack>


        </VStack>

        
    </Box>
  )
}

export default ShareCommunity