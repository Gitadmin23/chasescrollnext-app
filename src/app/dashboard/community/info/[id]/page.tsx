'use client';
import CustomText from '@/components/general/Text'
import { Box, HStack, Spinner, VStack, InputGroup, InputLeftElement, Input, Image, Grid, GridItem, useToast, Modal, ModalOverlay, ModalContent, ModalBody, Button, ModalCloseButton } from '@chakra-ui/react'
import React from 'react'
import { FiBell, FiCamera, FiChevronLeft, FiDownloadCloud, FiEdit2, FiImage, FiLink, FiLogIn, FiSettings, FiTrash2 } from 'react-icons/fi'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
import { useCommunityPageState } from '@/components/Community/chat/state';
import { IoCamera } from 'react-icons/io5';
import AWSHook from '@/hooks/awsHook';
import { MessageIcon, ShareIcon } from '@/components/svg'


function CommunityInfo() {
  const [details, setDetails] = React.useState<ICommunity|null>(null);
  const [members, setMembers] = React.useState<ICommunityMember[]>([]);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [newIttem, setNew] = React.useState<IMediaContent[]>([]);
  const [posts, setPosts] = React.useState<IMediaContent[]>([]);
  const [search, setSearch] = React.useState('');
  const [mediaTab, setMediaTab] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);
  const [img, setImg] = React.useState('');
  const [name, setName] = React.useState('');
  const [pageP, setPage] = React.useState(0);



  const page = useParams();
  const router = useRouter();
  const toast = useToast();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { userId } = useDetails((state)=> state);
  const queryClient = useQueryClient();
  const { uploadedFile, loading, fileUploadHandler } = AWSHook();
  const intObserver = React.useRef<IntersectionObserver>();


  const { setAll } = useCommunityPageState((state) => state);

  const admin = userId === details?.creator?.userId;

  React.useEffect(() => {
    if (!loading && uploadedFile.length > 0) {
      setImg(uploadedFile[0].url);
    }
  }, [uploadedFile, loading])

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
    setPosts(uniqBy(item.content, 'id'));
  }
  });

  const communityMembers = useQuery(['getCommunityMembers', page?.id, pageP], () => httpService.get(`${URLS.GET_GROUP_MEMBERS}`, {
    params: {
      groupID: page?.id,
      page: pageP,
    }
  }), {
  enabled: page?.id !== null,
  onSuccess: (data) => {
    const item: PaginatedResponse<ICommunityMember> = data.data;
    setMembers(prev => uniqBy([...prev, ...item.content], 'id'));
    setHasNextPage(data.data.last ? false:true);
  }
  });

  const lastChildRef = React.useCallback((post: any) => {
    if (communityMembers.isLoading) return;
    if (intObserver.current) intObserver.current.disconnect();
    intObserver.current = new IntersectionObserver((posts) => {
      if (posts[0].isIntersecting && hasNextPage) {
        setPage(prev => prev + 1); 
      }
    });
    if (post) intObserver.current.observe(post);
   }, [communityMembers.isLoading, hasNextPage, setPage]);

  const updateGroup = useMutation({
    mutationFn: (data: any) => httpService.put(`${URLS.UPDATE_GROUP}`, data),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Successfully left the group',
        status: 'success',
        position: 'top-right',
        duration: 5000,
      })
      queryClient.invalidateQueries(['getCommunity']);
    },
    onError: () => {
      toast({
        title: 'Error'
      })
    }
  });

  const leaveGroup = useMutation({
    mutationFn: () => httpService.delete(`${URLS.LEAVE_GROUP}`, {
      params: {
        groupID: details?.id,
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
      router.back();
    },
    onError: () => {
      toast({
        title: 'Error'
      })
    }
  });

  const deleteGroup = useMutation({
    mutationFn: () => httpService.delete(`${URLS.DELETE_GROUP}/${details?.id}`, {
      params: {
        typeID: details?.id,
      }
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
      setAll({ activeCommunity: null, pageNumber: 0, hasNext: false, messages: [] });
      router.back();
    },
    onError: () => {
      toast({
        title: 'Error'
      })
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

  const handleUpdateGroup = async () => {
    const image = img !== '' ? img: details?.data.imgSrc;
    if (name === '') {
      toast({
        title: 'Warning',
        description: 'Name cannot be empty',
        status: 'warning',
        position: 'top-right',
        duration: 5000,
      })
      return;
    } else if (img === '' || details?.data.imgSrc === null) {
      toast({
        title: 'Warning',
        description: 'You must upload an image',
        status: 'warning',
        position: 'top-right',
        duration: 5000,
      })
      return;
    }
    updateGroup.mutate({
      groupData: {
        imgSrc: image,
        name,
      }
    })
  }

  if (community.isLoading ) {
    return (
      <VStack width='100%' height={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Spinner />
        <CustomText>Loading...</CustomText>
      </VStack>
    )
  }


  return (
    <Box overflowY='auto' width='100%' height='100%' bg='white' paddingTop='40px' paddingBottom={'100px'}>

      <input type='file' ref={inputRef} onChange={(e) => fileUploadHandler(e.target.files as FileList)} accept='image/png, image/jpeg, image/jpg, video/mp4' hidden  />

        {/* MODAL */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} isCentered>
          <ModalOverlay />
          <ModalContent width={'320px'} height='400px'>
            <ModalCloseButton />
            <ModalBody>
              <VStack width='100%' height='100%' alignItems={'center'} justifyContent={'center'} marginBottom={'20px'}>

                  <Box width='97px' height={'97px'} position={'relative'} borderRadius={'999px 0px 999px 999px'} borderWidth={'3px'} borderColor={'#3C41F0'} overflow={'hidden'}>
                      { img === '' && (
                        <>
                          { details?.data?.imgSrc === null && (
                            <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                                <CustomText fontFamily={'DM-Regular'}>{details.data.name[0].toUpperCase()}</CustomText>
                            </VStack>
                          )}
                          {
                              details?.data?.imgSrc && (
                                  <>
                                    { details?.data?.imgSrc.startsWith('https://') && <Image src={`${details.data.imgSrc}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }

                                    { !details?.data?.imgSrc.startsWith('https://') && <Image src={`${IMAGE_URL}${details.data.imgSrc}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                                  </>
                              )
                          }
                        </>
                      )}
                      { img !== '' && (
                        <Image src={`${img}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
                      )}
                      <VStack onClick={() => inputRef.current?.click()} width='100%' height={'100%'} position={'absolute'} bg='#0000003b' bottom='0px' left='0px' justifyContent={'center'} alignItems={'center'}>
                        { !loading && <IoCamera size='25px' color='white' /> }
                        { loading && <Spinner /> }
                      </VStack>
                </Box>

                <Input value={name} onChange={(e) => setName(e.target.value)}  />

                <Button width='100%' height='30px' variant={'solid'} isLoading={updateGroup.isLoading} onClick={handleUpdateGroup} >Save</Button>

              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>

        <VStack width='100%'>


        <VStack width={['100%', '35%']} height='100%' bg='white' paddingTop='20px' paddingX={['20px', '0px']}>

          {/* HEADER SECTIOONS */}
          <VStack alignItems={'center'} borderWidth={'1px'} borderRadius={'32px'} borderColor={'#D0D4EB'} width='100%' height={'auto'} padding='20px'>
            
            <HStack justifyContent={'space-between'} width='100%'>
              <FiChevronLeft color='black' fontSize='20px' onClick={() => router.back()} />
              <CustomText fontFamily={'DM-Bold'} fontSize={'16px'}>Community Info</CustomText>
              <Box>
                {admin && <FiEdit2 color='black' fontSize='20px' onClick={() => {
                  setName(details?.data.name);
                  setShowModal(true);
                }} />}
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
                            <>
                              { details?.data?.imgSrc.startsWith('https://') && <Image src={`${details.data.imgSrc}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }

                              { !details?.data?.imgSrc.startsWith('https://') && <Image src={`${IMAGE_URL}${details.data.imgSrc}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                            </>
                        )
                    }
            </Box>

            <CustomText fontFamily={'DM-Bold'} fontSize={'18px'} color="brand.chasescrollButtonBlue" textAlign={'center'}>{details?.data?.name}</CustomText>
            <CustomText textAlign={'center'} fontFamily={'DM-Light'} fontSize={'14px'} color={'black'}>{details?.data.memberCount} Members</CustomText>

            <InputGroup>
                    <InputLeftElement>
                      <Image alt='searc' src='/assets/images/search-normal.png' width='20px' height='20px' />
                    </InputLeftElement>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search' />
            </InputGroup>

          <HStack>
            { !admin && <SettingsChip  icon={<FiLogIn color={THEME.COLORS.chasescrollButtonBlue} />} text='Exit' action={() => leaveGroup.mutate()} isLoading={leaveGroup.isLoading} /> }
            { admin && <SettingsChip icon={<FiTrash2 color={THEME.COLORS.chasescrollButtonBlue} />} text='Delete' action={() =>deleteGroup.mutate()} isLoading={deleteGroup.isLoading} /> }
            <SettingsChip icon={<ShareEvent showText={false} type='COMMUNITY' id={page?.id} />} text='Share' action={() => {}} />
            <SettingsChip icon={<FiSettings color={THEME.COLORS.chasescrollButtonBlue} />} text='Settings' action={() => {}} />
          </HStack>

          </VStack>

          <VStack width='100%' height="auto" overflowY='auto' marginTop={'30px'}  paddingTop='20px' paddingX={['20px', '0px']}>


              <VStack width={['100%', '100%']} height={'100%'} >

                    {/* header */}
                    <HStack overflow={'hidden'} width='100%' height='40px' bg='#F1F2F9' borderRadius={'25px'}>
                      <VStack onClick={() => setMediaTab(1)} color={mediaTab === 1 ? 'white':'black'} height='100%' justifyContent={'center'} bg={mediaTab === 1 ? THEME.COLORS.chasescrollButtonBlue:'transparent'} flex='1'>
                        <CustomText>Media</CustomText>
                      </VStack>

                      <VStack onClick={() => setMediaTab(2)} color={mediaTab === 2 ? 'white':'black'} height='100%' justifyContent={'center'} bg={mediaTab === 2 ? THEME.COLORS.chasescrollButtonBlue:'transparent'} flex='1'>
                        <CustomText>Files</CustomText>
                      </VStack>
                    </HStack>

                  <Box width='100%' overflowY={'auto'} maxHeight={'350px'}>

                  {media().length > 0 && mediaTab === 1 && (
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

                  {files().length > 0 && mediaTab === 2 && (
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

          {/* MEMBERS */}
          <Box width='100%' height={'330px'}  position={'relative'} zIndex={'10'}  marginTop={'30px'}  borderWidth={'1px'} borderRadius={'32px'} borderColor={'#D0D4EB'}>

              <HStack justifyContent={'center'} bg='white' width='150px' position='absolute' left='40px' top='-20px' padding='10px'>
                  <CustomText fontFamily={'DM-Light'} color={THEME.COLORS.chasescrollButtonBlue} >Members</CustomText>
                </HStack>  


            <Box overflowY='hidden' width='100%' height={'100%'} paddingBottom='20px' borderRadius={'32px'}>

            <Box marginTop={'20px'} width='100%' height={'100%'}  paddingX='10px' overflowY='scroll' >

                                  

                    {admins().length > 0 && admins().filter((item) => {
                      if (search === '') {
                        return item;
                      } else {
                        if (item.user.firstName.toLowerCase().includes(search.toLowerCase()) || item.user.lastName.toLowerCase().includes(search.toLowerCase()) || item.user.username.toLowerCase().includes(search.toLowerCase())) {
                          return item;
                        }
                      }
                    })
                    .sort((a, b) => {
                      if (a.user.firstName.toLowerCase() < b.user.firstName.toLowerCase()) {
                        return -1;
                      }
                      if (a.user.firstName.toLowerCase() > b.user.firstName.toLowerCase()) {
                        return 1;
                      }
                      return 0;

                    })
                    .map((item, index) => (
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
                    })
                    .sort((a, b) => {
                      if (a.user.firstName.toLowerCase() < b.user.firstName.toLowerCase()) {
                        return -1;
                      }
                      if (a.user.firstName.toLowerCase() > b.user.firstName.toLowerCase()) {
                        return 1;
                      }
                      return 0;

                    })
                    .map((item, index) => (
                      <>
                        { index === users().length - 1 ? <MemberCard ref={lastChildRef} member={item} key={index.toString()} isAdmin={false} /> : <MemberCard member={item} key={index.toString()} isAdmin={false} /> }
                      </>
                    ))}


                    { communityMembers.isLoading && <HStack width='100%' height='20px' justifyContent={'center'} alignItems={'center'}>
                      <Spinner />
                    </HStack>}

                    </Box>


            </Box>
          </Box>

          

          </VStack>

        </VStack>

        

        
    </Box>
  )
}

export default CommunityInfo