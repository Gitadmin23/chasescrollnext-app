import CustomText from '@/components/general/Text'
import { THEME } from '@/theme'
import { Button, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import { FiThumbsUp } from 'react-icons/fi'

function Success({ onClose, handleStage }: {
  onClose: () => void,
  handleStage: (num: number) => void
}) {
  return (
    <VStack spacing={5}paddingX={'20px'}  height='350px' justifyContent={'center'} alignItems={'center'}>
      <CustomText fontFamily={'DM-Medium'} fontSize={'24px'} color='black'>Post Created Successfully!</CustomText>
      <CustomText textAlign={'center'} fontFamily={'DM-Regular'} fontSize={'16px'} color={'grey'}>
        Congratulations! Your Post has been created
        successfully.
      </CustomText>

      {/* <Button variant={'solid'} height={'50px'} borderRadius={'25px'} bg="#5D70F9" color='white' fontFamily={'DM-Medium'}>
        Promote Your Post
      </Button> */}

      <Button onClick={() => {
        handleStage(1);
        onClose()
      }} variant={'ghost'} color={'brand.chasescrollButtonBlue'}>Done</Button>
    </VStack>
  )
}

export default Success