import CustomText from '@/components/general/Text'
import { THEME } from '@/theme'
import { Button, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import { FiThumbsUp } from 'react-icons/fi'

function Success({ onClose }: {
    onClose: () => void
}) {
  return (
   <VStack width='434px' height='408px' justifyContent={'center'} alignItems={'center'}>
        <Image alt='like' src='/assets/images/Like.svg' width={'70px'} height={'70px'} />
        <CustomText fontFamily={'Satoshi-Light'} fontSize={'lg'} mt='20px'>Your post has been created</CustomText>
        <Button onClick={() => onClose()} width='50%' height={'45px'} color={'white'} backgroundColor={THEME.COLORS.chasescrollButtonBlue}> Close</Button>
   </VStack>
  )
}

export default Success