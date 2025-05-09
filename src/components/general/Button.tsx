import React, { ReactNode } from 'react'
import { ButtonProps, Button as ChakraButton, Box } from '@chakra-ui/react' 
import useCustomTheme from '@/hooks/useTheme';

interface IProps {
  type?: 'button' | 'submit';
  text: any;
  backgroundColor?: string | Array<string>;
  color?: string | Array<string>;
  borderRadius?: string;
  width?: any;
  fontSize?: any;
  borderTopRadius?: any;
  borderBottomLeftRadius?: any;
  borderBottomRightRadiusborderBottomRightRadius?: any;
  height?: any;
  shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
  isLoading?: boolean;
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  icon?: ReactNode;
  disable?: boolean
}

function CustomButton({
  type = 'button',
  text,
  backgroundColor,
  color = 'white',
  borderRadius = '12px',
  borderTopRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
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
  
  const { primaryColor } = useCustomTheme()

  return (
    <ChakraButton
      // style={{ backgroundColor: backgroundColor ? backgroundColor?.includes("brand") ? THEME.COLORS[backgroundColor?.replace("brand.", "")] : backgroundColor : "#E5EBF4" }}
      {...rest}
      isDisabled={isLoading || disable}
      loadingText='Loading'
      width={width}
      height={height}
      color={color}
      fontSize={fontSize}
      // borderRadius={borderRadius}
      borderTopRadius={borderTopRadius ? borderTopRadius : borderRadius}
      borderBottomLeftRadius={borderBottomLeftRadius ? borderBottomLeftRadius : borderRadius}
      borderBottomRightRadius={borderBottomRightRadius ? borderBottomRightRadius : borderRadius}
      type={type}
      isLoading={isLoading}
      shadow={shadow}
      variant={variant}
      bgColor={backgroundColor ? backgroundColor : primaryColor}
      _hover={{
        backgroundColor: backgroundColor
      }} 
    >
      {icon && (
        <>
          {icon}
          <Box width={'20px'} />
        </>
      )}
      {text}
    </ChakraButton>
  )
}

export default CustomButton