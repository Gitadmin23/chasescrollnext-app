"use client";
import React from 'react'
import Image from 'next/image';
import { HStack, VStack, useToast } from '@chakra-ui/react';
import CustomText from '@/components/general/Text';
import { useForm } from '@/hooks/useForm';
import { signInValidation } from '@/services/validations';
import { CustomInput } from '@/components/Form/CustomInput';
import { THEME } from '@/theme';
import CustomButton from '@/components/general/Button';
import { useMutation } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDetails } from '@/global-state/useUserDetails';

function Login() {
    const toast = useToast();
    const router = useRouter();
    const { setAll } = useDetails((state) => state);

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => httpService.post(`${URLS.LOGIN}`, data),
        onError: (error) => {
            toast({
                title: 'An error occured',
                description: 'Invalid email or password',
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess:(data) => {
            toast({
                title: 'Success',
                description: 'Login successful',
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });  
            
            localStorage.setItem('token', data?.data?.access_token);
            localStorage.setItem('refresh_token', data?.data?.refresh_token);
            localStorage.setItem('user_id', data?.data?.user_id);
            localStorage.setItem('expires_in', data?.data?.expires_in);
            setAll({
                firstName: data?.data?.firstName,
                lastName: data?.data?.firstName,
                username: data?.data?.user_name,
                userId: data?.data?.user_id,
            })
            router.push('/dashboard/home')
        }
    });
    const { renderForm } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        validationSchema: signInValidation,
        submit: (data) => mutate(data)
    });
  return renderForm(
    <VStack width='100%' height='100vh' justifyContent={'center'} padding={['20px', '0px']}>
      <Image src='/assets/images/chasescroll-logo.png' width={100} height={100} alt='chasescroll logo' />
      <CustomText color='brand.chasescrollBlue' fontSize='xl' marginY='10px'>Login</CustomText>

      <VStack width={['100%', '100%', '25%', '25%']}>
            <CustomInput name='username' isPassword={false} type='text' placeholder='Enter your username' />
            <CustomInput name='password' isPassword type='password' placeholder='Enter your password' />

            <HStack justifyContent={'space-between'} spacing={0} width='100%' marginY='20px'>
                <Link href='/auth/forgotpassword'>
                    <CustomText color='brand.chasescrollBlue' fontSize={'sm'} fontFamily={'Satoshi-Regular'} textAlign={'left'}>
                        Forgot password ?
                    </CustomText>
                </Link>

                <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'}>
                    Dont have an account ? 
                    <Link href='/auth/signup'>
                        <span style={{ color: THEME.COLORS.chasescrollBlue }}> Sign up</span>
                    </Link>
                </CustomText>
            </HStack>

            <CustomButton type='submit' text='Login' isLoading={isLoading} color='white' width='100%' borderRadius='10px' />
      </VStack>
    </VStack>
  )
}

export default Login