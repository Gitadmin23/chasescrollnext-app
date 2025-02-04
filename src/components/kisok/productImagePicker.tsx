import { Flex, Image, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { GallaryIcon } from '../svg' 
import { IoClose } from 'react-icons/io5';
import useProductStore from '@/global-state/useCreateProduct';

export default function ProductImagePicker() {
 
    const toast = useToast()
    const [fileIndex, setFileIndex] = useState(0)

    const { image, updateImage } = useProductStore((state) => state);

    const inputRef = React.useRef<HTMLInputElement>();

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
        // updateImage([...image, URL?.createObjectURL(arrs)]);
    }, []);
    
    const handlePick = React.useCallback((data: FileList) => {
        console.log(data);
        
        handleImagePicked(data);
    }, [handleImagePicked]);

    // const emptyFiles = React.useCallback(() => {
    //     updateImage([]);
    // }, []);

    const removeFile = (index: number) => {
        if (image.length === 1) {
            updateImage(image.filter((_: any, i:any) => i !== index));
            // setStage(1);
            return;
        }
        updateImage(image.filter((_: any, i:any) => i !== index));
    }

    console.log(image);
    

    return (
        <Flex flexDir={"column"} w={"full"} gap={"4"} >
            <Flex as={"button"} type='button' w={"full"} h={"240px"} borderColor={"#D9D9D9"} justifyContent={"center"} alignItems={"center"} onClick={() => inputRef.current?.click()} flexDir={"column"} rounded={"16px"} borderWidth={"1px"} border={"dashed"} >
                <GallaryIcon />
                <Text fontWeight={"500"} mt={"3"} >Drag pictures here to upload</Text>
                <Text fontSize={"14px"} color={"#ACACB0"} >You need at least 5 pictures</Text>
                <input hidden type='file' accept="image/*" multiple ref={inputRef as any} onChange={(e) => handlePick(e.target.files as FileList)} />
            </Flex>

            <Flex w={"full"} >
                {image && (
                    <>
                        {image?.length > 0 && (
                            <Flex w={"full"} overflowX={"auto"} >
                                <Flex w={"fit-content"} py={"2"} gap={"3"} >
                                    {image?.map((item: File, index: number) => {
                                        return (
                                            <Flex key={index} w={"12"} h={"12"} rounded={"md"} roundedTopRight={"0px"} borderWidth={fileIndex === index ? "2px" : "1px"} borderColor={fileIndex === index ? "#233CF3" : "gray"} pos={"relative"} justifyContent={"center"} alignItems={"center"} >
                                                <Flex as={"button"} onClick={() => removeFile(index)} w={"4"} h={"4"} color={"white"} bg={"black"} rounded={"full"} justifyContent={"center"} alignItems={"center"} pos={"absolute"} top={"-1"} right={"-1"} zIndex={"10"}  >
                                                    <IoClose size="15px" />
                                                </Flex> 
                                                    <Image src={URL?.createObjectURL(item)} alt='image' width={'100%'} height={'100%'} rounded={"md"} roundedTopRight={"0px"} objectFit={'cover'} />
                                            </Flex>
                                        )
                                    })} 
                                </Flex>
                            </Flex>
                        )}
                    </>
                )} 
            </Flex>
        </Flex>
    )
}
