"use client";
import React from 'react'
import Image from 'next/image';
import { HStack, Text, VStack, useToast } from '@chakra-ui/react';
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
import EnterEmail from '@/components/forgotpassword/EnterEmail';
import VerifyCode from '@/components/forgotpassword/VerifyCode';
import ResetPassword from '@/components/forgotpassword/ResetPassword';

function ForgotPassword() {
  const [page, setPage] = React.useState(1);

  const switchStage = React.useCallback(() => {
    switch(page) {
      case 1: {
        return (
          <EnterEmail next={(e) => setPage(e)} />
        )
      }
      case 2: {
        return (
          <VerifyCode  next={(e) => setPage(e)} />
        )
      }
      case 3: {
        return (
          <ResetPassword />
        )
      }
    }
  }, [page])
  return (
    <VStack width='100%' height='100vh' bg={"white"} justifyContent={'center'} padding={['20px', '0px']}>

      <Image src='/assets/images/chasescroll-logo.png' width={100} height={100} alt='chasescroll logo' />
        <Text fontSize={["20px", "20px", "32px"]} color={"#1F1F1F"} textAlign={"center"} fontWeight={"700"} >Reset your password</Text>
      {/* <CustomText color='brand.chasescrollBlue' fontSize='xl' marginY='10px'>Reset your password</CustomText> */}

      <VStack maxW={"375px"} w={"full"}>
          {switchStage()}
      </VStack>

    </VStack>
  )
}

export default ForgotPassword