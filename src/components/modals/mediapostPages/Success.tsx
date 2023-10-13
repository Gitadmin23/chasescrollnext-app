import CustomText from '@/components/general/Text'
import { THEME } from '@/theme'
import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { FiThumbsUp } from 'react-icons/fi'

function Success({ onClose }: {
    onClose: () => void
}) {
  return (
   <VStack width='100%' height='100%' justifyContent={'center'} alignItems={'center'}>
        <FiThumbsUp fontSize={'200px'} color={THEME.COLORS.chasescrollButtonBlue} />
        <CustomText fontFamily={'Satoshi-Light'} fontSize={'lg'} mt='20px'>Your post has been created</CustomText>
        <Button onClick={() => onClose()} width='50%' height={'45px'} backgroundColor={THEME.COLORS.chasescrollButtonBlue}> Close</Button>
   </VStack>
  )
}

export default Success