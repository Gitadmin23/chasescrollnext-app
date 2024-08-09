"use client";
import React from 'react'
import Image from 'next/image';
import { HStack, VStack, useToast, PinInput, PinInputField } from '@chakra-ui/react';
import CustomText from '@/components/general/Text';
import CustomButton from '@/components/general/Button';
import { useMutation } from 'react-query';
import httpService, { unsecureHttpService } from '@/utils/httpService';
import { URLS } from '@/services/urls'
import { useRouter, useSearchParams } from 'next/navigation'

function VerifyAccount() {
    const [code, setCode] = React.useState('');
    const router = useRouter();
    const search = useSearchParams();

    const email = search?.get('email');

    console.log(email);

    const sendVerificatinEmail = useMutation({
        mutationFn: (data: string) => unsecureHttpService.post(`${URLS.SEND_VERIFICATION_EMAIL}`, {
          userEmail: data,
          emailType: 1,
        }),
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
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'A verification code has been sent to your email',
            status: 'success',
            isClosable: true,
            duration: 5000,
            position: 'top-right',
        });
        }
      });


    const toast = useToast();
    const { mutate: verifyToken, isLoading: loadingVerify } = useMutation({
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
            router.push('/auth');
        }
    });

    const hanldeSubmit = React.useCallback(() => {
        verifyToken({ token: code })
    }, [code, verifyToken])

  return (
    <VStack width='100%' height='100vh' justifyContent={'center'} padding={['20px', '0px']}>
      <Image src='/assets/images/chasescroll-logo.png' width={100} height={100} alt='chasescroll logo' />
      <CustomText color='brand.chasescrollBlue' fontSize='xl' marginY='10px'>Verify Email</CustomText>

      <VStack width={['100%', '100%', '25%', '25%']}>
            <CustomText fontSize={'md'} fontFamily={'Satoshi-Regular'} textAlign={'center'}>
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

            <CustomButton onClick={hanldeSubmit} type='button' text='Verify Code' isLoading={loadingVerify} color='white' width='100%' borderRadius='10px' />

            { sendVerificatinEmail.isLoading && <CustomText textAlign={'center'}>Sending...</CustomText> }
            { !sendVerificatinEmail.isLoading && <CustomText color='brand.chasescrollButtonBlue' cursor={'pointer'} textAlign={'center'} fontFamily={'Satoshi-Regular'} fontSize={'18px'} onClick={() => sendVerificatinEmail.mutate(email as string)}>Resend Code</CustomText>}
      </VStack>
    </VStack>
  )
}

export default VerifyAccount;