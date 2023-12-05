'use client';
import React from 'react'
import {useParams} from 'next/navigation';
import { Avatar, Box, Flex, HStack, Input, InputGroup, InputRightElement, Spinner, Textarea, VStack, useToast, Image } from '@chakra-ui/react';
import { FiChevronLeft } from 'react-icons/fi'
import { useDetails } from '@/global-state/useUserDetails';
import { THEME } from '@/theme';
import CustomText from '@/components/general/Text';
import { useMutation, useQuery, useQueryClient } from 'react-query'
import httpService from '@/utils/httpService';
import { IMAGE_URL, URLS } from '@/services/urls';
import CommentBox from '@/components/home/Comment';
import { useRouter } from 'next/navigation';
import { IComment } from '@/models/Comment';

function Comment() {
  const [userComments, setUserComments] = React.useState<IComment[]>([]);
  const [commentInput, setCommentInput] = React.useState("");
  const router = useRouter();


  const { firstName, lastName, userId, username, user } = useDetails((state) => state)
  const params = useParams();
  const post = params;
  const queryClient = useQueryClient();
  const toast = useToast(); 


  const { isLoading } = useQuery([`getComments-${post?.id}`, post?.id], () => httpService.get(`${URLS.GET_ALL_COMMENTS}?postID=${post?.id}`), {
    onSuccess: (data) => { 
      setUserComments(data?.data?.content);
    }
  });

  const addComment = useMutation({
    mutationFn: (data: any) => httpService.post('/feed/add-comment', data),
    onSuccess: () => {
      queryClient.invalidateQueries([`getComments-${post?.id}`]);
      setCommentInput("");
      toast({
        title: 'Success',
        description: 'Comment added',
        duration: 5000,
        position: 'top-right',
        status: 'success',
        isClosable: true,
      });
    }
  });

  const addCommentNew = React.useCallback(async () => {
    if (commentInput === "" || addComment.isLoading) return;
    addComment.mutate({ postID: post?.id, comment: commentInput });
  }, [commentInput, addComment, post?.id]);

  const handleKeyDown = React.useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (commentInput === "" || addComment.isLoading) return;
      addComment.mutate({ postID: post?.id, comment: commentInput });
    }
  }, [commentInput, addComment, post?.id]);
  
  return (
    <VStack width={'100%'} height={'100%'} padding='20px' bg='whitesmoke'>
      {/* HEADER */}
      <HStack width={'100%'} spacing={[3, 10]}>
          <FiChevronLeft fontSize='25px' color='black' onClick={() => router.back()} />
          <HStack width={'100%'}>

          <Box width='42px' height='42px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
            {user?.data.imgMain.value === null && (
              <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                <CustomText fontFamily={'DM-Regular'}>{user?.username[0].toUpperCase()}</CustomText>
              </VStack>
            )}
            {
              user?.data.imgMain.value && (
                <>
                  { user?.data?.imgMain?.value.startsWith('https://') && <Image src={`${user?.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }

                  { !user?.data?.imgMain?.value.startsWith('https://') && <Image src={`${IMAGE_URL}${user?.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                </>
              )
            }
          </Box>

            <InputGroup>
              <InputRightElement>
               { !addComment.isLoading &&  <CustomText cursor='pointer' fontFamily={'Satoshi-Medium'} marginRight={'20px'} onClick={addCommentNew} color={THEME.COLORS.chasescrollButtonBlue}>Send</CustomText> }
               { addComment.isLoading && <Spinner colorScheme='blue' size='sm' />}
              </InputRightElement>
              <Input value={commentInput} onKeyDown={handleKeyDown} onChange={(e) => setCommentInput(e.target.value)} placeholder='Add a comment' bg='white' width={'100%'} borderWidth={1} borderColor={'lightgrey'} />
            </InputGroup>
          </HStack>
      </HStack>

      {/* CCOMMENTS */}
     <Box width={'100%'} height={'100%'} overflowX={'hidden'} overflowY={'auto'} marginTop={'30px'} paddingX={['0px','65px']}>
      { isLoading && (
        <Flex flexDir={'column'} width={'100%'} height='50px' justifyContent={'center'} alignItems={'center'}>
          <Spinner colorScheme='blue' size='lg' />
          <CustomText>Loading Comments</CustomText>
        </Flex>
      )}
      { !isLoading && userComments.length > 0 && userComments.filter((item) => item.user.data !== null).map((item, index) => (
        <CommentBox {...item} key={index.toString()} />
      ))}
     </Box>
    </VStack>
  )
}

export default Comment