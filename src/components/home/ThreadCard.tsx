/* eslint-disable react/display-name */
import { IMediaContent, IMediaPost } from '@/models/MediaPost';
import { Avatar, HStack, VStack, Box, Spinner, Menu, MenuList, MenuButton, MenuItem } from '@chakra-ui/react';
import { FiMoreHorizontal, FiHeart, FiMessageSquare, FiShare2 } from 'react-icons/fi'
import React from 'react'
import CustomText from '../general/Text';
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import httpService from '@/utils/httpService';
import { RESOURCE_BASE_URL, URLS } from '@/services/urls';
import moment from 'moment';
import Link from 'next/link';
import { useDetails } from '@/global-state/useUserDetails';
import ReportUserModal from '../modals/Home/ReportModal';

interface IProps {
    post?: IMediaContent;
}

const ThreadCard = React.forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const [showReportModal, setShowReportModal] = React.useState(false);
  const queryClient = useQueryClient();
  const { userId } = useDetails((state) => state)
  const [post, setPost] = React.useState<IMediaContent>(props.post as IMediaContent);

  const { isLoading, isError } = useQuery([`getPostById-${post?.id}`, post?.id], () => httpService.get(`${URLS.GET_POST_BY_ID}/${post?.id}`), 
  {
    onSuccess: (data) => {
      setPost(data?.data);
    }
  });

  // MUTATIONS
  const likeMutation = useMutation({
    mutationFn: () => httpService.post(`${URLS.LIKE_POST}/${post?.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries([`getPostById-${post?.id}`])
    },
    onError: () =>{}
  });
    
    return (
      <VStack alignItems={'flex-start'} ref={ref} marginTop={'40px'} width={'100%'} height={'auto'} bg='white' borderBottomLeftRadius={'20px'} borderBottomRightRadius={'20px'} borderTopLeftRadius={'20px'} borderWidth='1px' borderColor={'lightgrey'} color='black' padding='20px'>

        {/* MODALS SECTION */}
        <ReportUserModal typeID={post?.id} REPORT_TYPE='REPORT_USER' isOpen={showReportModal} onClose={() => setShowReportModal(false)} />
           
           {/* HEADER SECTION */}
           <HStack width='100%' height='100px' justifyContent={'space-between'} alignItems={'center'}>
              <HStack>
                <Avatar name="daniel Emmanuel" size='md' />

                <VStack spacing={0} alignItems={'flex-start'}>
                  <CustomText fontSize='lg' fontFamily={'DM-Medium'}>{post?.user?.username}</CustomText>
                  {/* <CustomText fontSize='md' fontFamily={'DM-Regular'}>o2 Areana London</CustomText> */}
                  <CustomText fontSize='xs' fontFamily={'Satoshi-Light'} color='grey'>{moment(post?.timeInMilliseconds).fromNow()}</CustomText>
                </VStack>
              </HStack>
              <Menu>
                <MenuButton>
                  <FiMoreHorizontal color="blue" fontSize={25} />
                </MenuButton>
                <MenuList>
                  { userId === post?.user?.userId && (
                    <MenuItem color={'red'} width={'100%'} borderBottomWidth={1} borderBottomColor={'lightgrey'}>
                      <CustomText fontFamily={'Satoshi-Light'} fontSize={'sm'} textAlign={'center'} width={'100%'}>Delete</CustomText>
                    </MenuItem>
                  )}
                  {/* <MenuItem color={'grey'} width={'100%'} borderBottomWidth={1} borderBottomColor={'lightgrey'}>
                    <CustomText fontFamily={'Satoshi-Light'} fontSize={'sm'} textAlign={'center'} width={'100%'}>Share Post</CustomText>
                  </MenuItem> */}
                  {/* <MenuItem color={'red'} width={'100%'} borderBottomWidth={1} borderBottomColor={'lightgrey'}>
                    <CustomText fontFamily={'Satoshi-Light'} fontSize={'sm'} textAlign={'center'} width={'100%'}>Report Post</CustomText>
                  </MenuItem> */}
                  <MenuItem onClick={() => setShowReportModal(true)} color={'red'} width={'100%'} borderBottomWidth={1} borderBottomColor={'lightgrey'}>
                    <CustomText fontFamily={'Satoshi-Light'} fontSize={'sm'} textAlign={'center'} width={'100%'}>Report User</CustomText>
                  </MenuItem>
                  <MenuItem color={'red'} width={'100%'} >
                    <CustomText fontFamily={'Satoshi-Light'} fontSize={'sm'} textAlign={'center'} width={'100%'}>Cancel</CustomText>
                  </MenuItem>
                </MenuList>
              </Menu>
           </HStack>

           {/* BODY SECTION */}
           <CustomText fontFamily={'Satoshi-Regular'} fontSize='md' color='brand.chasescrollButtonBlue'>
            {post?.text}
           </CustomText>

           { post?.type === 'WITH_IMAGE' || post?.type === 'MULTIPLE_PICTURE' && (
            <Box width='100%' height={'200px'} bg='whitesmoke' borderBottomLeftRadius={'20px'} borderBottomRightRadius={'20px'} borderTopLeftRadius={'20px'}>
              <Image src={`${RESOURCE_BASE_URL}/${post?.mediaRef}`} alt='image'style={{ width: '100%', height: '100%' }}  />
            </Box>
           )}

           {/* FOOTER SECTION */}
           <HStack justifyContent={'space-between'} alignItems={'center'} width='100%' height={'50px'} bg='white'>
              <VStack onClick={() => likeMutation.mutate()} cursor={'pointer'}>
                {!likeMutation.isLoading && (
                  <>
                    <FiHeart color={post?.likeStatus === 'LIKED' ? 'red':'grey'} fontSize={15} />
                    <CustomText fontFamily={'Satoshi-Light'} fontSize='xs' color={post?.likeStatus === 'LIKED' ? 'red':'grey'}>{post?.likeCount} Likes</CustomText>
                  </>
                )}
                {
                  likeMutation.isLoading && (
                    <Spinner size='xs' colorScheme='blue' />
                  )
                }
              </VStack>

              <Link href={`/dashboard/home/comment/${post?.id}`}>
                <VStack>
                  <FiMessageSquare color='black' fontSize={15} />
                  <CustomText fontFamily={'Satoshi-Light'} fontSize='xs' color='grey'>{post?.commentCount} Comments</CustomText>
                </VStack>
              </Link>

              <VStack>
                <FiShare2 color='black' fontSize={15} />
                <CustomText fontFamily={'Satoshi-Light'} fontSize='xs' color='grey'>Share</CustomText>
              </VStack>
           </HStack>
      </VStack>
    );
  });
export default ThreadCard