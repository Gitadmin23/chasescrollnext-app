import { Spinner, VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import CustomText from '../general/Text'

function SettingsChip({ icon, action, text, isLoading = false }: {
    action: () => void,
    icon: ReactNode,
    text: string,
    isLoading?: boolean,
}) {
  return (
    <VStack cursor='pointer' onClick={() => isLoading ? null: action()} width='76px' height='64px' borderRadius={'12px'} bg='#F1F2F9' justifyContent={'center'}>
        { !isLoading && icon}
        { isLoading && <Spinner size="xs" /> }
        <CustomText fontFamily={'DM-Light'} fontSize={'14px'} color='brand.chasescrollButtonBlue'>{text}</CustomText>
    </VStack>
  )
}

export default SettingsChip