"use client";
import React from 'react'
import Image from 'next/image';
import { HStack, VStack, useToast, PinInput, PinInputField } from '@chakra-ui/react';
import CustomText from '@/components/general/Text';
import CustomButton from '@/components/general/Button';
import { useMutation } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls'
import { useRouter } from 'next/navigation';

function VerifyCode({ next }: {
    next: (page: number) => void
}) {
    const [code, setCode] = React.useState('');

    const router = useRouter();

    const toast = useToast();
    const { mutate, isLoading } = useMutation({
        mutationFn: (data: { token: string }) => httpService.post(`${URLS.VERIFY_TOKEN}`, data),
        onError: (error: any) => {
            toast({
                title: 'An error occured',
                description: error.response.data.statusDescription,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess:(data) => {
            toast({
                title: 'Success',
                description: 'verification successful',
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            router.replace('/auth/forgotpassword?token=' + code);
           next(3);
        }
    });

    const hanldeSubmit = React.useCallback(() => {
        mutate({ token: code })
    }, [code, mutate])

  return (
    <VStack width='100%'>
      <CustomText fontSize={'md'} fontFamily={'Rubik-Regular'} textAlign={'center'}>
                A six digits code has been sent to your email for verification.
            </CustomText>

            <HStack marginY='20px'>
                <PinInput size='lg' otp value={code} onChange={(e) => setCode(e)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </HStack>

            <CustomButton onClick={hanldeSubmit} type='button' text='Verify Code' isLoading={isLoading} color='white' width='100%' borderRadius='10px' />
    </VStack>
  )
}

export default VerifyCode;