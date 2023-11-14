'use client';
import CustomButton from '@/components/general/Button'
import CustomText from '@/components/general/Text'
import { THEME } from '@/theme'
import { Button, HStack, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import { FiImage, FiVideo } from 'react-icons/fi'

function SelectImages({setImage}: {
    setImage: (files: FileList, go?: boolean) => void,
}) {
    const [over, setOver] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>();
    const handlePick = React.useCallback((data: FileList) => {
        setImage(data, true);
    }, [setImage]);
  return (
    <VStack width='378px' height='295px' bg={over ? '#77e5778c':'white'} borderWidth={over ? 2:0} borderColor={'grey'} borderStyle={'dashed'} justifyContent={'center'} onDragOver={() => setOver(true)} onDragLeave={() => setOver(false)} onDrop={(e) => console.log(e.target)}>
        <input hidden type='file' accept="image/*, video/*" ref={inputRef as any} onChange={(e) => handlePick(e.target.files as FileList)} />
        <HStack justifyContent={'center'}>
            <Image alt='img' src="/assets/images/gallery.svg" />
            <Image alt='img' src="/assets/images/video.svg" />
            {/* <FiImage color={THEME.COLORS.chasescrollButtonBlue} size={35} />
            <FiVideo color={THEME.COLORS.chasescrollButtonBlue} size={35}  /> */}
        </HStack>
        <CustomText fontFamily={'Satoshi-Regular'} width='50%' textAlign={'center'} fontSize={'md'} color='grey'>You can drag your 
            pictures and video here </CustomText>
        <Button onClick={() => inputRef.current?.click()} variant={'solid'} width='80%' height='50px' bg='brand.chasescrollButtonBlue' isLoading={false} borderRadius={'10px'} colorScheme={'blue'} >
            Select Image or Video
        </Button>
    </VStack>
  )
}

export default SelectImages