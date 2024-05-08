import { InputElementProps } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { InputGroup, Input, InputRightElement, VStack } from '@chakra-ui/react'
import CustomText from '../general/Text';

interface IProps {
  isPassword: boolean;
  name: string;
  type: 'text' | 'phone' | 'email' | 'date' | 'password'
  placeholder: string,
  disable?: boolean
  value?: any,
  ref?: any,
  hint?: null | string;
}


export const CustomInput = ({ isPassword = false, name, type, placeholder, disable, value, ref, hint = null }: IProps) => {
  const { register, formState: { errors }, setValue } = useFormContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const [newValue, setNewValue] = React.useState(value);

  const handleChangeName = (e: any) => {
    const value = e.target.value; 

    // Regex pattern to only allow letters
    const regex = /^[a-zA-Z]*$/;
    if (regex.test(value)) {
      setValue(name, value); 
      setNewValue(value)            
    }
  }; 


  return (
    <VStack alignItems={'flex-start'} width='100%'>
      <InputGroup>
        {isPassword && (
          <InputRightElement>
            {isPassword && (
              <div
                className="absolute right-2 top-2 cursor-pointer text-chasescrollTextGrey opacity-70 pt-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            )}
          </InputRightElement>
        )}
        {name === "firstName" || name === "lastName" ?
          <Input
            width={'100%'} 
            onChange={handleChangeName}
            placeholder={placeholder}
            height={"45px"}
            data-date="DD MMMM YYYY"
            lang='pt_BR'
            value={newValue}
            disabled={disable}
            fontFamily={'Satoshi-Light'}
            // value={value? value: ""}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
          /> :
          <Input
            width={'100%'}
            {...register(name, {
              required: true,
              pattern: /^[A-Za-z]+$/i
            })}
            placeholder={placeholder}
            height={"45px"}
            data-date="DD MMMM YYYY"
            lang='pt_BR'
            disabled={disable}
            fontFamily={'Satoshi-Light'}
            // value={value? value: ""}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
          />
        }
      </InputGroup>
      {hint && <small>{hint}</small>}
      {errors[name] && <CustomText textAlign={'left'} color='red' fontSize={'sm'}>{errors[name]?.message as string}</CustomText>}
    </VStack>
  )
}