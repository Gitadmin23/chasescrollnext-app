import { useCommunityPageState } from '@/app/dashboard/community/chat/state';
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
  Portal
 } from '@chakra-ui/react'
import React from 'react'
import { FiSend, FiSmile, FiPlusCircle } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';
import EmojiPicker from 'emoji-picker-react';
import CustomText from '@/components/general/Text';
import AWSHook from '../../../hooks/awsHook'


function TextArea() {
  const [text, setText] = React.useState('');
  const [showEmoji, setShowEmoi] = React.useState(false);
  const [files, setFiles] = React.useState<Array<{ file: string, url: string }>>([])

  const { fileUploadHandler, loading,uploadedFile } = AWSHook();
  const ref = React.useRef<HTMLInputElement>();
  const containerRef = React.useRef<HTMLDivElement>();
  const queryClient = useQueryClient();
  const { activeCommunity } = useCommunityPageState((state) => state);
  const { userId } = useDetails((state) => state)
  const createTextPost   = useMutation({
    mutationFn: () => httpService.post(`${URLS.CREATE_POST}`,{
      text,
      type: 'NO_IMAGE_POST',
      isGroupFeed: true,
      sourceId: activeCommunity?.id
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['getMessages']);
      setText('');
    }
  });

  const handleFilePick = React.useCallback((uploaded: Array<any>) => {
    if (files.length > 1) {
      const arr = [...files, ...uploaded];
        setFiles(arr);
    } else {
      setFiles(uploaded)
    }
  }, [files])

  React.useEffect(() => {
    console.log('---THE UPLOADED FILE---');
    if (uploadedFile.length > 0) {
      handleFilePick(uploadedFile);
    }
  }, [handleFilePick, uploadedFile])

  const handleFilePic = (files: FileList) => {
  fileUploadHandler(files);
  }

 


  const submit = () => {
    if (text === '') return;
    createTextPost.mutate();
  }
  return (
    <VStack width='100%' height={'auto'} maxH={'200px'} bg='whitesmoke' paddingY='10px' paddingX="10px" position={'relative'}>
      <input ref={ref as any} onChange={(e) => handleFilePic(e.target.files as FileList)} hidden type='file' accept="image/*, video/mp4, application/*" />
        <VStack ref={containerRef as any} width={'100%'} height='100%' borderWidth={'1px'} bg='white' borderColor={THEME.COLORS.chasescrollButtonBlue} borderRadius={'10px'} paddingX='8px' paddingY='8px'>

            <Input value={text} onChange={(e) => setText(e.target.value)} width='100%' height='100%' placeholder='Type your message' borderWidth={'0px'} padding='0px' outline={'none'} _focus={{ outlineColor: 'transparent'}} />

            { files.length > 0 &&
              <Box width={'100%'} height={'100px'} display={'inline-block'} whiteSpace={'nowrap'}>
                {
                  files.map((item, index) => (
                    <Image src={item.url} alt='image' key={index.toString()} width='100px' height='100px' borderRadius={'8px'} />
                  ))
                }
              </Box>
            }

            <HStack width='100%' alignItems={'center'} justifyContent={'space-between'}>

                <HStack alignItems={'center'} >

                   <Popover placement='top' size={''}>
                      <PopoverTrigger>
                       <Box>
                       { !loading && <FiPlusCircle color={THEME.COLORS.chasescrollBlue} size={'25px'} /> }
                        { loading && <Spinner size='md' />}
                       </Box>
                      </PopoverTrigger>
                      <PopoverContent width='200px' height='70px'>
                        <PopoverArrow />
                        <PopoverBody>
                          <CustomText>Attach</CustomText>
                          <Divider orientation='horizontal' />
                          <HStack onClick={() => ref?.current?.click()} flex='1' alignItems={'center'} height='70%'>
                            <Image src='/assets/images/monitor.png' alt='img' width='20px' height='20px' />
                            <CustomText>Upload from device</CustomText>
                          </HStack>
                        </PopoverBody>
                      </PopoverContent>
                   </Popover>

                    <Popover placement='top'>
                      <PopoverTrigger>
                        <FiSmile onClick={() => setShowEmoi(prev => !prev)} color={THEME.COLORS.chasescrollBlue} size={'25px'} />
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

                { !createTextPost.isLoading && <FiSend onClick={() => createTextPost.mutate()} color={THEME.COLORS.chasescrollBlue} size={'25px'} /> }
                { createTextPost.isLoading && <Spinner size='sm' />}

            </HStack>

        i</VStack>
    </VStack>
  )
}

export default TextArea