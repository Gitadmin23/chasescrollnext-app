import React from 'react'
import { Text, TextProps, Heading } from '@chakra-ui/react'

interface IProps {
    children: any;
    fontFamily: 'Rubik-Regular' | 'Rubik-Medium' | 'Rubik-Light' | 'DM-Bold' | 'DM-Medium' | 'DM-Regular';
    size: string;
    isHeader?: boolean;
}


function ChakraText({children, fontFamily = 'Rubik-Regular', size='16px', isHeader = false, ...rest}: IProps & TextProps) {
    if (isHeader) {
        return (
            <Heading
                fontFamily={fontFamily}
                size={size}
                {...rest}
            >
                {children}
            </Heading>
        )
    }
  return (
   <Text
    fontFamily={fontFamily}
    size={size}
    {...rest}
   >
    {children}
   </Text>
  )
}

export default ChakraText