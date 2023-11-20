import { Avatar, Box, Button, HStack, Input, Spinner, VStack, useToast, Image } from '@chakra-ui/react'
import React from 'react'
import CustomText from '../general/Text'
import { FiHeart } from 'react-icons/fi'
import { IComment, Subcomment } from '@/models/Comment'
import { useDetails } from '@/global-state/useUserDetails'
import Moment from 'moment';
import { IMAGE_URL, RESOURCE_BASE_URL, URLS } from '@/services/urls'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import httpService from '@/utils/httpService'
import { Heart } from 'iconsax-react'
import { handleLinks } from '../general/LinkExtractor'
import { THEME } from '@/theme'

function SubCommentBox({ comment, id, commentID, timeInMilliseconds, likeCount, likeStatus, user: { userId, username, publicProfile, data } }: Subcomment) {
    const [isLiked, setIsLiked] = React.useState(likeStatus);
    const { userId: myId } = useDetails((state) => state);
    const queryClient = useQueryClient();
    const toast = useToast();


    // GET SUBCOMMENTS

    // mutateion
    const likeComment = useMutation({
        mutationFn: () => httpService.post(`${URLS.LIKE_SUB_COMMENT}/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries([`getSubcomments-${commentID}`]);
        }
    });

    const deleteeComment = useMutation({
        mutationFn: () => httpService.delete(`${URLS.DELETE_SUB_COMMENT}/${id}`),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Deleted',
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            });
            queryClient.invalidateQueries([`getSubcomments-${commentID}`]);
        }
    });

    return (
        <>
            <HStack width='100%' justifyContent={'space-between'} alignItems={'center'} marginBottom={'20px'}>

                <HStack>

                <Box width='42px' height='42px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                            { data === null && (
                            <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                                <CustomText fontFamily={'DM-Regular'}>{username ? username[0].toUpperCase(): 'USER'}</CustomText>
                            </VStack>
                            )}
                            { data?.imgMain.value === null && (
                            <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                                <CustomText fontFamily={'DM-Regular'}>{username[0].toUpperCase()}</CustomText>
                            </VStack>
                            )}
                            {
                            data.imgMain.value && (
                                <>
                                { data?.imgMain?.value.startsWith('https://') && <Image src={`${data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }

                                { !data?.imgMain?.value.startsWith('https://') && <Image src={`${IMAGE_URL}${data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                                </>
                            )
                            }
                    </Box>

                    <VStack alignItems={'flex-start'}>
                        <VStack alignItems={'flex-start'} spacing={0}>
                            <CustomText fontFamily={'Satoshi-Medium'} color='brand.chasescrollButtonBlue'>{username}</CustomText>
                            <CustomText fontFamily={'Satoshi-Regular'}>{comment}</CustomText>
                        </VStack>

                        <HStack spacing={10} fontSize={'14px'}>
                            <CustomText>{Moment(timeInMilliseconds).fromNow()}</CustomText>
                            <CustomText >{likeCount} like</CustomText>
                            {myId === userId && (
                                <CustomText cursor={'pointer'} color={'red'} onClick={() => deleteeComment.mutate()}>Delete</CustomText>
                            )}
                        </HStack>
                    </VStack>
                </HStack>

                <Heart variant={likeStatus === 'LIKED' ? 'Bold':'Outline'} cursor={'pointer'} style={{ alignSelf: 'flex-end' }} onClick={() => likeComment.mutate()} fontSize='20px' color={likeStatus === 'LIKED' ? 'red' : 'black'} />
            </HStack>
        
        </>
    )
}

function CommentBox({ comment, id, postID, timeInMilliseconds, likeCount, likeStatus, user: { userId, username, publicProfile, data } }: IComment) {
    const [showReplies, setShowReplies] = React.useState(false);
    const [subComments, setSubComments] = React.useState<Subcomment[]>([]);
    const [reply, setReply] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [liked, setLiked] = React.useState(likeStatus);
    const [showMore, setShowMore] = React.useState(false);

    const toast = useToast();
    const { userId: myId } = useDetails((state) => state);
    console.log('myId', myId);
    console.log(`userId - ${userId}`)
    const queryClient = useQueryClient();

    // mutate
    const createSubComment = useMutation({
        mutationFn: (data: any) => httpService.post(`${URLS.CREATE_SUB_COMMENT}`, data),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: 'Sub comment added',
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            });
            queryClient.invalidateQueries([`getSubcomments-${id}`]);
            setReply('');
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'An error occured while adding sub comment',
                status: 'error',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            })
        }
    });

    const likeComment = useMutation({
        mutationFn: () => httpService.post(`${URLS.LIKE_COMMENT}/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries([`getComments-${postID}`]);
        }
    });

    const deleteComment = useMutation({
        mutationFn: () => httpService.delete(`${URLS.DELETE_COMMENT}/${id}`),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Comment deleted',
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            });
            queryClient.invalidateQueries([`getComments-${postID}`]);

        }
    });

    // GET SUBCOMMENTS
    const { isLoading, isError, refetch } = useQuery([`getSubcomments-${id}`, id, page], () => httpService.get(`${URLS.GET_ALL_SUBCOMMENTS}`, {
        params: {
            commentID: id,
            page,
            size:20
        }
    }), {
        enabled: true,
        onSuccess: (data) => {
            setSubComments(data?.data?.content);
        },
        onError: (erroor: any) => {}
    });

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key);
        if (e.key === 'Enter' && reply.length > 3) {
            const obj = {
                commentID: id,
                comment: reply
            }
            createSubComment.mutate(obj);
        }
    }, [reply, id, createSubComment])
    return (
        <>
            <HStack width='100%' justifyContent={'space-between'} alignItems={'center'} marginBottom={'20px'} marginRight={['20px', '20px']}>

                <HStack flex={1} alignItems={'flex-start'}>

                     <Box width='42px' height='42px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                            { data === null && (
                            <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                                <CustomText fontFamily={'DM-Regular'}>{username ? username[0].toUpperCase(): 'USER'}</CustomText>
                            </VStack>
                            )}
                            { data?.imgMain.value === null && (
                            <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                                <CustomText fontFamily={'DM-Regular'}>{username[0].toUpperCase()}</CustomText>
                            </VStack>
                            )}
                            {
                            data.imgMain.value && (
                                <>
                                { data?.imgMain?.value.startsWith('https://') && <Image src={`${data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }

                                { !data?.imgMain?.value.startsWith('https://') && <Image src={`${IMAGE_URL}${data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                                </>
                            )
                            }
                    </Box>

                    <VStack alignItems={'flex-start'} width={'70%'}>
                        <VStack spacing={0} alignItems={'flex-start'}>
                            <CustomText fontFamily={'Satoshi-Light'} color='brand.chasescrollButtonBlue'>{username[0].toUpperCase()}{username.substring(1)}</CustomText>
                            <VStack>

                                <CustomText fontFamily={'Satoshi-Medium'}>
                                { showMore ? handleLinks(comment) : comment.length > 30 ? comment.slice(0, 30) + '...' : comment}
                                <br />
                                { comment.length > 30 && (
                                    <span style={{ fontFamily: 'DM-Bold', color: THEME.COLORS.chasescrollButtonBlue, fontSize:'12px', cursor: 'pointer' }} onClick={() => setShowMore(!showMore)} >{showMore ? 'Show Less' : 'Show More'}</span>
                                )}
                                </CustomText>
                            </VStack>
                        </VStack>

                        <HStack spacing={10} fontSize={'14px'} width={['100%','60%']}>
                            <CustomText flex={1} fontFamily={'Satoshi-Regular'} >{Moment(timeInMilliseconds).fromNow()}</CustomText>
                            <CustomText flex={1} fontFamily={'Satoshi-Regular'} >{likeCount} like</CustomText>
                            <CustomText flex={1} fontFamily={'Satoshi-Regular'} cursor={'pointer'} color={showReplies ? 'brand.chasescrollButtonBlue':'black'} onClick={() => setShowReplies(prev => !prev)}>{subComments.length > 0 ? (`${subComments.length}`):null} Reply</CustomText>
                            {myId === userId && (
                                <CustomText cursor={'pointer'} color={'red'} onClick={() => deleteComment.mutate()}>Delete</CustomText>
                            )}
                        </HStack>
                    </VStack>
                </HStack>

                <Heart cursor={'pointer'} style={{ alignSelf: 'flex-end'}} onClick={() => likeComment.mutate()} size='20px' variant={likeStatus === 'LIKED' ? 'Bold':'Outline'} color={likeStatus === 'LIKED' ? 'red' : 'black'} />
            </HStack>
            {
                showReplies && (
                    <VStack width={['100%','60%']} marginTop='20px'>
                        <HStack width='100%' paddingLeft={['20px', '70px']}  alignItems={'center'}>
                            <Input fontFamily={'Satoshi-Regular'} value={`${reply}`} onChange={(e) => setReply(e.target.value)} onKeyDown={handleKeyDown} width={'70%'} height={'40px'} borderRadius={10} bg='white' />

                            { createSubComment.isLoading && <Spinner color='blue' colorScheme='blue' size='sm' /> }
                        </HStack>
                        <Box width='100%' paddingLeft={['20px', '70px']} marginTop={'20px'} maxHeight={'200px'} overflowY={'auto'} paddingRight={'20px'}>
                            {
                                !isLoading && isError && (
                                    <VStack width='100%' height={'50px'} justifyContent={'center'} alignItems={'center'}>
                                        <CustomText fontFamily={'Satoshi-Regular'}>An error occured while getting subcomments</CustomText>
                                        <Button fontFamily={'Satoshi-Regular'} onClick={() => refetch()}>Refresh</Button>
                                    </VStack>
                                )
                            }
                            {
                                !isLoading && !isError && subComments.length < 1 && (
                                    <VStack width='100%' height={'50px'} justifyContent={'center'} alignItems={'center'}>
                                        <CustomText fontFamily={'Satoshi-Regular'}>No sub comments</CustomText>
                                    </VStack>
                                )
                            }
                            {
                                isLoading && (
                                    <VStack width='100%' height={'50px'} justifyContent={'center'} alignItems={'center'}>
                                        <Spinner color='blue' colorScheme='blue' size={'md'} />
                                        <CustomText fontFamily={'Satoshi-Regular'}>Loading subcomments</CustomText>
                                    </VStack>
                                )
                            }
                            { !isLoading && !isError && subComments.length > 0 && subComments.map((item, index) => (
                                <SubCommentBox {...item} key={index.toString()} />
                            ))}
                        </Box>
                    </VStack>
                )
            }
        </>
    )
}

export default CommentBox