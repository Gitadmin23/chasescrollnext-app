"use client";
import React from 'react'
import Image from 'next/image';
import { Divider, HStack, VStack } from '@chakra-ui/react';
import CustomText from '@/components/general/Text';
import CustomButton from '@/components/general/Button';
import { THEME } from '@/theme';
import Link from 'next/link';

function Login() {
  return (
    <VStack width='100%' height='100vh' justifyContent={'center'}  padding={['20px', '20px', '0px', '0px']}>
      <Image src='/assets/svg/sign-in-illustration.svg' width={250} height={250} alt='chasescroll logo' />

      <CustomText fontFamily={'Satoshi-Medium'} fontSize={'2xl'} marginTop={'20px'} textAlign='center' >Discover fun and unique events in your location.</CustomText>

      <VStack width={['100%', '100%', '20%', '20%']} paddingY='20px'>

        <Link href='/auth/signup' style={{ width: '100%', backgroundColor: THEME.COLORS.chasescrollButtonBlue, borderRadius: '10px' }}>
          <CustomButton text='Sign up' isLoading={false} variant={'solid'} backgroundColor={THEME.COLORS.chasescrollButtonBlue} color='white' borderRadius='10px' width='100%' />
        </Link>

        <HStack width='100%' marginY='20px'>
          <Divider orientation='horizontal' borderWidth={1} borderColor={'black'} />
            <span>or</span>
          <Divider orientation='horizontal' borderWidth={1} borderColor={'black'} />
        </HStack>

        <CustomButton variant={'outline'} text='Continue with Google' isLoading={false} backgroundColor={'#D0D5DD'} borderRadius='10px' borderWidth={'1px'} borderColor={'#D0D5DD'} color='black' width='100%' icon={<Image src='/assets/svg/googlelogo.svg' alt='google logo' width={20} height={20} />} fontFamily={'Satoshi-Regular'} />


        <CustomText fontFamily={'Satoshi-Regular'} fontSize={'sm'} marginTop={'20px'}>Already have an account ? 
          <Link href='/auth/login'>
            <span style={{ color: THEME.COLORS.chasescrollBlue }} > Login</span>
          </Link>
         </CustomText>

        {/* <CustomButton text='Continue with Apple' isLoading={false} backgroundColor={'#D0D5DD'} borderRadius='10px' borderWidth={'1px'} borderColor={'#D0D5DD'} color='black' width='100%' icon={<Image src='/assets/svg/applelogo.svg' alt='google logo' width={20} height={20} />} /> */}

      </VStack>
    </VStack>
  )
}

export default Login