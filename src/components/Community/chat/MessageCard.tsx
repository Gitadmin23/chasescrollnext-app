/* eslint-disable react/display-name */
import CustomText from '@/components/general/Text';
import { useDetails } from '@/global-state/useUserDetails';
import { IMediaContent } from '@/models/MediaPost'
import { RESOURCE_BASE_URL, URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Avatar, HStack, VStack, Image, Box, Spinner } from '@chakra-ui/react';
import React from 'react'
import { FiHeart, FiMessageSquare } from 'react-icons/fi'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import moment from 'moment';
import { IoMdCloudDownload } from 'react-icons/io';
import { THEME } from '@/theme';
import { IoHeart } from 'react-icons/io5';
import { useCommunityPageState } from '@/components/Community/chat/state';
import LinkExtractor, { handleLinks } from '@/components/general/LinkExtractor';
import { useImageModalState } from '@/components/general/ImageModal/imageModalState';

interface IProps {
    message: IMediaContent;
    id: string|undefined;
}

const MessageCard = React.forwardRef<HTMLDivElement, IProps>(({ message, id = undefined }, ref) => {
    const [post, setPost] = React.useState(message);
    const [shoowSubmenu, setShowSubmenu] = React.useState(false);

    const queryClient = useQueryClient();
    const { setAll } = useCommunityPageState((state) => state)
    const { setAll: setImageModal } = useImageModalState((state) => state)
    // query
    const { isLoading } = useQuery([`getSinglePost-${post.id}`, message?.id], () => httpService.get(`${URLS.GET_POST_BY_ID}/${message.id}`), {
        onSuccess: (data) => {
            setPost(data.data);
        },
        onError: (error: any) => {
            alert('An errror occured');
        }
    });

    // mutations

  // MUTATIONS
  const likeMutation = useMutation({
    mutationFn: () => httpService.post(`${URLS.LIKE_POST}/${post?.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries([`getSinglePost-${message?.id}`])
    },
    onError: () =>{
        alert('An error occurred');
    }
  });
    const { userId: myId } = useDetails((state) => state)
    const self = message?.user?.userId === myId;

    if (isLoading ) {
        return (
            <CustomText>Loading...</CustomText>
        )
    }

    const downloadFile = (url: string) => {
        const name = url.split('amazonaws.com/')[1]
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = name;
        anchor.click();
      };

      const FileExtentions = (url: string) => {
        const __format__ = url.split('.');
        const format = __format__[__format__.length - 1];
        return format.toUpperCase();
      }

      const handleImageClick = () => {
        setImageModal({ images: [post.mediaRef, post.mediaRef, post.mediaRef, ...post.multipleMediaRef], isOpen: true })
      }
    
  return (
    <HStack id={id} ref={ref} justifyContent={'flex-start'} onMouseOver={() => setShowSubmenu(true)} onMouseOut={() => setShowSubmenu(false)} alignItems={'flex-start'} alignSelf={post?.user.userId === myId ? 'flex-end':'flex-start'} flexDirection={self ? 'row':'row-reverse'}  borderRadius='20px'>
       
       <HStack  position={'relative'}  width='100%' justifyContent={'space-between'} alignItems={'flex-start'} flexDirection={self ? 'row':'row-reverse'}>
            {/* <HStack>
                { likeMutation.isLoading && <Spinner /> }
                { !likeMutation.isLoading && <FiHeart onClick={() => likeMutation.mutate()} cursor='pointer' fontSize='20px' color={post?.likeStatus === 'LIKED' ? 'red':'grey'} />}
                <HStack>
                    <CustomText>{post?.commentCount}</CustomText>
                    <FiMessageSquare fontSize="20px" color='grey'  />
                </HStack>
            </HStack> */}

            { shoowSubmenu && (
                <HStack bg="white" borderRadius={'10px'} padding='5px' spacing={3} shadow={'md'} >
                    { likeMutation.isLoading && <Spinner /> }
                        { !likeMutation.isLoading && <IoHeart onClick={() => likeMutation.mutate()} cursor='pointer' fontSize='20px' color={post?.likeStatus === 'LIKED' ? 'red':'grey'} width={'20px'} height={'20px'} />}
                    <Image src='/assets/images/message.png' alt='message' width={'20px'} height={'20px'} onClick={() => setAll({ activeMessageId: post.id, commentHasNext: false, commentPage: 0, comments: [], drawerOpen: true })} />
                    {/* <Image src='/assets/images/smile.png' alt='smile' width={'20px'} height={'20px'} /> */}
                    {/* <Image src='/asstes/forward.png' alt='forward' /> */}
                </HStack>
            )}

            <VStack borderRadius='10px 20px 20px 0px' bg={shoowSubmenu ? 'lightgrey':'transparent'} padding='5px' spacing={0} alignItems={self? 'flex-end':'flex-start'} flexWrap={'wrap'}  maxW={'300px'} minW={'250px'} borderTopLeftRadius={'20px'} borderTopRightRadius={'20px'} borderBottomLeftRadius={self ? '20px':'0px'} borderBottomRightRadius={self ? '0px':'20px'} >
                <HStack>
                    <CustomText fontFamily={'DM-Medium'} fontSize={'14px'} color='brand.chasescrollButtonBlue'>{post?.user?.username[0].toUpperCase()}{post?.user?.username.substring(1, post?.user?.username.length)}</CustomText>
                    <CustomText fontFamily={'DM-Medium'} fontSize={'12px'}>{moment(post?.timeInMilliseconds).format('HH:MM')}</CustomText>
                </HStack>
                {post.mediaRef !== null && (
                    <>
                        { post.type === 'WITH_IMAGE' && (
                            <Image onClick={handleImageClick} src={`${post?.mediaRef}`} alt='img' width={'100%'} height={'150px'} objectFit={'cover'} borderRadius={'20px'} />
                        )}
                        {
                            post.type === 'WITH_VIDEO_POST' && (
                                <video controls width={'100%'} height={'150px'} style={{ borderRadius: '20px' }}>
                                    <source src={post.mediaRef}  />
                                </video>
                            )
                        }
                        {
                            post.type === 'WITH_FILE' && (
                                <HStack width='100%' height={'100px'} >
                                    <Box flex='0.2' onClick={() => downloadFile(post.mediaRef)}>
                                        <IoMdCloudDownload color={THEME.COLORS.chasescrollButtonBlue} fontSize='40px' />
                                    </Box>
                                    <Box width='100%'>
                                        <CustomText width='80%' color="brand.chasescrollButtonBlue" fontFamily={'DM-Bold'} fontSize={'16px'}>{FileExtentions(post.mediaRef)}</CustomText>
                                    </Box>
                                </HStack>
                            )
                        }
                    </>
                )}
                <Box padding='5px' width='100%'>
                    {/* <LinkExtractor text={post?.text} /> */}
                    {handleLinks(post?.text)}
                    {/* <CustomText width={'100%'} textOverflow={'clip'} color={'black'} fontFamily={'Satoshi-Regular'} fontSize={'md'}>{post?.text}</CustomText> */}
                </Box>
                <HStack>
                    <CustomText cursor='pointer' fontFamily={'DM-Regular'} fontSize='12px'>{post?.commentCount} <CustomText color='brand.chasescrollButtonBlue' display={'inline'} onClick={() => setAll({ activeMessageId: post.id, commentHasNext: false, commentPage: 0, comments: [], drawerOpen: true })}>Reply</CustomText> </CustomText>

                    <CustomText cursor='pointer' fontFamily={'DM-Regular'} fontSize='12px'>{post?.likeCount} <CustomText color='brand.chasescrollButtonBlue' display={'inline'}>Likes</CustomText> </CustomText>
                </HStack>
            </VStack>

            <Box width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                    { post?.user.data.imgMain.value === null && (
                        <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                            <CustomText fontSize={'10px'} fontFamily={'DM-Regular'}>{post.user.username[0].toUpperCase()}</CustomText>
                        </VStack>
                    )}
                    {
                        post?.user.data.imgMain.value && (
                            <Image src={`${RESOURCE_BASE_URL}${post?.user.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
                        )
                    }
                </Box>
            
            
       </HStack>

      

       
        
    </HStack>
  )
});

export default MessageCard