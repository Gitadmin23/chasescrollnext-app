import React, { ReactNode } from 'react'
import { ButtonProps, Button as ChakraButton, Box} from '@chakra-ui/react'
import { THEME } from '@/theme';

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
    variant?: 'solid' | 'outline' | 'ghost' | 'link';
    icon?: ReactNode;
}

function CustomButton({
    type = 'button',
    text,
    backgroundColor = THEME.COLORS.chasescrollButtonBlue,
    color = 'white',
    borderRadius = '20px',
    width = '120px',
    height = '45px',
    shadow = 'none',
    isLoading = false,
    icon = undefined,
    variant = 'solid',
    ...rest
}: IProps & ButtonProps) {
  return (
    <ChakraButton
      //  {...rest}
        width={width}
        height={height}
        color={color}
        borderRadius={borderRadius}
        type={type}
        isLoading={isLoading}
        shadow={shadow}
        variant={variant}
        backgroundColor={backgroundColor}
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