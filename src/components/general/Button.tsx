import React from 'react'
import { Button as ChakraButton} from '@chakra-ui/react'

interface IProps {
    type?: 'button' | 'submit';
    text: string;
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
    width?: string;
    height? : string;
    shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
    isLoading: boolean;
}

function CustomButton({
    type = 'button',
    text,
    backgroundColor = 'brand.chasescrollBgBlue',
    color = 'white',
    borderRadius = '20px',
    width = '120px',
    height = '45px',
    shadow = 'none',
    isLoading = false,
}: IProps) {
  return (
    <ChakraButton
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        color={color}
        borderRadius={borderRadius}
        type={type}
        isLoading={isLoading}
        shadow={shadow}
    >
        {text}
    </ChakraButton>
  )
}

export default CustomButton