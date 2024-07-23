/* eslint-disable react/display-name */
import CustomText from '@/components/general/Text';
import { useDetails } from '@/global-state/useUserDetails';
import { IMediaContent } from '@/models/MediaPost'
import { IMAGE_URL, RESOURCE_BASE_URL, URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Avatar, HStack, VStack, Image, Box, Spinner, Text, useColorMode, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import React from 'react'
import { FiHeart, FiMessageSquare, FiTrash2, FiX } from 'react-icons/fi'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import moment from 'moment';
import { IoMdCloudDownload } from 'react-icons/io';
import { THEME } from '@/theme';
import { IoHeart } from 'react-icons/io5';
import { useCommunityPageState } from '@/components/Community/chat/state';
import LinkExtractor, { handleLinks } from '@/components/general/LinkExtractor';
import { useImageModalState } from '@/components/general/ImageModal/imageModalState';
import { formatTimeAgo } from '@/utils/helpers';
import useCustomTheme from '@/hooks/useTheme';
import { textLimit } from '@/utils/textlimit';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import EmojiPicker from 'emoji-picker-react';
import CommentCard from './CommentCard';
import { useCommunity } from '..';

interface IProps {
    message: IMediaContent;
    id: string | undefined;
    index?: number;
}

const MessageCard = React.forwardRef<HTMLDivElement, IProps>(({ message, id = undefined, index }, ref) => {
    const [post, setPost] = React.useState(message);
    const [shoowSubmenu, setShowSubmenu] = React.useState(false);
    const [showMore, setShowMore] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    const queryClient = useQueryClient();
    const { setAll, activeCommunity, removeMessage, comments } = useCommunityPageState((state) => state);
    const { setAll: setImageModal } = useImageModalState((state) => state);

    const { getComments, setComment, comment, commentlastChildRef, showEmoji, setShowEmoi, createComment, handleCreateComment, commentData, setpostID } = useCommunity()

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode } = useColorMode();

    // query
    const { isLoading } = useQuery([`getSinglePost-${post.id}`, message?.id], () => httpService.get(`${URLS.GET_POST_BY_ID}/${message.id}`), {
        onSuccess: (data) => {
            setPost(data.data);
        },
        onError: (error: any) => {
            alert('An errror occured');
        }
    }); 

    // MUTATIONS
    const likeMutation = useMutation({
        mutationFn: () => httpService.post(`${URLS.LIKE_POST}/${post?.id}`),
        onSuccess: () => {
            queryClient.invalidateQueries([`getSinglePost-${message?.id}`]);
        },
        onError: () => {
            alert('An error occurred');
        }
    });

    const deleeteMutation = useMutation({
        mutationFn: () => httpService.delete(`${URLS.DELETE_POST}/${post?.id}`),
        onSuccess: () => {
            queryClient.invalidateQueries([`getMessage-${activeCommunity?.id}`]);
            removeMessage(index as number);
        },
        onError: () => {
            alert('An error occurred');
        }
    });
    const { userId: myId } = useDetails((state) => state)
    const self = message?.user?.userId === myId;

    if (isLoading) {
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

    const clickHandler = () => {
        setpostID(post?.id)
        setOpen(true)
    }


    return (
        <HStack id={id} bg={mainBackgroundColor} ref={ref} justifyContent={'flex-start'} onMouseOver={() => setShowSubmenu(true)} onMouseOut={() => setShowSubmenu(false)} alignItems={'flex-start'} alignSelf={post?.user.userId === myId ? 'flex-end' : 'flex-start'} flexDirection={self ? 'row' : 'row-reverse'} borderRadius='20px'>

            <HStack position={'relative'} width='fit-content' justifyContent={'space-between'} alignItems={'flex-start'} flexDirection={self ? 'row' : 'row-reverse'}>

                {shoowSubmenu && (
                    <HStack bg="white" borderRadius={'10px'} padding='5px' spacing={3} shadow={'md'} >
                        {likeMutation.isLoading && <Spinner />}
                        {!likeMutation.isLoading && <IoHeart onClick={() => likeMutation.mutate()} cursor='pointer' fontSize='20px' color={post?.likeStatus === 'LIKED' ? 'red' : 'grey'} width={'20px'} height={'20px'} />}
                        <Image role={"button"} src='/assets/images/message.png' alt='message' width={'20px'} height={'20px'} onClick={() => clickHandler()} />
                        {self && (
                            <>
                                {!deleeteMutation.isLoading && <FiTrash2 onClick={() => deleeteMutation.mutate()} fontSize='20px' color={'red'} cursor='pointer' />}
                                {deleeteMutation.isLoading && <Spinner size='xs' />}
                            </>
                        )}
                    </HStack>
                )}

                <VStack borderRadius='10px 20px 20px 0px'  bg={secondaryBackgroundColor} shadow={"lg"} padding='10px' spacing={0} alignItems={self ? 'flex-end' : 'flex-start'} flexWrap={'wrap'} maxW={'300px'} minW={'250px'} borderTopLeftRadius={'20px'} borderTopRightRadius={'20px'} borderBottomLeftRadius={self ? '20px' : '0px'} borderBottomRightRadius={self ? '0px' : '20px'} >
                    <VStack width={'100%'} justifyContent={'flex-start'} alignItems={self ? 'flex-end' : 'flex-end'} mb={"2"} spacing={0}>
                        <CustomText fontFamily={'DM-Bold'} fontSize={'10px'} color={"#3C41F0"}  >
                            {textLimit(capitalizeFLetter(post?.user?.firstName) + " " + capitalizeFLetter(post?.user?.lastName), 20)}
                        </CustomText>
                    </VStack>
                    {post.mediaRef !== null && (
                        <>
                            {post.type === 'WITH_IMAGE' && (
                                <Image onClick={handleImageClick} src={`${post?.mediaRef}`} alt='img' width={'100%'} height={'150px'} objectFit={'cover'} borderRadius={'20px'} />
                            )}
                            {
                                post.type === 'WITH_VIDEO_POST' && (
                                    <video controls width={'100%'} height={'150px'} style={{ borderRadius: '20px' }}>
                                        <source src={post.mediaRef} />
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
                        <CustomText fontFamily={'DM-Regular'} fontSize='14px'>
                            {showMore ? handleLinks(post?.text) : post?.text.length > 500 ? handleLinks(post?.text.slice(0, 500) + '...') : handleLinks(post?.text)}
                            {post?.text.length > 500 && (
                                <span style={{ fontFamily: 'DM-Bold', color: THEME.COLORS.chasescrollButtonBlue, fontSize: '12px', cursor: 'pointer' }} onClick={() => setShowMore(!showMore)} >{showMore ? 'Show Less' : 'Show More'}</span>
                            )}
                        </CustomText>
                    </Box>
                    <VStack width={'100%'} justifyContent={'flex-start'} alignItems={self ? 'flex-end' : 'flex-end'} spacing={0}>
                        <Text textAlign={self ? "left" : "right"} fontSize={'10px'}>{formatTimeAgo(post?.timeInMilliseconds)}</Text>
                    </VStack>
                    <HStack>
                        <CustomText cursor='pointer' fontFamily={'DM-Regular'} fontSize='12px'>{post?.commentCount} <CustomText color={colorMode === 'light' ? 'brand.chasescrollButtonBlue' : bodyTextColor} display={'inline'} onClick={() => setAll({ activeMessageId: post.id, commentHasNext: false, commentPage: 0, comments: [], drawerOpen: true })}>Reply</CustomText> </CustomText>

                        <CustomText cursor='pointer' fontFamily={'DM-Regular'} fontSize='12px'>{post?.likeCount} <CustomText color={colorMode === 'light' ? 'brand.chasescrollButtonBlue' : bodyTextColor} display={'inline'}>Likes</CustomText> </CustomText>
                    </HStack>
                </VStack>

                <Box width={"fit-content"} >
                    {/* <UserImage size={"32px"} font={"13px"} border={"2px"} fontWeight={"medium"} data={post?.user} image={post?.user?.data?.imgMain?.value} /> */}
                </Box>


            </HStack>

            {/* DRAWER */}
            <Drawer isOpen={open} onClose={() => { setOpen(false); setShowEmoi(false) }} placement='right' size={showEmoji ? 'sm' : 'xs'}>
                <DrawerOverlay />
                <DrawerContent bg={secondaryBackgroundColor}>
                    <DrawerHeader borderBottomWidth={'1px'} borderBottomColor={borderColor}>
                        <HStack justifyContent={'space-between'}>
                            <CustomText>Replies</CustomText>
                            <Box as='button' onClick={() => setOpen(false)}  >
                                <FiX fontSize='25px' color={THEME.COLORS.chasescrollButtonBlue} />
                            </Box>
                        </HStack>
                    </DrawerHeader>

                    <DrawerBody>

                        <VStack flex={1} width='100%' height='100%'>

                            <Box flex={1} width='100%' height={'100%'} overflowX={'hidden'} overflowY={'auto'}>
                                {getComments.isLoading && (
                                    <HStack justifyContent={'center'}>
                                        <Spinner />
                                    </HStack>
                                )
                                }
                                {!getComments.isLoading && comments.length < 1 && (
                                    <CustomText fontFamily={'DM-Regular'} textAlign={'center'}>No comments yet, be the first too comment on the post</CustomText>
                                )
                                }
                                {comments.length > 0 && comments.map((item, index) => {
                                    if (index === comments.length - 1) {
                                        return (
                                            <CommentCard ref={commentlastChildRef} key={index.toString()} comment={item} />
                                        )
                                    } else {
                                        return (
                                            <CommentCard key={index.toString()} comment={item} />
                                        )
                                    }
                                })}
                            </Box>

                            <VStack position={'relative'} width={'100%'} height={'100px'} borderWidth={'1px'} borderColor={THEME.COLORS.chasescrollButtonBlue} borderRadius={'10px'} paddingX='10px'>

                                {showEmoji && (
                                    <Box position={'absolute'} height={'400px'} top='-450px' left={'0px'}>
                                        <EmojiPicker onEmojiClick={(e) => setComment(prev => prev + e.emoji)} />
                                    </Box>
                                )}

                                <textarea value={comment} onChange={(e) => setComment(e.target.value)} style={{ height: '50px', width: '100%', resize: 'none', backgroundColor: 'transparent', outline: 'none', padding: '5px' }} />
                                <HStack mt={"2"} alignItems={"center"} justifyContent={'space-between'} width='100%'>
                                    <HStack as={"button"} >
                                        <Image src='/assets/images/Smiley.svg' onClick={() => setShowEmoi(prev => !prev)} alt='smile' width={'24px'} height={'24px'} />
                                    </HStack>
                                    {!createComment.isLoading && <Image role='button' onClick={() => handleCreateComment({
                                        postID: post.id,
                                        comment
                                    })} src='/assets/images/send.svg' alt='smile' width={'24px'} height={'24px'} />}
                                    {createComment.isLoading && <Spinner />}
                                </HStack>
                            </VStack>

                        </VStack>

                    </DrawerBody>

                </DrawerContent>
            </Drawer>
            {/* END OF DRAWER */}

        </HStack>
    )
});

export default MessageCard