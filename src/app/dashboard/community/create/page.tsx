'use client'
import { Modal, ModalOverlay, ModalContent, ModalBody, useToast, Box, HStack, VStack, Switch, Image, Button } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { FiFolderPlus, FiX } from 'react-icons/fi';
import CustomText from '@/components/general/Text';
import { useForm } from '@/hooks/useForm';
import { communitySchema } from '@/services/validations';
import { CustomInput } from '@/components/Form/CustomInput';
import { useMutation, useQueryClient } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';
import { useDetails } from '@/global-state/useUserDetails';
import { useRouter } from 'next/navigation'

function CreateCommunity() {
    const [file, setFile] = React.useState<File | null>(null);
    const [url, setUrl] = React.useState('');
    const [isPublic, setIsPublic] = React.useState(true);
    const obj = React.useRef<{ name: string, description: string } | null>(null);

    const { userId, email, } = useDetails((state) => state);
    const queryClient = useQueryClient();
    let fileReader = React.useRef<FileReader|null>(null);
    const inputRef = useRef<HTMLInputElement>();
    const toast = useToast();
    const router = useRouter();

    React.useEffect(() => {
        fileReader.current = new FileReader();
    }, []);

    // mutations
    const createCommunity = useMutation({
        mutationFn: (data: any) => httpService.post(`${URLS.CREATE_COMMUNITY}`, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['getMyCommunities']);
            toast({
                title: 'success',
                description: 'Community created',
                isClosable: true,
                position: 'top-right',
                duration: 5000,
                status: 'success',
            });
            setUrl('');
            setFile(null);
            router.back()
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'An error occured while trying to create a community',
                isClosable: true,
                position: 'top-right',
                duration: 5000,
                status: 'error',
            });
        }
    })
    const uploadImage = useMutation({
        mutationFn: (data: FormData) => httpService.post(`${URLS.UPLOAD_IMAGE}/${userId}`, data),
        onSuccess: (data) => {
            const objectt = {
                data: {
                    name: obj.current?.name,
                    description: obj.current?.description,
                    email,
                    isPublic,
                    imgSrc: data.data?.fileName,
                }
            };
            console.log(objectt)
            createCommunity.mutate(objectt);
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'An error occured while trying to upload image',
                isClosable: true,
                position: 'top-right',
                duration: 5000,
                status: 'error',
            });
        },
    });

    const { renderForm } = useForm({
        defaultValues: {
            name: '',
            description: ''
        },
        validationSchema: communitySchema,
        submit(data) {
            handleSubmit(data);
        },
    });



    React.useEffect(() => {
        if(fileReader !== null) {
            (fileReader.current as FileReader).onload = () => {
                setUrl(fileReader?.current?.result as string);
                console.log(`URL -> ${fileReader?.current?.result}`)
            }
        }
    }, [fileReader])

    // functitons
    const handleFilePicked = (file: FileList) => {
        const image = file[0];
        console.log(file);
        if (!image.type.startsWith('image')) {
            toast({
                title: 'Warning',
                description: 'You can only pick an image',
                position: 'top-right',
                isClosable: true,
                status: 'warning',
                duration: 5000,
            });
            return;
        }
        setFile(image);
        fileReader?.current?.readAsDataURL(image);
    }

    const handleSubmit = (data: any) => {
        const dd = data;
        console.log(data);
        if (url === '') {
            toast({
                title: 'warning',
                description: 'You must select an image',
                isClosable: true,
                position: 'top-right',
                duration: 5000,
                status: 'warning',
            });
            return
        }
        obj.current = data;
        const formData = new FormData();
        formData.append('file', file as any);
        uploadImage.mutate(formData);
    }
    return renderForm(
        <VStack width='100%' height='100%' overflow={'hidden'} padding={['20px', '0px']} >

            <VStack width={['100%', '40%']}>

                <input hidden type='file' accept='image/*' ref={inputRef as any} onChange={(e) => handleFilePicked(e.target.files as FileList)} />
                <HStack width='100%' height={'60px'} justifyContent={'flex-start'} alignItems={'center'}>
                    <FiX fontSize={'25px'} onClick={() => router.back()} />
                </HStack>

                <Box cursor={'pointer'} onClick={() => inputRef.current?.click()} width='100%' height="200px" borderWidth='2px' borderColor='grey' borderRadius={'20px'} borderStyle={'dashed'} overflow={'hidden'} bg='grey' >
                    {url === '' && file === null && (
                        <VStack width='100%' height='100%' justifyContent={'center'} alignItems={'center'}>
                            <Image src='/assets/svg/folder-cloud.svg' alt='icon' width={50} height={50} />
                            <CustomText fontFamily={'Satoshi-Regular'} color='white' fontSize={'md'}>Upload image here</CustomText>
                        </VStack>
                    )}
                    {
                        url !== '' && file !== null && (
                            <Image src={url} alt='image' objectFit={'cover'} style={{ width: '100%', height: '100%' }} />
                        )
                    }
                </Box>

                <VStack marginY={'20px'} width='100%' spacing={5} >
                    <CustomInput name='name' placeholder='Community name' type='text' isPassword={false} />
                    <CustomInput name='description' placeholder='Community Description' type='text' isPassword={false} />
                </VStack>

                <VStack width='100%' alignItems={'center'} marginBottom={'20px'} >
                    <CustomText fontFamily={'Satoshi-Regular'} fontSize='20px'>Visibiltiy</CustomText>
                    <HStack spacing={6} alignItems={'center'} marginTop={'10px'}>
                        <CustomText>Private</CustomText>
                        <Switch isChecked={isPublic === false} onChange={() => setIsPublic(prev => !prev)} />
                    </HStack>

                    <HStack spacing={6} alignItems={'center'} marginTop={'10px'}>
                        <CustomText>Public</CustomText>
                        <Switch isChecked={isPublic} onChange={() => setIsPublic(prev => !prev)} />
                    </HStack>
                </VStack>

                <Button type='submit' marginTop={'20px'} variant={'solid'} bg={'brand.chasescrollButtonBlue'} isLoading={uploadImage.isLoading || createCommunity.isLoading} width='100%' borderRadius={'10px'} color='white' > Submit</Button>

            </VStack>

        </VStack>
    )
}

export default CreateCommunity