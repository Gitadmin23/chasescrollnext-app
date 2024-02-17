"use client";
import React from 'react'
// import Image from 'next/image';
import { Button, Checkbox, HStack, VStack, useToast, Image } from '@chakra-ui/react';
import CustomText from '@/components/general/Text';
import { useForm } from '@/hooks/useForm';
import { signInValidation, signUpValidation } from '@/services/validations';
import { CustomInput } from '@/components/Form/CustomInput';
import { THEME } from '@/theme';
import CustomButton from '@/components/general/Button';
import { useMutation } from 'react-query';
import httpService, { unsecureHttpService } from '@/utils/httpService';
import { URLS } from '@/services/urls'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { TbBorderRadius } from 'react-icons/tb';
import { signIn, useSession } from 'next-auth/react';
import httpServiceGoogle from '@/utils/httpServiceGoogle';
import { useDetails } from '@/global-state/useUserDetails';

function Signup() {
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');  
    const [checkData, setCheckData] = React.useState<any>({});
    const [showModal, setShowModal] = React.useState(false);

    const router = useRouter();
    const [terms, setTerms] = React.useState(false);
    const toast = useToast();
    const { data: sessionData, update } = useSession();
    const { setAll } = useDetails((state) => state);


    React.useEffect(() => {
      const token: any = sessionData;
      console.log(token?.token);
      if (sessionData !== null) {
        if (token.token?.token?.token?.idToken) {
          signinWithGoogle.mutate(token?.token?.token?.token?.idToken);
        }
      }
  
    }, [sessionData])
  
    const handleGoogleSignIn = async () => {
      const token: any = sessionData;
      if (token && token.token?.token.token.idToken) {
        //console.log(token)
        setEmail(token?.token?.token?.token?.email);
        signinWithGoogle.mutate(token.token?.token.token.idToken);
      } else {
        const dets = await signIn('google');
        setCheckData(true);
      }
    }

    const signinWithGoogle = useMutation({
      mutationFn: (data: string) => httpServiceGoogle.get(`${URLS.SIGN_IN_WTIH_CREDENTIALS}`, {
        headers: {
          Authorization: `Bearer ${data}`,
        }
      }),
      onSuccess: (data) => {
        //console.log(data.data);
        localStorage.setItem('token', data?.data?.access_token);
        toast({
          title: 'Success',
          description: 'Signup Successful',
          status: 'success',
          position: 'top-right'
        })
        if (!data?.data?.firstName) {
          setShowModal(true)
        } else {
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
          sendVerificatinEmail.mutate(email);
          // router.push('/dashboard/home')
        }
        setCheckData(data?.data)
      },
      onError: (error: any) => {
        //console.log(error);
        toast({
          title: 'Erroor',
          description: 'An error occured, please try again',
          status: 'error',
        })
      }
    })

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
      router.push('/auth/verify-account?email=' + email);
      }
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => unsecureHttpService.post(`${URLS.SIGNUP}`, data),
        onError: (error: any) => {
          toast({
            title: 'An error occured',
            description: error.response.data,
            status: 'error',
            isClosable: true,
            duration: 5000,
            position: 'top-right',
        });
        },
        onSuccess:(data) => { 
          router.push('/auth/verify-account');
            // sendVerificatinEmail.mutate(email);
        }
    });
    const { renderForm } = useForm({
        defaultValues: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            dob: '',
            email: '',
            confirmPassword: ''
        },
        validationSchema: signUpValidation,
        submit: (data) => {
          if (!terms) {
            toast({
              title: 'Attention!',
              description: 'You must accept our terms of service to continue',
              status: 'warning',
              isClosable: true,
              duration: 5000,
              position: 'top-right',
          });
          return;
          } 
          if (phone.length < 11) {
            toast({
              title: 'Attention!',
              description: 'You must put in a valid number',
              status: 'warning',
              isClosable: true,
              duration: 5000,
              position: 'top-right',
          });
          return;
          }
          setEmail(data.email);
          //console.log(phone)
          mutate({ ...data, phone });
        }
    });
  return renderForm(
    <VStack width='100%' height='100vh' justifyContent={'center'} padding={['20px', '0px']}>
      <Image src='/assets/images/chasescroll-logo.png' width={100} height={100} alt='chasescroll logo' />
      <CustomText color='brand.chasescrollBlue' fontSize='xl' marginY='10px'>Create An account</CustomText>

      <VStack width={['100%', '100%', '25%', '25%']}>
            <CustomInput name='email' isPassword={false} type='email' placeholder='Enter your email'  />
            <CustomInput name='username' isPassword={false} type='text' placeholder='Enter your username' />
            <CustomInput name='firstName' isPassword={false} type='text' placeholder='Enter your firstname' />
            <CustomInput name='lastName' isPassword={false} type='text' placeholder='Enter your lastname' />
            <CustomInput name='dob' isPassword={false} type='text' placeholder='DD/MM/YYYY (Date of Birth)' />

      
            <PhoneInput
                  withCountryCallingCode
                  defaultCountry='NG'
                  style={{ width: '100%', height: '45px', borderWidth: '1px', borderRadius: '5px', borderColor: 'lightgrey', padding: '10px' }}
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e?.toString() as string)}/>


            <CustomInput name='password' isPassword type='password' placeholder='Enter your password' />
            <CustomInput name='confirmPassword' isPassword={true} type='password' placeholder='Confirm password' />

            <HStack justifyContent={'flex-start'} spacing={6} width='100%' marginY='20px'>
                <Checkbox colorScheme='blue' size='md' isChecked={terms} onChange={() =>setTerms(prev => !prev)} />
             

                <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'} marginLeft='0px'>
                  I accept the
                    <span style={{ color: THEME.COLORS.chasescrollBlue }}> terms of service </span>
                    as well as the <span style={{ color: THEME.COLORS.chasescrollBlue }}> privacy policy </span>
                </CustomText>
            </HStack>

            <CustomButton type='submit' disable={terms === false} variant={'outline'} text='Create Account' isLoading={isLoading || sendVerificatinEmail.isLoading} color='white' width='100%' borderRadius='10px'  backgroundColor={THEME.COLORS.chasescrollButtonBlue} fontFamily={'Satoshi-Regular'} />

            <HStack>
                <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'} marginLeft='0px'>
                  Already have an account ? 
                </CustomText>
                <Link href="/auth">
                  <CustomText color='brand.chasescrollButtonBlue' fontFamily={'Satoshi-Regular'} decoration={'underline'} cursor='pointer'>Log in</CustomText>
                </Link>
            </HStack>

            <CustomText fontFamily={'DM-Medium'} textAlign={'center'}>OR</CustomText>

            <Button onClick={handleGoogleSignIn} width={['100%', '294px']} height={'40px'} borderRadius={'8px'} bg='#1018280D' padding='8px 16px 8px 16px'>
              <Image alt='google' src='/assets/svg/googlelogo.svg' />
              <CustomText marginLeft={'20px'} fontFamily={'DM-Medium'} fontSize={'16px'} color='black' fontWeight={'700'}>Sign in with Google</CustomText>
            </Button>

      </VStack>
    </VStack>
  )
}

export default Signup