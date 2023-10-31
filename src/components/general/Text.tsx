import React from 'react'
import { Text, TextProps, Heading } from '@chakra-ui/react'

interface IProps {
    children: any;
    fontFamily?: 'Satoshi-Regular' | 'Satoshi-Medium' | 'Satoshi-Light' | 'Satoshi-Bold' | 'DM-Medium' | 'DM-Regular' | 'DM-Bold' | 'DM-Light';
    isHeader?: boolean;
}


function CustomText({children, fontFamily = 'Satoshi-Regular', isHeader = false, ...rest}: IProps & TextProps) {
    if (isHeader) {
        return (
            <Heading
                fontFamily={fontFamily}
                {...rest}
            >
                {children}
            </Heading>
        )
    }
  return (
   <Text
    fontFamily={fontFamily}
    {...rest}
   >
    {children}
   </Text>
  )
}

export default CustomText