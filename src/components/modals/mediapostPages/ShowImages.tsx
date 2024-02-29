import CustomText from '@/components/general/Text'
import { PlusIcon } from '@/components/svg'
import { useDetails } from '@/global-state/useUserDetails'
import AWSHook from '@/hooks/awsHook'
import { IMAGE_URL, URLS } from '@/services/urls'
import { THEME } from '@/theme'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import httpService from '@/utils/httpService'
import { Avatar, Box, Button, Flex, HStack, Image, Input, Progress, Spinner, Textarea, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { FiChevronLeft, FiMinus, FiPlus } from 'react-icons/fi'
import { useMutation } from 'react-query'
import { useQueryClient } from 'react-query';
import ImageSlider from './ImageSlider'
import CustomButton from '@/components/general/Button'

const FileView = ({ file}: { file: File, }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [url, setUrl] = React.useState('');
  const fileReader = new FileReader();

  React.useEffect(() => {
    fileReader.onload = () => {
      setIsLoading(false);
      setUrl(fileReader.result as string);
    }
    fileReader.readAsDataURL(file);
  });
  return (
    <Box display={'inline-block'} width='100px' height='100px' borderRadius={'20px'} marginRight={'20pxß'}>
      { isLoading && (
        <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'} >
          <Spinner colorScheme='blue' size='md' />
        </VStack>
      )}
      { !isLoading && (
        <VStack width={'100%'} height='100%' overflow={'hidden'}>
          <Image src={url} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
        </VStack>
      )}
    </Box>
  )
}

function ShowImages({ files, setImage, handleStage, stage, setEmpty, mutate, removeFile }: {files: File[], setImage: (files: FileList, go?: boolean) => void, handleStage: (page: number) => void, removeFile: (index: number) => void, stage: number, setEmpty: () => void, mutate: () => void}) {
  const [url, setUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const inputRef = React.useRef<HTMLInputElement>();
  const { username, firstName, lastName, publicProfile, userId, user } = useDetails((state) => state);
  const [value, setValue] = React.useState('');
  const toast = useToast();
  const queryClient = useQueryClient();
  const { uploadedFile, fileUploadHandler, loading } = AWSHook();

  const createPost = useMutation({
    mutationFn: (data: any) => httpService.post(`${URLS.CREATE_POST}`, data),
    onSuccess: (data) => {
      handleStage(4);
      queryClient.invalidateQueries(['getPosts']);
      mutate();
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        title: 'Error',
        description: 'An error occured while uploading file',
        position: 'top-right',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  })

  React.useEffect(() => {
    if (uploadedFile.length > 0 && !loading) {
      const obj = {
        text: value,
        type: files[0].type.startsWith('image') ? 'WITH_IMAGE' : 'WITH_VIDEO_POST',
        isGroupFeed: false,
        sourceId: userId,
        mediaRef: uploadedFile[0].url,
        multipleMediaRef: uploadedFile.map((item) => item.url),
      }
      createPost.mutate(obj);
    }
  }, [files, loading, uploadedFile, userId, value])



  React.useEffect(() => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setIsLoading(false);
      setUrl(fileReader.result as string);
    }
    fileReader.readAsDataURL(files[0]);
  }, [files]);

  const handlePick = React.useCallback((data: FileList) => {
    setImage(data, false);
}, [setImage]);

const handleNext = () => {
  console.log(files);
  if (stage === 3) {
    if (files[0].size > 314572800) {
      toast({
        title: 'Warniing',
        description: 'File size must be less than or equal to 300MB',
        position: 'top-right',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return
    }
    fileUploadHandler(files as any);
    return;
  } else {
    handleStage(stage+1);
  }
}

const handlePrev = React.useCallback(() => {
  if (stage === 2) {
    setEmpty();
    handleStage(stage - 1);
    return;
  }
  handleStage(stage-1);
}, [handleStage, setEmpty, stage]);

const handleChange = (e: string) => {
  if (value.length < 60000) {
    setValue(e);
  }
}


  return (
    <VStack width='500px' height='auto'>
        <input hidden type='file' accept="image/*, video/*" ref={inputRef as any} onChange={(e) => handlePick(e.target.files as FileList)} />

        <HStack width='100%' height='50px' bg='white' justifyContent={'space-between'} paddingX='10px' alignItems={'center'} paddingTop={'10px'}>
            <FiChevronLeft size={'25px'} onClick={handlePrev} color={THEME.COLORS.chasescrollButtonBlue} />
            {!loading && !createPost.isLoading && (
              // <CustomText cursor='pointer' onClick={handleNext} color='brand.chasescrollButtonBlue' fontFamily={'Satoshi-Regular'} fontSize={'sm'}>{stage > 2 ? 'Create Post' : 'Next'}</CustomText>
              <CustomButton onClick={handleNext} borderWidth={"1px"} color={"#5465E0"} mt={"3"} backgroundColor={"#EFF1FE"} fontWeight={"bold"} px={"6"} rounded={"8px"} width={"fit-content"} text={'Next' } />
            )}
            {
              loading && (
                <Box width='50px'>
                  <Progress isIndeterminate colorScheme='blue' width={'100%'} size='sm' />
                </Box>
              )
            }
            {
             createPost.isLoading && (
                <Box width='50px'>
                  <Progress isIndeterminate colorScheme='blue' width={'100%'} size='sm' />
                </Box>
              )
            }
        </HStack>

        <Flex position='relative' maxWidth='500px' minWidth={'350px'} maxHeight={'500px'} minH={'350px'} borderRadius='0px'>

          { isLoading && (
            <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'} >
              <Progress isIndeterminate colorScheme='blue' width={'100%'} size='sm' />
            </VStack>
          )}

          { !isLoading && url !== '' && (
            <VStack width={'100%'} zIndex={1} height='auto' overflow={'hidden'}>
              {files[0].type.startsWith('video') && (
                <video controls width={'100%'} height={'300px'}>
                  <source src={url} type='video/mp4' />
                </video>
              )}
              {files[0].type.startsWith('image') && (
                <ImageSlider type='upload' files={files} />
              )}
            </VStack>
          )}

          {/* ADD MORE BUTTON */}

          {
            files[0].type.startsWith('image') && files.length < 4 && (
              <Button bg='brand.chasescrollButtonBlue' height='35px' color='white' position='absolute' bottom='20px' right='10px' zIndex={10} onClick={() => {
                if (files.length === 4) {
                  return;
                } else {
                  inputRef.current?.click();
                }
              }} >
                Add More
              </Button>
             
            )
          }
         
        </Flex>

        {
          files.length > 0 && (
            <HStack height={'120px'} alignItems={'center'} width='100%' paddingX={'10px'}  overflowX={'auto'} bg='lightgrey'>
              { files.map((file, index) => (
                <Box key={index.toString()} marginRight={'5px'} width='100px' height='70%' borderRadius={'10px'} position={'relative'}>

                  <Box width='100%' height='100%' borderRadius={'10px'} overflow={'hidden'}>
                    <Image src={URL.createObjectURL(file)} alt="img" width={'100px'} height='100%' objectFit={'cover'} />
                  </Box>

                  <VStack onClick={() => removeFile(index)} width='20px' height='20px' borderRadius={'10px'} position='absolute' top='-5px' right='-5px' bg='red' color='white' alignItems={'center'} justifyContent={'center'} cursor={'pointer'}>
                    <FiMinus size={'20px'} color='white' />
                  </VStack>
                </Box>
              ))}
            </HStack>
          )
        }
    
        {
          stage === 3 &&  (
            <VStack alignItems='flex-start' width='100%' height='250px' paddingX='20px' paddingTop={'20px'} bg='white' justifyContent={'center'} fontFamily={'Satoshi-Regular'}>

              <HStack>
              <Box  width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                {user?.data.imgMain.value === null && (
                  <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                    <CustomText fontFamily={'DM-Regular'}>{user?.firstName[0].toUpperCase()}{user?.lastName[0].toUpperCase()}</CustomText>
                  </VStack>
                )}
                {
                  user?.data.imgMain.value !== null && (
                    <>
                      { user?.data?.imgMain?.value.startsWith('https://') && <Image src={`${user?.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }

                      { !user?.data?.imgMain?.value.startsWith('https://') && <Image src={`${IMAGE_URL}${user?.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                    </>
                  )
                }
                </Box>
                <CustomText>{capitalizeFLetter(firstName)} {capitalizeFLetter(lastName)}</CustomText>
              </HStack>

              <Textarea value={value} borderWidth={0} placeholder='Write something about  your post' onChange={(e) =>handleChange(e.target.value)} />

              <HStack width={'100%'} justifyContent={'flex-end'}>
                <CustomText fontFamily={'Satoshi-Light'} fontSize={'ms'}>{value.length}/60000</CustomText>
              </HStack>

            </VStack>
          )
        }
    </VStack>
  )
}

export default ShowImages