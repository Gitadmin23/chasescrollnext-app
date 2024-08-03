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
  useToast,
  useColorMode
 } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import EmojiPicker from 'emoji-picker-react';
import CustomText from '@/components/general/Text';
import MediaBox from '../Community/chat/MediaBox';
import AWSHook from '@/hooks/awsHook';
import { useChatPageState } from './state';
import useCustomTheme from '@/hooks/useTheme';
import useChat from './hooks/chat';

const IMAGE_FORM = ['jpeg', 'jpg', 'png', 'svg'];
const VIDEO_FORM = ['mp4'];
const DOC_FORM = ['pdf', 'doc'];


function TextArea() {
  const [text, setText] = React.useState('');
  const [showEmoji, setShowEmoi] = React.useState(false);
  const [showUploader, setShowuploader] = React.useState(false);
  const [files, setFiles] = React.useState<Array<{ file: string, url: string }>>([]);
  const toast = useToast();
  const { username } = useDetails((state) => state)

  const { fileUploadHandler, loading, uploadedFile, reset, deleteFile } = AWSHook();
  const ref = React.useRef<HTMLInputElement>();
  const containerRef = React.useRef<HTMLDivElement>();
  const queryClient = useQueryClient();
  const { activeChat } = useChatPageState((state) => state);
  const { userId } = useDetails((state) => state);


  const {
    bodyTextColor,
    primaryColor,
    secondaryBackgroundColor,
    mainBackgroundColor,
    borderColor,
} = useCustomTheme();
const { colorMode, toggleColorMode } = useColorMode();

  // const createPost   = useMutation({
  //   mutationFn: (data: any) => httpService.post(`${URLS.CHAT_MESSGAE}`, data),
  //   onSuccess: () => {
  //     queryClient.refetchQueries(['getMessages']);
  //     queryClient.invalidateQueries(['getChats']);
  //     queryClient.invalidateQueries(['getMessages']); 
  //     setText('');
  //     setFiles([]);
  //     reset();
  //     setShowuploader(false)
  //   },
  //   onError: () => {
  //     toast({ 
  //       title: 'Error',
  //       description: 'An errorr occured',
  //       status: 'error',
  //       position: 'top-right'
  //     })
  //   }
  // });

  const { createPost } = useChat()

  const handleFilePick = React.useCallback((uploaded: Array<any>) => {
    setFiles(prev => [...prev, ...uploaded]);
    setShowuploader(false);
  }, [])

  useEffect(() => {
    if(createPost?.isSuccess){
      setText('');
      setFiles([]);
      reset();
      setShowuploader(false)
    }
  }, [createPost?.isSuccess])

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
    if (text === '' && uploadedFile.length < 1 || loading) {
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
        message: text,
        chatID: activeChat?.id
      })
    } else {
      const file = uploadedFile[0];
      if (file === undefined) return;
      const _format_ = file?.url?.split('.');
      const format = _format_[_format_.length - 1];
      console.log(format);
      if (IMAGE_FORM.includes(format.toLowerCase())) {
        createPost.mutate({
          message: text,
          mediaType: 'PICTURE',
          chatID: activeChat?.id,
          media: file.url,
          multipleMediaRef: files.map((item) => item.url),
        });
      } else if (VIDEO_FORM.includes(format.toLowerCase())) {
        createPost.mutate({
            message: text,
            mediaType: 'VIDEO',
            chatID: activeChat?.id,
            media: file.url,
            multipleMediaRef: files.map((item) => item.url),
        });
      } else if (DOC_FORM.includes(format.toLowerCase())) {
        createPost.mutate({
            message: text,
            mediaType: 'DOCUMENT',
            chatID: activeChat?.id,
            media: file.url,
            multipleMediaRef: files.map((item) => item.url),
        });
      } else {
        createPost.mutate({
          message: text,
          mediaType: 'DOCUMENT',
          chatID: activeChat?.id,
          media: file.url,
          multipleMediaRef: files.map((item) => item.url),
      }); 
      }
    }
  }
  return (
    <VStack width='100%' height={'auto'} maxH={'230px'} bg='transparent' paddingY='10px' paddingX="10px" position={'relative'}>
      <input ref={ref as any} onChange={(e) => handleFilePic(e.target.files as FileList)} hidden type='file' accept={accept()} />
        <VStack ref={containerRef as any} width={'100%'} height='100%' borderWidth={'0.5px'} bg={secondaryBackgroundColor} borderColor={borderColor} borderRadius={'10px'} paddingX='8px' paddingY='8px' position={'relative'}>

            { showEmoji && (
                <Box position={'absolute'} height={'400px'} top='-450px' left={'0px'}>
                    <EmojiPicker  onEmojiClick={(e) => setText(prev => prev + e.emoji)} />
                </Box>
            )}

            <textarea value={text} onChange={(e) => setText(e.target.value)} style={{
              width: '100%', height: 'auto', backgroundColor: 'transparent',
              outline: 'none', resize: 'none',
              color: bodyTextColor
            }} placeholder={`Say something @${username}`} />

            { uploadedFile.length > 0 &&
              <Box width={'100%'} height={'100px'} flex='1' display={'inline-block'} whiteSpace={'nowrap'}>
                {
                  uploadedFile.map((item, index) => {
                    const __format__ = item.url.split('.');
                    const format = __format__[__format__.length - 1];
                    if (IMAGE_FORM.includes(format)) {
                      return (
                        <MediaBox key={index.toString()} onClose={() => deleteFile(index)}>
                          <Image cursor={'pointer'} src={item.url} alt='image' key={index.toString()} objectFit={'cover'} width='60px' height='60px' borderRadius={'8px'} display={'inline'} marginRight={'10px'} />
                        </MediaBox>
                      )
                    }
                    if (VIDEO_FORM.includes(format)) {
                      return (
                        <MediaBox key={index.toString()} onClose={() => deleteFile(index)}>
                          <video key={index.toString()} controls style={{ width: '60px', height: '60px', borderRadius: '8px', marginRight: '10px' }}>
                            <source src={item.url} type='video/mp4'  />
                          </video>
                        </MediaBox>
                      )
                    }
                    if (DOC_FORM.includes(format)) {
                      return (
                        <MediaBox key={index.toString()} onClose={() => deleteFile(index)}>
                          <HStack width='100%' bg='whitesmoke' borderRadius={'10px'} padding='5px'>
                            <VStack cursor={'pointer'}  width={'60px'} height={'60px'} borderRadius={'8px'} justifyContent={'center'} alignItems={'center'} bg='lightgrey'>
                                <CustomText fontFamily={'DM-Bold'} fontSize={'20px'}>{format.toUpperCase()}</CustomText>
                            </VStack>
                            <VStack alignItems={'flex-start'}>
                                <CustomText fontFamily={'DM-Regular'} color='brand.chasescrollButtonBlue'>{item.file.length > 10 ? item.file.substring(0, 10) + '...': item.file}</CustomText>
                                <CustomText fontFamily={'DM-Bold'} fontSize='14px' color='grey'>{format.toUpperCase()}</CustomText>
                            </VStack>
                          </HStack>
                        </MediaBox>
                      )
                    }
                    return (
                        <MediaBox key={index.toString()} onClose={() => deleteFile(index)}>
                        <HStack width='100%' bg='whitesmoke' borderRadius={'10px'} padding='5px'>
                          <VStack cursor={'pointer'}  width={'60px'} height={'60px'} borderRadius={'8px'} justifyContent={'center'} alignItems={'center'} bg='lightgrey'>
                              <CustomText fontFamily={'DM-Bold'} fontSize={'20px'}>{format.toUpperCase()}</CustomText>
                          </VStack>
                          <VStack alignItems={'flex-start'}>
                              <CustomText fontFamily={'DM-Regular'} color='brand.chasescrollButtonBlue'>{item.file.length > 10 ? item.file.substring(0, 10) + '...': item.file}</CustomText>
                              <CustomText fontFamily={'DM-Bold'} fontSize='14px' color='grey'>{format.toUpperCase()}</CustomText>
                          </VStack>
                        </HStack>
                      </MediaBox>
                    )
                  })
                }
              </Box>
            }

            <HStack width='100%' alignItems={'center'} justifyContent={'space-between'}>

                <HStack alignItems={'center'} >

                   <Popover placement='top' size={''} isOpen={showUploader} onClose={() => setShowuploader(false)} closeOnBlur closeOnEsc closeDelay={5000}>
                       <PopoverTrigger>
                        <Box>
                        { !loading && <Image onClick={() => setShowuploader(true)} src='/assets/images/Add.png' alt='smile' width={'24px'} height={'24px'} /> }
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

                   <Image src='/assets/images/Smiley.svg' alt='smile' width={'24px'} height={'24px'} onClick={() => setShowEmoi(prev => !prev)} />

                </HStack>

                { !createPost.isLoading && <Image onClick={() => submit()} src='/assets/images/send.svg' alt='smile' width={'24px'} height={'24px'} /> }
                { createPost.isLoading && <Spinner size='sm' />}

            </HStack>

        </VStack>
    </VStack>
  )
}

export default TextArea