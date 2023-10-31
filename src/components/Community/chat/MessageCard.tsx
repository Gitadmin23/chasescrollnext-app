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

interface IProps {
    message: IMediaContent;
}

function MessageCard({ message }: IProps) {
    const [post, setPost] = React.useState(message);
    const [shoowSubmenu, setShowSubmenu] = React.useState(false);

    const queryClient = useQueryClient();
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
  return (
    <HStack onMouseOver={() => setShowSubmenu(true)} onMouseOut={() => setShowSubmenu(false)} alignItems={'center'} alignSelf={post?.user.userId === myId ? 'flex-end':'flex-start'} flexDirection={self ? 'row':'row-reverse'}>
       
       <HStack width='100%' justifyContent={'space-between'} flexDirection={self ? 'row':'row-reverse'}>
            {/* <HStack>
                { likeMutation.isLoading && <Spinner /> }
                { !likeMutation.isLoading && <FiHeart onClick={() => likeMutation.mutate()} cursor='pointer' fontSize='20px' color={post?.likeStatus === 'LIKED' ? 'red':'grey'} />}
                <HStack>
                    <CustomText>{post?.commentCount}</CustomText>
                    <FiMessageSquare fontSize="20px" color='grey'  />
                </HStack>
            </HStack> */}

            { shoowSubmenu && (
                <HStack bg="white" borderRadius={'10px'} padding='5px' spacing={3} shadow={'md'}>
                    { likeMutation.isLoading && <Spinner /> }
                        { !likeMutation.isLoading && <FiHeart onClick={() => likeMutation.mutate()} cursor='pointer' fontSize='20px' color={post?.likeStatus === 'LIKED' ? 'red':'grey'} width={'20px'} height={'20px'} />}
                    <Image src='/assets/images/message.png' alt='message' width={'20px'} height={'20px'} />
                    {/* <Image src='/assets/images/smile.png' alt='smile' width={'20px'} height={'20px'} /> */}
                    {/* <Image src='/asstes/forward.png' alt='forward' /> */}
                </HStack>
            )}

            <VStack spacing={0} alignItems={self? 'flex-end':'flex-start'} flexWrap={'wrap'}  maxW={'300px'} minW={'250px'} borderTopLeftRadius={'20px'} borderTopRightRadius={'20px'} borderBottomLeftRadius={self ? '20px':'0px'} borderBottomRightRadius={self ? '0px':'20px'}  bg={ self ? '':''}>
                {post.mediaRef !== null && (
                    <>
                        { !post.mediaRef.includes('mp4') && (
                            <Image src={`${RESOURCE_BASE_URL}${post?.mediaRef}`} alt='img' width={'100%'} height={'150px'} borderRadius={'20px'} />
                        )}
                    </>
                )}
                <HStack>
                    <CustomText fontFamily={'DM-Medium'} fontSize={'14px'} color='brand.chasescrollButtonBlue'>{post?.user?.username}</CustomText>
                    <CustomText fontFamily={'DM-Medium'} fontSize={'12px'}>{moment(post?.timeInMilliseconds).format('HH:MM')}</CustomText>
                </HStack>
                <Box padding='5px' width='100%'>
                    <CustomText width={'100%'} textOverflow={'clip'} color={'black'} fontFamily={'Satoshi-Regular'} fontSize={'md'}>{post?.text}</CustomText>
                </Box>
                <HStack>
                    <CustomText fontFamily={'DM-Regular'} fontSize='12px'>{post?.commentCount} <CustomText color='brand.chasescrollButtonBlue' display={'inline'}>Reply</CustomText> </CustomText>
                </HStack>
            </VStack>
            
            <Box width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'brand.chasescrollBlue'} overflow={'hidden'}>
                    { post?.user.data.imgMain.value === null && (
                        <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                            <CustomText fontFamily={'DM-Regular'}>{post.user.username[0].toUpperCase()}</CustomText>
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
}

export default MessageCard