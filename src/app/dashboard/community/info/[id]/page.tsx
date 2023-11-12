'use client';
import CustomText from '@/components/general/Text'
import { Box, HStack, Spinner, VStack, InputGroup, InputLeftElement, Input, Image, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import { FiBell, FiChevronLeft, FiDownloadCloud, FiEdit2, FiLink, FiLogIn, FiSettings } from 'react-icons/fi'
import { useParams, useRouter } from 'next/navigation'
import { useQuery } from 'react-query';
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


function CommunityInfo() {
  const [details, setDetails] = React.useState<ICommunity|null>(null);
  const [members, setMembers] = React.useState<ICommunityMember[]>([]);
  const [posts, setPosts] = React.useState<IMediaContent[]>([])
  const [search, setSearch] = React.useState('');
  const [mediaTab, setMediaTab] = React.useState(1);
  const page = useParams();
  const router = useRouter();
  const { userId } = useDetails((state)=> state)

  const admin = userId === details?.creator?.userId;

  // query
  const community = useQuery(['getCommunity', page?.id], () => httpService.get(`${URLS.GET_GROUP_BY_ID}`, {
    params: {
      groupID: page?.id,
    }
  }), {
  enabled: page?.id !== null,
  onSuccess: (data) => {
    const item: PaginatedResponse<ICommunity> = data.data;
    setDetails(item.content[0]);
  }
  });

  const mediaposts = useQuery(['getMediaPosts', page?.id], () => httpService.get(`${URLS.GET_GROUP_MESSAGES}`, {
    params: {
      groupID: page?.id,
    }
  }), {
  enabled: page?.id !== null,
  onSuccess: (data) => {
    const item: PaginatedResponse<IMediaContent> = data.data;
    console.log(item);
    setPosts(uniqBy(item.content, 'id'));
  }
  });

  const communityMembers = useQuery(['getCommunityMembers', page?.id], () => httpService.get(`${URLS.GET_GROUP_MEMBERS}`, {
    params: {
      groupID: page?.id,
      page: 0,
    }
  }), {
  enabled: page?.id !== null,
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


        <VStack width={['100%', '35%']} height='100%' bg='white' paddingTop='20px' paddingX={['20px', '0px']}>

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

          <HStack>
            <SettingsChip icon={<FiLogIn color={THEME.COLORS.chasescrollButtonBlue} />} text='Exit' action={() => {}} />
            <SettingsChip icon={<FiSettings color={THEME.COLORS.chasescrollButtonBlue} />} text='Settings' action={() => {}} />
          </HStack>

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


              <VStack width={['100%', '35%']} height={'100%'} >

                    {/* header */}
                    <HStack overflow={'hidden'} width='100%' height='50px' bg='#F1F2F9' borderRadius={'25px'}>
                      <VStack onClick={() => setMediaTab(1)} color={mediaTab === 1 ? 'white':'black'} height='100%' justifyContent={'center'} bg={mediaTab === 1 ? THEME.COLORS.chasescrollButtonBlue:'transparent'} flex='1'>
                        <CustomText>Media</CustomText>
                      </VStack>

                      <VStack onClick={() => setMediaTab(2)} color={mediaTab === 2 ? 'white':'black'} height='100%' justifyContent={'center'} bg={mediaTab === 2 ? THEME.COLORS.chasescrollButtonBlue:'transparent'} flex='1'>
                        <CustomText>Files</CustomText>
                      </VStack>
                    </HStack>

                  <Box width='100%' overflowY={'auto'} height={'350px'}>

                  {mediaTab === 1 && (
                      <Grid width='100$' flex='1' templateColumns='repeat(3, 1fr)' gap={2}>
                        {media().length > 0 && media().map((item, index) => {
                          if (item.mediaRef !== null && item.mediaRef.length > 6) {
                            const __format__ = item.mediaRef?.split('.');
                          const format = __format__[__format__?.length -1];
                          if (FILE_FORMATS.IMAGE_FORM.includes(format)) {
                            return <GridItem  borderRadius={'5px'} overflow='hidden' width='100%' marginBottom='20px' height={'120px'} key={index.toString()}>
                              { item.mediaRef.startsWith('https://') && <Image src={item.mediaRef} alt='image'  /> }
                              { !item.mediaRef.startsWith('https://') && <Image src={`${IMAGE_URL}${item.mediaRef}`} alt='image'  /> }
                            </GridItem>
                          }

                          if (FILE_FORMATS.VIDEO_FORM.includes(format)) {
                            return <GridItem  borderRadius={'5px'} maxH={'150px'} overflow='hidden' width='100%' height={'125px'}  key={index.toString()}>
                            <video controls style={{ width: '100%', height: '100%', maxHeight: '150px' }}>
                              <source type='video/mp4' src={item.mediaRef} />
                            </video>
                          </GridItem>
                          }
                          }
                        })}
                      </Grid>
                    )}

                  {mediaTab === 2 && (
                      <Grid width='100$' flex='1' templateColumns='repeat(3, 1fr)' gap={2}>
                        {files().map((item, index) => {
                          console.log(item.mediaRef);
                          if (item?.mediaRef !== null && item?.mediaRef.length > 6) {
                            const __format__ = item.mediaRef.split('.');
                          const format = __format__[__format__.length -1];
                            return (
                              <GridItem bg='whitesmoke'  borderRadius={'5px'} overflow='hidden' width='100%' marginBottom='20px' height={'120px'} key={index.toString()}>
                              <VStack justifyContent={'center'} width={'100%'} height='100%'>
                                <FiDownloadCloud fontSize='25px' />
                                <CustomText fontFamily={'DM-Bold'} fontSize={'30px'}>{format.toUpperCase()}</CustomText>
                              </VStack>
                            </GridItem>
                            )
                          }
                        })}
                      </Grid>
                    )}


                  </Box>


            </VStack>


        </VStack>

        
    </Box>
  )
}

export default CommunityInfo