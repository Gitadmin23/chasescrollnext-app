/* eslint-disable react/display-name */
import { IMediaContent, IMediaPost } from '@/models/MediaPost';
import { Avatar, HStack, VStack, Box, Spinner, Menu, MenuList, MenuButton, MenuItem, Image } from '@chakra-ui/react';
import { FiMoreHorizontal, FiHeart, FiMessageSquare, FiShare2 } from 'react-icons/fi'
import React from 'react'
import CustomText from '../general/Text';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import httpService from '@/utils/httpService';
import { IMAGE_URL, RESOURCE_BASE_URL, URLS } from '@/services/urls';
import moment from 'moment';
import Link from 'next/link';
import { useDetails } from '@/global-state/useUserDetails';
import ReportUserModal from '../modals/Home/ReportModal';
import LikeUserModal from '../modals/Home/LikeUsers';

import { Heart, MessageAdd, Share, DocumentDownload } from 'iconsax-react';
import VideoPlayer from '../general/VideoPlayer';

interface IProps {
  post?: IMediaContent;
  id?: string
}

const ThreadCard = React.forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const [showReportModal, setShowReportModal] = React.useState(false);
  const [showlikes, setShowLikes] = React.useState(false);
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
    onError: () => { }
  });

  return (
    <VStack id={props.id} alignItems={'flex-start'} ref={ref} marginTop={'40px'} width={'100%'} height={'auto'} bg='white' borderBottomLeftRadius={'20px'} borderBottomRightRadius={'20px'} borderTopLeftRadius={'20px'} borderWidth='0px' shadow='md'  boxShadow={'lg'} borderColor={'lightgrey'} color='black' padding='20px'>

      {/* MODALS SECTION */}
      <ReportUserModal typeID={post?.id} REPORT_TYPE='REPORT_USER' isOpen={showReportModal} onClose={() => setShowReportModal(false)} />
      <LikeUserModal typeID={post?.id} isOpen={showlikes} onClose={() => setShowLikes(false)} />

      {/* HEADER SECTION */}
      <HStack width='100%' height='100px' justifyContent={'space-between'} alignItems={'center'}>
        <HStack>

          <Link href={`/dashboard/profile/${post.user.userId}`}>
          <Box width='42px' height='42px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
            {post?.user?.data.imgMain.value === null && (
              <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                <CustomText fontFamily={'DM-Regular'}>{post?.user?.username[0].toUpperCase()}</CustomText>
              </VStack>
            )}
            {
              post?.user?.data.imgMain.value && (
                <Image src={`${IMAGE_URL}${post?.user?.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
              )
            }
          </Box>
          </Link>

          <VStack spacing={0} alignItems={'flex-start'}>
            <Link  href={`/dashboard/profile/${post.user.userId}`}>
              <CustomText fontSize='lg' fontFamily={'DM-Medium'}>{post?.user?.username}</CustomText>
            </Link>
            {/* <CustomText fontSize='md' fontFamily={'DM-Regular'}>o2 Areana London</CustomText> */}
            <CustomText fontSize='xs' fontFamily={'Satoshi-Light'} color='grey'>{moment(post?.timeInMilliseconds).fromNow()}</CustomText>
          </VStack>
        </HStack>
        <Menu>
          <MenuButton>
            <FiMoreHorizontal color="blue" fontSize={25} />
          </MenuButton>
          <MenuList>
            {userId === post?.user?.userId && (
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

      {post?.type === 'WITH_IMAGE' || post?.type === 'MULTIPLE_PICTURE' && (
        <Box width='100%' height={'200px'} bg='whitesmoke' borderBottomLeftRadius={'20px'} borderBottomRightRadius={'20px'} borderTopLeftRadius={'20px'}>
         { post.mediaRef.startsWith('https://') &&  <Image src={`${post?.mediaRef}`} alt='image' style={{ width: '100%', height: '100%' }} />}
         { !post.mediaRef.startsWith('https://') &&  <Image src={`${IMAGE_URL}${post?.mediaRef}`} alt='image' style={{ width: '100%', height: '100%' }} />}
        </Box>
      )}

      {post?.type === 'WITH_VIDEO_POST' && (
        <Box width='100%' maxHeight={'250px'} bg='whitesmoke' borderBottomLeftRadius={'20px'} borderBottomRightRadius={'20px'} borderTopLeftRadius={'20px'} overflow={'hidden'}>
          { post.mediaRef.startsWith('https://') && <VideoPlayer src={`${post.mediaRef}`} measureType='px' /> }
          { !post.mediaRef.startsWith('https://') && <VideoPlayer src={`${IMAGE_URL}${post.mediaRef}`} measureType='px' />}
          <VideoPlayer src={`${IMAGE_URL}${post.mediaRef}`} measureType='px' />
          {/* <video controls width={'100%'} style={{ maxHeight: '250px'}}>
            <source  type='video/mp4' src={`${IMAGE_URL}${post.mediaRef}`} />
          </video> */}
        </Box>
      )}

      {/* FOOTER SECTION */}
      <HStack justifyContent={'space-between'} alignItems={'center'} width='100%' height={'50px'} bg='white'>
        <VStack  cursor={'pointer'}>
          {!likeMutation.isLoading && (
            <>
              <Heart onClick={() => likeMutation.mutate()} color={post?.likeStatus === 'LIKED' ? 'red' : 'grey'} size={'25px'} variant={post?.likeStatus === 'LIKED' ? 'Bold': 'Outline'} />
              {/* <FiHeart onClick={() => likeMutation.mutate()} color={post?.likeStatus === 'LIKED' ? 'red' : 'grey'} fontSize={15} /> */}
              <CustomText onClick={() => setShowLikes(true)} fontFamily={'Satoshi-Light'} fontSize='xs' color={post?.likeStatus === 'LIKED' ? 'red' : 'grey'}>{post?.likeCount} Likes</CustomText>
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
            <MessageAdd color='grey' size={'25px'} variant='Outline' />
            {/* <FiMessageSquare color='black' fontSize={15} /> */}
            <CustomText fontFamily={'Satoshi-Light'} fontSize='xs' color='grey'>{post?.commentCount} Comments</CustomText>
          </VStack>
        </Link>

        <VStack>
          <Share color='grey' size={'25px'} variant='Bold' />
          {/* <FiShare2 color='black' fontSize={15} /> */}
          <CustomText fontFamily={'Satoshi-Light'} fontSize='xs' color='grey'>Share</CustomText>
        </VStack>
      </HStack>
    </VStack>
  );
});
export default ThreadCard