import { VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import CustomText from '../general/Text'

function SettingsChip({ icon, action, text}: {
    action: () => void,
    icon: ReactNode,
    text: string,
}) {
  return (
    <VStack width='76px' height='64px' borderRadius={'12px'} bg='#F1F2F9' justifyContent={'center'}>
        {icon}
        <CustomText fontFamily={'DM-Light'} fontSize={'14px'} color='brand.chasescrollButtonBlue'>{text}</CustomText>
    </VStack>
  )
}

export default SettingsChip