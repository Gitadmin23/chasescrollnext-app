import { CustomInput } from '@/components/Form/CustomInput'
import CustomButton from '@/components/general/Button'
import httpService, { unsecureHttpService } from '@/utils/httpService';
import { signInTemporaryValidation } from '@/services/validations';
import { Flex, Image, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useMutation } from 'react-query';
import { useForm } from '@/hooks/useForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { useShareState } from '../../state';
import { useDetails } from '@/global-state/useUserDetails'; 

export default function Temporarylogin() {

  const toast = useToast()

  const { type, typeID, setAll: seType } = useShareState((state) => state);
  const { setAll } = useDetails((state) => state);
  const router = useRouter()
  const query = useSearchParams();


  React.useEffect(() => {
    const type = query?.get('type');
    const typeID = query?.get('typeID');

    if (type && typeID) {
      seType({ type, typeID });
    }
  }, [query, seType, setAll])

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => unsecureHttpService.post(`/auth/temporary-signup`, data),
    onError: (error) => {
      toast({
        title: 'An error occured',
        description: 'Error Occured',
        status: 'error',
        isClosable: true,
        duration: 5000,
        position: 'top-right',
      });
    },
    onSuccess: (data) => {
      toast({
        title: 'Success',
        description: 'Login successful',
        status: 'success',
        isClosable: true,
        duration: 5000,
        position: 'top-right',
      });
      console.log(data?.data?.access_token);

      sessionStorage.setItem('tp_token', data?.data?.access_token);
      sessionStorage.setItem('refresh_token', data?.data?.refresh_token); 
      sessionStorage.setItem('user_id', data?.data?.user_id);
      sessionStorage.setItem('expires_in', data?.data?.expires_in);
      //   setAll({
      //     firstName: data?.data?.firstName,
      //     lastName: data?.data?.firstName,
      //     username: data?.data?.user_name,
      //     userId: data?.data?.user_id,
      //   })
      const typee = sessionStorage.getItem('type');
      const typeIDD = sessionStorage.getItem('typeID');

      router.push(`/event/${typeID}`);
    }
  });

  const { renderForm } = useForm({
    defaultValues: {
      lastName: '',
      firstName: '',
      email: '',
    },
    validationSchema: signInTemporaryValidation,
    submit: (data) => mutate(data)
  });

  return renderForm(
    <Flex w={"full"} h={"100vh"} justifyContent={"center"} alignItems={"center"} >
      <Flex w={"400px"} flexDir={"column"} alignItems={"center"} gap={"4"} >
        <Image src='/assets/images/chasescroll-logo.png' width={50} height={50} alt='chasescroll logo' />
        <Text textAlign={"center"} fontSize={"24"} fontWeight={"700"} color={"#5465E0"} >Fill in your infomation to buy ticket</Text>
        <CustomInput name='firstName' isPassword={false} type='text' placeholder='Enter your First Name' />
        <CustomInput name='lastName' isPassword={false} type='text' placeholder='Enter your Last Name' />
        <CustomInput name='email' isPassword={false} type='text' placeholder='Enter your Email' />
        <CustomButton type='submit' text='Process' isLoading={isLoading} color='white' width='100%' borderRadius='10px' />
      </Flex>
    </Flex>
  )
}
