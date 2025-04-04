'use client'
import React from 'react'
import { Text, TextProps, Heading } from '@chakra-ui/react'

interface IProps {
    children: any;
    fontFamily?: 'Satoshi-Regular' | 'Satoshi-Medium' | 'Satoshi-Light' | 'Satoshi-Bold' | 'DM-Medium' | 'DM-Regular' | 'DM-Bold' | 'DM-Light';
    isHeader?: boolean;
}


function CustomText({children, isHeader = false, ...rest}: IProps & TextProps) {
    if (isHeader) {
        return (
            <Heading 
                {...rest}
            >
                {children}
            </Heading>
        )
    }
  return (
   <Text 
    {...rest}
   >
    {children}
   </Text>
  )
}

export default CustomText