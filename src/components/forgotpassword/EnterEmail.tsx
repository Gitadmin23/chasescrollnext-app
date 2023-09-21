import { useForm } from '@/hooks/useForm'
import { forgotPasswordEmailValidation } from '@/services/validations';
import { VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { CustomInput } from '../Form/CustomInput';
import CustomButton from '../general/Button';
import { useMutation } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';

function EnterEmail({ next }: {
    next: (page: number) => void
}) {
    const toast = useToast();
    const { isLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpService.post(`${URLS.SEND_VERIFICATION_EMAIL}`, data),
        onSuccess: (data) => {
            toast({
                title: 'Code Sent!',
                description: 'A six digit verification code has been sent to your email',
                status: 'success',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            });
            next(2);
        },
        onError: (error: any) => {
            console.log(error);
            toast({
                title: 'An error occured',
                description: error.response.data.error,
                status: 'error',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            });
        }
    });
    const { renderForm } = useForm({
        defaultValues: {
            email: '',
        },
        validationSchema: forgotPasswordEmailValidation,
        submit: (data) => {
            console.log(data);
            mutate({ userEmail: data.email, emailType: 2 });
        },
    });
  return renderForm(
    <VStack width='100%'>
        <CustomInput name='email' isPassword={false} type='text' placeholder='Enter your email' />
        <CustomButton type='submit' text='Send code' isLoading={isLoading} color='white' width='100%' borderRadius='10px' />
    </VStack>   
  )
}

export default EnterEmail