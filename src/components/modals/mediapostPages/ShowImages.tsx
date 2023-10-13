import CustomText from '@/components/general/Text'
import { useDetails } from '@/global-state/useUserDetails'
import { URLS } from '@/services/urls'
import { THEME } from '@/theme'
import httpService from '@/utils/httpService'
import { Avatar, Box, Flex, HStack, Image, Input, Spinner, Textarea, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { FiChevronLeft, FiPlus } from 'react-icons/fi'
import { useMutation } from 'react-query'
import { useQueryClient } from 'react-query';

const FileView = ({ file }: { file: File}) => {
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

function ShowImages({ files, setImage, handleStage, stage, setEmpty }: {files: File[], setImage: (files: FileList, go?: boolean) => void, handleStage: (page: number) => void, stage: number, setEmpty: () => void}) {
  const [url, setUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const inputRef = React.useRef<HTMLInputElement>();
  const { username, firstName, lastName, publicProfile, userId } = useDetails((state) => state);
  const [value, setValue] = React.useState('');
  const toast = useToast();
  const queryClient = useQueryClient();

  const uploadMediaFile = useMutation({
    mutationFn: (data: FormData) => httpService.post(files[0].type.startsWith('image') ? `${URLS.UPLOAD_IMAGE}/${userId}`:`${URLS.UPLOAD_VIDEO}/${userId}`, data),
    onSuccess: (data) => {
      const obj = {
        text: value,
        type: files[0].type.startsWith('image') ? 'WITH_IMAGE' : 'WITH_VIDEO',
        isGroupFeed: false,
        mediaRef: data.data?.fileName,
        multipleMediaRef: [
          data.data?.fileName,
        ]
      }
      createPost.mutate(obj);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: 'An error occured while uploading file',
        position: 'top-right',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const createPost = useMutation({
    mutationFn: (data: any) => httpService.post(`${URLS.CREATE_POST}`, data),
    onSuccess: (data) => {
      handleStage(4);
      queryClient.invalidateQueries(['getPosts']);
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

const handleNext = React.useCallback(() => {
  if (stage === 3) {
    if (files[0].size > 15000000) {
      toast({
        title: 'Warniing',
        description: 'File size must be less than or equal to 15MB',
        position: 'top-right',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return
    }
    const formData = new FormData();
    formData.append('file', files[0]);
    uploadMediaFile.mutate(formData);
    return;
  };
  handleStage(stage+1);
}, [files, handleStage, stage, toast, uploadMediaFile])

const handlePrev = React.useCallback(() => {
  if (stage === 2) {
    setEmpty();
    handleStage(stage - 1);
    return;
  }
  handleStage(stage-1);
}, [handleStage, setEmpty, stage]);

const handleChange = (e: string) => {
  if (value.length < 100) {
    setValue(e);
  }
}

  return (
    <VStack width='100%' height='600px'>
        <input hidden type='file' accept="image/*, video/*" ref={inputRef as any} onChange={(e) => handlePick(e.target.files as FileList)} />

        <HStack width='100%' height='50px' bg='white' justifyContent={'space-between'} paddingX='10px' alignItems={'center'} paddingTop={'10px'}>
            <FiChevronLeft size={'25px'} onClick={handlePrev} color={THEME.COLORS.chasescrollButtonBlue} />
            { !uploadMediaFile.isLoading && !createPost.isLoading && (
              <CustomText cursor='pointer' onClick={handleNext} color='brand.chasescrollButtonBlue' fontFamily={'Satoshi-Regular'} fontSize={'sm'}>{stage > 2 ? 'Create Post' : 'Next'}</CustomText>
            )}
            {
              uploadMediaFile.isLoading && (
                <Spinner colorScheme='blue' size='md' />
              )
            }
            {
             createPost.isLoading && (
                <Spinner colorScheme='blue' size='md' />
              )
            }
        </HStack>

        <Flex width='100%'  bg='lightgrey' borderRadius='0px' position={'relative'}>

          { isLoading && (
            <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'} >
              <Spinner colorScheme='blue' size='md' />
            </VStack>
          )}

          { !isLoading && url !== '' && (
            <VStack width={'100%'} zIndex={1} height='100%' overflow={'hidden'}>
              {files[0].type.startsWith('video') && (
                <video controls width={'100%'} height={'100%'}>
                  <source src={url} type='video/mp4' />
                </video>
              )}
              {files[0].type.startsWith('image') && (
                <Image src={url} alt='image' width={'100%'} height={'300px'} objectFit={'cover'} />
              )}
            </VStack>
          )}
         
        </Flex>
    
        {
          stage === 3 &&  (
            <VStack alignItems='flex-start' width='100%' height='250px' paddingX='20px' bg='white' justifyContent={'center'} fontFamily={'Satoshi-Regular'}>

              <HStack>
                <Avatar name={`${firstName} ${lastName}`} size={'md'} />
                <CustomText>{firstName} {lastName}</CustomText>
              </HStack>

              <Textarea value={value} borderWidth={0} placeholder='Write something about  your post' onChange={(e) =>handleChange(e.target.value)} />

              <HStack width={'100%'} justifyContent={'flex-end'}>
                <CustomText fontFamily={'Satoshi-Light'} fontSize={'ms'}>{value.length}/100</CustomText>
              </HStack>

            </VStack>
          )
        }
    </VStack>
  )
}

export default ShowImages