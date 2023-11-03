import { useDetails } from '@/global-state/useUserDetails';
import { URLS } from '@/services/urls';
import { THEME } from '@/theme';
import httpService from '@/utils/httpService';
import { HStack, Input, Spinner, VStack, Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Divider,
  Image,
  Box,
  Button,
  Portal,
  useToast
 } from '@chakra-ui/react'
import React from 'react'
import { FiSend, FiSmile, FiPlusCircle } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';
import EmojiPicker from 'emoji-picker-react';
import CustomText from '@/components/general/Text';
import AWSHook from '../../../hooks/awsHook'
import { IoReturnDownBackOutline } from 'react-icons/io5';
import MediaBox from './MediaBox';
import { useCommunityPageState } from '@/components/Community/chat/state';

const IMAGE_FORM = ['jpeg', 'jpg', 'png', 'svg'];
const VIDEO_FORM = ['mp4'];
const DOC_FORM = ['pdf', 'doc'];


function TextArea() {
  const [text, setText] = React.useState('');
  const [showEmoji, setShowEmoi] = React.useState(false);
  const [files, setFiles] = React.useState<Array<{ file: string, url: string }>>([]);
  const toast = useToast();
  const { username } = useDetails((state) => state)

  const { fileUploadHandler, loading, uploadedFile, reset, deleteFile } = AWSHook();
  const ref = React.useRef<HTMLInputElement>();
  const containerRef = React.useRef<HTMLDivElement>();
  const queryClient = useQueryClient();
  const { activeCommunity } = useCommunityPageState((state) => state);
  const { userId } = useDetails((state) => state);

  const createPost   = useMutation({
    mutationFn: (data: any) => httpService.post(`${URLS.CREATE_POST}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['getMessages']);
      setText('');
      setFiles([]);
      reset();
    },
    onError: () => {
      toast({ 
        title: 'Error',
        description: 'An errorr occured',
        status: 'error',
        position: 'top-right'
      })
    }
  });

  const handleFilePick = React.useCallback((uploaded: Array<any>) => {
    setFiles(prev => [...prev, ...uploaded]);
  }, [])

  React.useEffect(() => {
    if (uploadedFile.length > 0) {
      handleFilePick(uploadedFile);
    } else {
      setFiles([]);
    }
  }, [handleFilePick, uploadedFile])

  const handleFilePic = (files: FileList) => {
    fileUploadHandler(files);
  }


  const accept = React.useCallback((): string => {
    if (uploadedFile.length < 1) {
      return "image/*, video/mp4, application/*"
    } else {
      // check file type
      const file = uploadedFile[0];
      const _format_ = file?.url?.split('.');
      const format = _format_[_format_.length - 1];
      if (IMAGE_FORM.includes(format.toLowerCase())) {
        return "image/*"
      } else if (VIDEO_FORM.includes(format.toLowerCase())) {
        return "video/*"
      } else {
        return "application/*"
      }
      
    }
  }, [uploadedFile])

 


  const submit = () => {
    if (text === '' || loading) {
      toast({
        title: 'Warning',
        description: text === '' ? 'You have to type in a message' : 'image uploaing',
        status: 'warning',
        position: 'top-right',
      })
      return
    }
    if (uploadedFile.length < 1) {
      createPost.mutate({
        text,
        type: 'NO_IMAGE_POST',
        isGroupFeed: true,
        sourceId: activeCommunity?.id
      })
    } else {
      const file = uploadedFile[0];
      if (file === undefined) return;
      const _format_ = file?.url?.split('.');
      const format = _format_[_format_.length - 1];
      console.log(format);
      if (IMAGE_FORM.includes(format.toLowerCase())) {
        createPost.mutate({
          text,
          type: 'WITH_IMAGE',
          isGroupFeed: true,
          sourceId: activeCommunity?.id,
          mediaRef: file.url,
          multipleMediaRef: files.map((item) => item.url),
        });
      } else if (VIDEO_FORM.includes(format.toLowerCase())) {
        createPost.mutate({
          text,
          type: 'WITH_VIDEO_POST',
          isGroupFeed: true,
          sourceId: activeCommunity?.id,
          mediaRef: file.url,
          multipleMediaRef: files.map((item) => item.url),
        });
      } else if (DOC_FORM.includes(format.toLowerCase())) {
        createPost.mutate({
          text,
          type: 'WITH_FILE',
          isGroupFeed: true,
          sourceId: activeCommunity?.id,
          mediaRef: file.url,
          multipleMediaRef: files.map((item) => item.url),
        });
      } else {
        createPost.mutate({
          text,
          type: 'WITH_FILE',
          isGroupFeed: true,
          sourceId: activeCommunity?.id,
          mediaRef: file.url,
          multipleMediaRef: files.map((item) => item.url),
        });
      }
    }
  }
  return (
    <VStack width='100%' height={'auto'} maxH={'200px'} bg='transparent' paddingY='10px' paddingX="10px" position={'relative'}>
      <input ref={ref as any} onChange={(e) => handleFilePic(e.target.files as FileList)} hidden type='file' accept={accept()} />
        <VStack ref={containerRef as any} width={'100%'} height='100%' borderWidth={'1px'} bg='white' borderColor={'#D0D4EB'} borderRadius={'10px'} paddingX='8px' paddingY='8px'>

            <textarea value={text} onChange={(e) => setText(e.target.value)} style={{
              width: '100%', height: 'auto', backgroundColor: 'transparent',
              outline: 'none', resize: 'none',
            }} placeholder={`Say something @${username}`} />

            { uploadedFile.length > 0 &&
              <Box width={'100%'} height={'100px'} display={'inline-block'} whiteSpace={'nowrap'}>
                {
                  uploadedFile.map((item, index) => {
                    const __format__ = item.url.split('.');
                    const format = __format__[__format__.length - 1];
                    if (IMAGE_FORM.includes(format)) {
                      return (
                        <MediaBox key={index.toString()} onClose={() => deleteFile(index)}>
                          <Image cursor={'pointer'} src={item.url} alt='image' key={index.toString()} objectFit={'cover'} width='100%' height='100px' borderRadius={'8px'} display={'inline'} marginRight={'10px'} />
                        </MediaBox>
                      )
                    }
                    if (VIDEO_FORM.includes(format)) {
                      return (
                        <MediaBox key={index.toString()} onClose={() => deleteFile(index)}>
                          <video key={index.toString()} controls style={{ width: '100%', height: 'auto', borderRadius: '8px', marginRight: '10px' }}>
                            <source src={item.url} type='video/mp4'  />
                          </video>
                        </MediaBox>
                      )
                    }
                    if (DOC_FORM.includes(format)) {
                      return (
                        <MediaBox key={index.toString()} onClose={() => deleteFile(index)}>
                          <VStack cursor={'pointer'}  width={'100%'} height={'100px'} borderRadius={'8px'} justifyContent={'center'} alignItems={'center'} bg='lightgrey'>
                            <CustomText fontSize={'20px'}>{format.toUpperCase()}</CustomText>
                          </VStack>
                        </MediaBox>
                      )
                    }
                    return (
                      <Image cursor={'pointer'} src={item.url} alt='image' key={index.toString()} width='100px' height='100px' borderRadius={'8px'} display={'inline'} marginRight={'10px'} />
                    )
                  })
                }
              </Box>
            }

            <HStack width='100%' alignItems={'center'} justifyContent={'space-between'}>

                <HStack alignItems={'center'} >

                   <Popover placement='top' size={''}>
                       <PopoverTrigger>
                        <Box>
                        { !loading && <Image onClick={() => ref.current?.click()} src='/assets/images/Add.png' alt='smile' width={'30px'} height={'30px'} /> }
                          { loading && <Spinner size='md' />}
                        </Box>
                       </PopoverTrigger>
                      <PopoverContent width='200px' height='70px'>
                        <PopoverArrow />
                        <PopoverBody>
                          <CustomText>Attach</CustomText>
                          <Divider orientation='horizontal' />
                          <HStack cursor={'pointer'} onClick={() => ref?.current?.click()} flex='1' alignItems={'center'} height='70%'>
                            <Image src='/assets/images/monitor.png' alt='img' width='20px' height='20px' />
                            <CustomText>Upload from device</CustomText>
                          </HStack>
                        </PopoverBody>
                      </PopoverContent>
                   </Popover>

                    <Popover placement='top'>
                      <PopoverTrigger>
                        <Image src='/assets/images/Smiley.svg' alt='smile' width={'30px'} height={'30px'} />
                      </PopoverTrigger>
                      <Portal containerRef={containerRef as any}>
                        <PopoverContent position={'absolute'}>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverBody>
                            <EmojiPicker  onEmojiClick={(e) => setText(prev => prev + e.emoji)} />
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </Popover>

                </HStack>

                { !createPost.isLoading && <Image onClick={() => submit()} src='/assets/images/send.svg' alt='smile' width={'30px'} height={'30px'} /> }
                { createPost.isLoading && <Spinner size='sm' />}

            </HStack>

        i</VStack>
    </VStack>
  )
}

export default TextArea