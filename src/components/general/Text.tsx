import React from 'react'
import { Text, TextProps, Heading } from '@chakra-ui/react'

interface IProps {
    children: any;
    fontFamily?: 'Rubik-Regular' | 'Rubik-Medium' | 'Rubik-Light' | 'DM-Bold' | 'DM-Medium' | 'DM-Regular';
    isHeader?: boolean;
}


function CustomText({children, fontFamily = 'Rubik-Regular', isHeader = false, ...rest}: IProps & TextProps) {
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