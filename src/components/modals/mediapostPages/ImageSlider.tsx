import {Box, VStack, Image, HStack, Button, useColorMode} from '@chakra-ui/react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import React from 'react'
import { IMAGE_URL } from '@/services/urls'
import { useImageModalState } from '@/components/general/ImageModal/imageModalState'
import useCustomTheme from "@/hooks/useTheme";

const FileViewer = ({ file }: { file: File,  }) => {
    return (
        <Box width='500px' height='400px' overflow={'hidden'} zIndex={2}>
            <Image src={URL.createObjectURL(file)} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
        </Box>
    )
}

const ImageViewer = ({ file }: { file: string,  }) => {
    return (
        <Box width='100%' height='100%' overflow={'hidden'}  zIndex={2}>
            { file.startsWith('https://') &&  <Image src={`${file}`} alt='image' style={{ width: '100%', height: '100%' }} objectFit={'cover'} />}
            { !file.startsWith('https://') &&  <Image src={`${IMAGE_URL}${file}`} alt='image' style={{ width: '100%', height: '100%' }} objectFit={'cover'} />} 
        </Box>
    )
}

function ImageSlider({files, type, links, setCurrentIndex }: {
    files?: File[],
    type: 'feed'|'upload', 
    links?: string[],
    goBack?: () => void,
    setCurrentIndex?: (index: number) => void
}) {
    const [index, setIndex] = React.useState(0);
    const { setAll } = useImageModalState((state) => state);

    const { bodyTextColor, primaryColor,secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();


    const handleImageClick = () => {
        setAll({ images: links as string[], isOpen: true })
    }

    const goForward = React.useCallback(() => {
        if (type === 'upload') {
            if (index < (files as File[])?.length - 1) {
                setIndex(index + 1);
                if (setCurrentIndex) {
                    setCurrentIndex(index + 1);
                }
            } else {
                setIndex(0);
                if (setCurrentIndex) {
                    setCurrentIndex(0);
                }
                return;
            }
        } else {
            if (index < (links as string[])?.length - 1) {
                setIndex(index + 1);
                if (setCurrentIndex) {
                    setCurrentIndex(0);
                }
            } else {
                setIndex(0);
                if (setCurrentIndex) {
                    setCurrentIndex(0);
                }
                return;
            }
        }
        
    }, [type, index, files, links])

    const goBackward = React.useCallback(() => {
        if (type === 'upload') {
            if (index > 0) {
                setIndex(index - 1);
                if (setCurrentIndex) {
                    setCurrentIndex(index - 1);
                }
            } else {
                setIndex((files as File[])?.length - 1);
                if (setCurrentIndex) {
                    setCurrentIndex((files as File[])?.length - 1);
                }
                return;
            }
        } else {
            if (index > 0) {
                setIndex(index - 1);
                if (setCurrentIndex) {
                    setCurrentIndex(index - 1);
                }
            } else {
                setIndex((files as File[])?.length - 1);
                if (setCurrentIndex) {
                    setCurrentIndex((files as File[])?.length - 1);
                }
                return;
            }
        }
    }, [index, type])

  return (
    <VStack width='100%' height='100%' spacing={0} bg={mainBackgroundColor}>

        <HStack width={'100%'} height={(links as string[])?.length < 2 || (files as File[])?.length < 2 ? '100%':'90%'} position={'relative'} bg='brown' zIndex={1}>

            {/* LEFT ARROW */}
            {type === 'feed' && (links as string[])?.length > 1 && (
                <VStack zIndex='10' height={'100%'} width={'50px'} left='0' position={'absolute'} justifyContent={'center'} alignItems={'center'} >
                    <VStack cursor='pointer' justifyContent={'center'} width='40px' height={'40px'} borderRadius={'50%'} bg='#02020285' _hover={{ backgroundColor: '#02020285' }} onClick={goBackward} >
                        <FiArrowLeft size={'30px'} color='white'  />  
                    </VStack>
                </VStack>
            )}

            {type === 'upload' && (files as File[])?.length > 1 && (
                <VStack zIndex='10' height={'100%'} width={'50px'} left='0' position={'absolute'} justifyContent={'center'} alignItems={'center'} >
                    <VStack cursor='pointer' justifyContent={'center'} width='40px' height={'40px'} borderRadius={'50%'} bg='#02020285' _hover={{ backgroundColor: '#02020285' }} onClick={goBackward} >
                        <FiArrowLeft size={'30px'} color='white'  />  
                    </VStack>
                </VStack>
            )}

            {type === 'upload' && <FileViewer file={(files as File[])[index]} />}
            {type === 'feed' && (
                <Box width='100%' height='100%' onClick={handleImageClick}>
                    <ImageViewer file={(links as string[])[index]} /> 
                </Box>
            )}

            {/* RIGHT ARROW */}
            {type === 'upload' && (files as File[])?.length > 1 && (
                <VStack zIndex='10'  height={'100%'} width={'50px'} right='0' position='absolute'  justifyContent={'center'} alignItems={'center'} >
                    <VStack cursor='pointer' justifyContent={'center'} width='40px' height={'40px'} borderRadius={'50%'} bg='#02020285' _hover={{ backgroundColor: '#02020285' }} onClick={goForward} >
                        <FiArrowRight size={'30px'} color='white'  />  
                    </VStack>
                </VStack>
            )}

            {type === 'feed' && (links as string[])?.length > 1 && (
                <VStack zIndex='10'  height={'100%'} width={'50px'} right='0' position='absolute'  justifyContent={'center'} alignItems={'center'} >
                    <VStack cursor='pointer' justifyContent={'center'} width='40px' height={'40px'} borderRadius={'50%'} bg='#02020285' _hover={{ backgroundColor: '#02020285' }} onClick={goForward} >
                        <FiArrowRight size={'30px'} color='white'  />  
                    </VStack>
                </VStack>
            )}

        </HStack>

        {type === 'feed' && (links as string[])?.length > 1 && (
            <HStack justifyContent={'center'} width='100%' height={'10%'} >
            {links?.map((item, indx) => (
                    <Box key={indx.toString()} marginX='2px' width={index === indx ? '10px':'5px'} height={index === indx ? '10px':'5px'} bg={index === indx ? 'brand.chasescrollButtonBlue':'lightgrey'} borderRadius={'10px'} />
                ))}
            </HStack>
        )}

        {type === 'upload' && (files as File[])?.length > 1 && (
            <HStack justifyContent={'center'} alignItems={'center'} width='100%' height={'10%'} >
            {files?.map((item, indx) => (
                    <Box key={indx.toString()} marginX='2px' width={index === indx ? '10px':'5px'} height={index === indx ? '10px':'5px'} bg={index === indx ? 'brand.chasescrollButtonBlue':'lightgrey'} borderRadius={'10px'} />
            ))}
            </HStack>
        )}

    </VStack>
  )
}

export default ImageSlider