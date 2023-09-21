import React, { ReactNode } from 'react'
import { ButtonProps, Button as ChakraButton, Box} from '@chakra-ui/react'

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
    icon?: ReactNode
}

function CustomButton({
    type = 'button',
    text,
    backgroundColor = 'brand.chasescrollBlue',
    color = 'white',
    borderRadius = '20px',
    width = '120px',
    height = '45px',
    shadow = 'none',
    isLoading = false,
    icon = undefined,
    ...rest
}: IProps & ButtonProps) {
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
        {...rest}
    >
        { icon && (
          <>
            {icon}
            <Box width={'20px'} />
          </>
        ) }
        
        {text}
    </ChakraButton>
  )
}

export default CustomButton