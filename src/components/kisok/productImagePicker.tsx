import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { GallaryIcon } from '../svg'
import { IoArrowBack, IoClose } from 'react-icons/io5';
import useProductStore from '@/global-state/useCreateProduct';
import { IMAGE_URL } from '@/services/urls';
import { Add } from 'iconsax-react';
import { FiX } from 'react-icons/fi';
import useCustomTheme from '@/hooks/useTheme';

export default function ProductImagePicker() {

    const toast = useToast()
    const [fileIndex, setFileIndex] = useState(0)

    const { primaryColor, borderColor, mainBackgroundColor } = useCustomTheme()

    const { image, updateImage, productdata, rentaldata, imagePreview } = useProductStore((state) => state);

    const inputRef: any = React.useRef(null);

    useEffect(() => {
        updateImage([]);
    }, [])
 
    const handleImagePicked = React.useCallback((Files: FileList) => {
        const file = Files[0];
        if (file.size > 800000) {
            toast({
                title: 'Error',
                description: 'File size too large',
                position: 'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        const arrs: any = [];
        // const arrs: any = [];
        for (let i = 0; i < Files.length; i++) {
            arrs.push(Files[i]);
        }
        updateImage([...image, ...arrs]);
    }, []);

    const handlePick = React.useCallback((data: FileList) => {
        console.log(data);

        handleImagePicked(data);
    }, [handleImagePicked]);

    const removeFile = (index: number) => {
        if (image.length === 1) {
            updateImage(image.filter((_: any, i: any) => i !== index));
            return;
        }
        updateImage(image.filter((_: any, i: any) => i !== index));
    }
 
    

    return ( 
        <Flex px={"10px"} w={"full"} flexDir={"column"} gap={"3"} display={['flex', 'flex']} >  
            <input hidden type='file' accept="image/*" multiple ref={inputRef} onChange={(e) => handlePick(e.target.files as FileList)} />
            <Flex mt={"8"} gap={"4"} bgColor={mainBackgroundColor} w={"full"} flexDirection={"column"} p={"8"} borderWidth={"1.03px"} borderColor={borderColor} rounded={"16px"} >

                <Flex w={"full"} gap={"4"} overflowX={"auto"} css={{
                    '&::-webkit-scrollbar': {
                        display: 'block'
                    }
                }}>
                    {productdata?.images.length > 0 && productdata?.images.map((item, index) => (
                        <Flex w='200px' height='200px' key={index.toString()} cursor='pointer' flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0} position={'relative'}>
                            <Box onClick={() => removeFile(index)} width="25px" height={"25px"} backgroundColor={"red"} borderRadius={"20px"} position={"absolute"} zIndex={3} display="flex" justifyContent="center" alignItems={'center'} top="0px" right={"0px"}>
                                <FiX color="white" size={"15px"} />
                            </Box>
                            <Image src={IMAGE_URL + item} w='100%' h='100%' alt='service image' objectFit={'cover'} rounded='16px' />
                        </Flex>
                    ))}
                    {rentaldata?.images.length > 0 && rentaldata?.images.map((item, index) => (
                        <Flex w='200px' height='200px' key={index.toString()} cursor='pointer' flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0} position={'relative'}>
                            <Box onClick={() => removeFile(index)} width="25px" height={"25px"} backgroundColor={"red"} borderRadius={"20px"} position={"absolute"} zIndex={3} display="flex" justifyContent="center" alignItems={'center'} top="0px" right={"0px"}>
                                <FiX color="white" size={"15px"} />
                            </Box>
                            <Image src={IMAGE_URL + item} w='100%' h='100%' alt='service image' objectFit={'cover'} rounded='16px' />
                        </Flex>
                    ))}
                    {imagePreview?.length > 0 && imagePreview?.map((item, index) => (
                        <Flex w='200px' height='200px' key={index.toString()} cursor='pointer' flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0} position={'relative'}>
                            <Box onClick={() => removeFile(index)} width="25px" height={"25px"} backgroundColor={"red"} borderRadius={"20px"} position={"absolute"} zIndex={3} display="flex" justifyContent="center" alignItems={'center'} top="0px" right={"0px"}>
                                <FiX color="white" size={"15px"} />
                            </Box>
                            <Image src={IMAGE_URL + item} w='100%' h='100%' alt='service image' objectFit={'cover'} rounded='16px' />
                        </Flex>
                    ))}
                    {image.length > 0 && image.map((item, index) => (
                        <Flex w='200px' height='200px' key={index.toString()} cursor='pointer' flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0} position={'relative'}>
                            <Box onClick={() => removeFile(index)} width="25px" height={"25px"} backgroundColor={"red"} borderRadius={"20px"} position={"absolute"} zIndex={3} display="flex" justifyContent="center" alignItems={'center'} top="0px" right={"0px"}>
                                <FiX color="white" size={"15px"} />
                            </Box>
                            <Image src={URL?.createObjectURL(item)} w='100%' h='100%' alt='service image' objectFit={'cover'} rounded='16px' />
                        </Flex>
                    ))}
                    {(productdata?.images.length + image?.length) < 5 && (
                        <Flex onClick={() => inputRef.current?.click()} cursor='pointer' w={"200px"} py={"8"} px={"2"} flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} flexShrink={0}>
                            {/* <GallaryIcon /> */}
                            <Add size={30} variant='Outline' color={primaryColor} />
                            <Text fontSize={"10px"} w={"225px"} textAlign={"center"} >{`File Format: JPG, JPEG, PNG and picture shouldn't be more than 10 MB`}</Text>
                            <Text fontSize={"12px"} textDecoration={"underline"} mt={"2"} >Upload from your device</Text>
                        </Flex>
                    )}

                </Flex>

            </Flex>
            </Flex>

            )
}
