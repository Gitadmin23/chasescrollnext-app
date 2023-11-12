"use client";
import React from 'react'
import Image from 'next/image';
import { HStack, VStack, useToast } from '@chakra-ui/react';
import CustomText from '@/components/general/Text';
import { useForm } from '@/hooks/useForm';
import { resetValidation, signInValidation } from '@/services/validations';
import { CustomInput } from '@/components/Form/CustomInput';
import { THEME } from '@/theme';
import CustomButton from '@/components/general/Button';
import { useMutation } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls'
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'

function ResetPassword() {
    const toast = useToast();
    const params = useSearchParams();
    const router = useRouter()

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: any) => httpService.put(`${URLS.RESET_PASSWORD}`, data),
        onError: (error: any) => {
            toast({
                title: 'An error occured',
                description: error.response.data.error,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess:(data) => {
            toast({
                title: 'Success',
                description: 'Password reset successful',
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            router.push('/auth/login');
        }
    });
    const { renderForm } = useForm({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: resetValidation,
        submit: (data) => {
            const token = params?.get('token');
            mutate({ password: data.password, token });
        }
    });
  return renderForm(
      <VStack width='100%'>
            <CustomInput name='password' isPassword type='password' placeholder='Enter your password' />
            <CustomInput name='confirmPassword' isPassword type='password' placeholder='Confirm password' />


            <CustomButton type='submit' text='Reset password' isLoading={isLoading} color='white' width='100%' borderRadius='10px' />
      </VStack>
  )
}

export default ResetPassword