import React, { ReactNode } from 'react'
import { ButtonProps, Button as ChakraButton, Box} from '@chakra-ui/react'
import { THEME } from '@/theme';

interface IProps {
    type?: 'button' | 'submit';
    text: string;
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
    width?: any;
    fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    height? : string;
    shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
    isLoading?: boolean;
    variant?: 'solid' | 'outline' | 'ghost' | 'link';
    icon?: ReactNode;
    disable?: boolean
}

function CustomButton({
    type = 'button',
    text,
    backgroundColor = "brand.chasescrollButtonBlue",
    color = 'white',
    borderRadius = '12px',
    width = 'full',
    height = '45px',
    shadow = 'none',
    fontSize = "md",
    isLoading = false,
    icon = undefined,
    variant = 'solid',
    disable = false,
    ...rest
}: IProps & ButtonProps) {
  return (
    <ChakraButton
       {...rest}
        isDisabled={isLoading || disable} 
        loadingText='Loading'
        width={width}
        height={height}
        color={color}
        fontSize={fontSize}
        borderRadius={borderRadius}
        type={type}
        isLoading={isLoading}
        shadow={shadow}
        variant={variant}
        bgColor={backgroundColor ? backgroundColor : "brand.chasescrollButtonBlue"}
        _hover={{
          backgroundColor: backgroundColor
        }}
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