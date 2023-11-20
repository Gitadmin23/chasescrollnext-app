"use client";
import React from 'react'
import { Box, Divider, HStack, VStack, Image, useToast, Button, Flex, Input } from '@chakra-ui/react';
import CustomText from '@/components/general/Text';
import CustomButton from '@/components/general/Button';
import { THEME } from '@/theme';
import Link from 'next/link';
import { useForm } from '@/hooks/useForm';
import { signInValidation } from '@/services/validations';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDetails } from '@/global-state/useUserDetails';
import { useMutation, useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';
import { CustomInput } from '@/components/Form/CustomInput';
import { signIn, useSession } from 'next-auth/react'
import { Session,  } from 'next-auth';
import { useShareState } from '../../state';



const LINK2 = [
  { name: 'Sign up', link: '/auth/signup', isExternal: false },
  { name: 'About Us', link: 'https://chasescroll.com/about', isExternal: true },
  { name: 'Events', link: 'https://chasescroll.com', isExternal: true },
  { name: 'Community', link: 'https://chasescroll.com', isExternal: true },
  { name: 'Terms and condition', link: 'https://chasescroll.com/terms', isExternal: true },
  { name: 'Help', link: 'https://chasescroll.com', isExternal: true },
]

const exclude = ['Events', 'Sign up', 'Community', 'Sign up']


function LoginPage() {
  const [showModal, setShowModal] = React.useState(false)
  const [Loading, setLoading] = React.useState(false)
  const [FirstName, setFirstName] = React.useState("")
  const [CheckUsername, setCheckUsername] = React.useState("")
  const [LastName, setLastName] = React.useState("")
  const [UserName, setUserName] = React.useState("") 
  const [checkData, setCheckData] = React.useState<any>({})


  const toast = useToast();
  const router = useRouter();
  const { setAll } = useDetails((state) => state);
  const { data: sessionData, update } = useSession();
  const { type, typeID, setAll: seType } = useShareState((state) => state);
  const query = useSearchParams();

  const handleSignIn = async (event: any) => {
    if (sessionData !== null) {
        const id: string = (sessionData as any)['idToken'];
        signinWithGoogle.mutate(id);
    } else {
        const result = await signIn('google'); // 'google' corresponds to the provider name in your NextAuth configuration
    }
  };

  React.useEffect(() => {
    const type = query?.get('type');
    const typeID = query?.get('typeID');

    if (type && typeID) {
      seType({ type, typeID });
    }
  }, [query, seType, setAll])

  const signinWithGoogle = useMutation({
    mutationFn: (data: string) => httpService.get(`${URLS.SIGN_IN_WTIH_CREDENTIALS}`, {
      headers: {
        Authorization: `Bearer ${data}`,
      }
    }),
    onSuccess: (data) => {
      console.log(data.data);
      localStorage.setItem('token', data?.data?.access_token);
      toast({
        title: 'Success',
        description: 'Signin Successful',
        status: 'success',
      })
      if(!data?.data?.firstName){ 
        setShowModal(true)
      }  
      setCheckData(data?.data)
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        title: 'Erroor',
        description: error,
        status: 'error',
      })
    }
  })

  React.useEffect(() => {
    if(checkData?.user_id){
      if(!checkData?.firstName){
        setShowModal(true)
      } else { 
        localStorage.setItem('token', checkData.access_token);
        localStorage.setItem('refresh_token', checkData.refresh_token);
        localStorage.setItem('user_id', checkData.user_id);
        localStorage.setItem('expires_in', checkData.expires_in);
      setAll({
        firstName: checkData.firstName,
        lastName: checkData.firstName,
        username: checkData.user_name,
        userId: checkData.user_id,
      })
      router.push('/share');
      }
    }
  }, [checkData, router, setAll]);

  const checkUserName = useQuery(['username'+UserName], () => httpService.get('/auth/username-check?username='+UserName), {
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data,
        status: 'error',
      })
    }, 
    onSuccess: (data) => { 
      console.log(data?.data?.message); 
      if(data?.data?.message === "Username already exists."){
        setCheckUsername(data?.data?.message)
      } else {
        setCheckUsername("")
      }
    }
  })  

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
    onSuccess: (data) => {
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
      const typee = sessionStorage.getItem('type');
      const typeIDD = sessionStorage.getItem('typeID');
      router.push(`/share?type=${type}&typeID=${typeID}`);
    }
  });

  const clickHandler =async()=> {
    setLoading(true); 
    if(!FirstName){
      toast({
        title: 'Erroor',
        description: 'Enter firstname',
        status: 'error',
      })
    } else if(!LastName) {
      toast({
        title: 'Erroor',
        description: 'Enter lastname',
        status: 'error',
      })
    } else if(!UserName) {
      toast({
        title: 'Erroor',
        description: 'Enter username',
        status: 'error',
      })
    } else {  
        const response = await httpService.put(`/user/update-profile`, {
          firstName: FirstName,
          lastName: LastName,
          username: UserName,
        }) 
        if (response) { 
          toast({
            title: 'Success',
            description: 'Update successful',
            status: 'success',
          })
          localStorage.setItem('firstName', FirstName);

          let newObj = {...checkData, firstName: FirstName}

          localStorage.setItem('token', checkData.access_token);
          localStorage.setItem('refresh_token', checkData.refresh_token);
          localStorage.setItem('user_id', checkData.user_id);
          localStorage.setItem('expires_in', checkData.expires_in);
          setAll({
            firstName: checkData.firstName,
            lastName: checkData.firstName,
            username: checkData.user_name,
            userId: checkData.user_id,
          })
          router.push(`/share?type=${type}&typeID=${typeID}`);
          // navigate("/explore")
        } else {
          toast({
            title: 'Erroor',
            description: 'Something wetn wrong',
            status: 'error',
          })
        } 

    }
    setLoading(false);
  } 

  const { renderForm } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validationSchema: signInValidation,
    submit: (data) => mutate(data)
  });
  return renderForm(
    <VStack width='100%' height='100vh' overflow={'hidden'} alignItems={'flex-start'} justifyContent={['flex-start','center']} bg='white' paddingX={['0px', '150px',]} spacing={0} position={'relative'}>


      <Box width={'100%'} height={'100%'} flex='1' overflowX={'hidden'} overflowY={'auto'} padding={['10px', '0px']}>

        <HStack flex='1' width={'100%'} height='100%' justifyContent={'center'}>

          <Flex direction={['column']} alignItems={'center'} justifyContent={'center'} width={['100%', '80%']} height={'100%'}>

            {/* LEFT SECTIOON */}
            {/* <VStack flex='1' paddingTop={['30px', '0px']} width={['100%', '50%']} height={['100%']} alignItems={'center'} justifyContent={'center'} spacing={0}>
              <Image src='/assets/svg/sign-in-illustration.svg' width={407} height={338} alt='chasescroll logo' />
              <CustomText marginTop={'20px'} textAlign={'center'} width={['100%','60%']} fontSize={'28px'} color="#163AB7" fontFamily={'DM-Bold'} fontWeight={'400'}>Your Well tailored virtual Community.</CustomText>
              <CustomText textAlign={'center'} width={['100%','60%']} fontFamily={'DM-Regular'} fontSize={'24px'}>An efficient ecosystem for event management.</CustomText>

              <HStack height={'50px'} overflow={'hidden'} width='70%' marginTop={'20px'}>

                <Box flex='1' width='131px' height={'100%'}>
                  <Image alt='google-btn' src="/assets/images/play-store.png" width='100%' height={'100%'} objectFit={'contain'} />
                </Box>

                <Box flex='1' width='131px' height={'100%'}>
                  <Image alt='google-btn' src="/assets/images/apple-store.png" width='100%' height={'100%'} objectFit={'contain'} />
                </Box>

              </HStack>
            </VStack> */}

            {/* RIGHT SECTION */}
            <VStack flex='0.5' paddingBottom={['30px', '0px']} width={['100%', '50%']} marginTop={['30px', '0px']} height={['100%']} justifyContent={'center'} alignItems={'center'} spacing={6}>

              <VStack width={['100%','463px']} height='374px' borderWidth={'0.2px'} borderRadius={'24px 0px 24px 24px'} borderColor={'grey'} paddingTop={'30px'} paddingX='20px'>
                <CustomText fontSize={'44px'} fontFamily={'DM-Bold'} fontWeight={'700'} color='#163AB7'>Chasescroll</CustomText>

                <CustomInput name='username' isPassword={false} type='text' placeholder='Enter your username' />
                <CustomInput name='password' isPassword type='password' placeholder='Enter your password' />

                <HStack justifyContent={'space-between'} spacing={0} width='100%' marginY='20px'>
                  <Link href='/auth/forgotpassword'>
                    <CustomText color='brand.chasescrollBlue' fontSize={'sm'} fontFamily={'Satoshi-Regular'} textAlign={'left'}>
                      {/* Forgot password ? */}
                    </CustomText>
                  </Link>

                  <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'}>
                    Dont have an account ?
                    <Link href='/share/auth/signup'>
                      <span style={{ color: THEME.COLORS.chasescrollBlue }}> Sign up</span>
                    </Link>
                  </CustomText>
                </HStack>

                <CustomButton type='submit' text='Login' isLoading={isLoading} color='white' width='100%' borderRadius='10px' />

              </VStack>

              <Button onClick={handleSignIn} width={['100%', '294px']}  height={'40px'} borderRadius={'8px'} bg='#1018280D' padding='8px 16px 8px 16px'>
                <Image alt='google' src='/assets/svg/googlelogo.svg' />
                <CustomText marginLeft={'20px'} fontFamily={'DM-Medium'} fontSize={'16px'} color='black' fontWeight={'700'}>Sign in with Google</CustomText>
              </Button>

              <CustomText fontFamily={'DM-Medium'} color='grey' textAlign={'center'} fontSize={'16px'}>Create a page for events, Community and Business.</CustomText>

            </VStack>

          </Flex>

        </HStack>

      </Box>

      <HStack display={['none', 'flex']} width={'100%'} height={'100px'} borderTop={'1px'} borderTopColor={'lightgrey'} alignItems={'center'} justifyContent={'center'}>
        {LINK2.map((item, index) => {
          if (item.isExternal) {
            return (
              <CustomText fontFamily={'DM-Regular'} fontSize={'16px'} marginX={'10px'} display={{ sm: exclude.includes(item.name) ? 'none':'inline', lg: 'inline'}} key={index.toString()}>
                <a key={index.toString()} href={item.link}>{item.name}</a>
              </CustomText>
            )
          } else {
            return (
              <CustomText display={{ sm: exclude.includes(item.name) ? 'none':'inline', lg: 'inline-block'}} fontFamily={'DM-Regular'} fontSize={'16px'} marginX={'10px'} key={index.toString()}>
                <Link href={`/${item.link}`} key={index.toString()}>
                  {item.name}
                </Link>
              </CustomText>
            )
          }
        })}
      </HStack>

      <HStack display={['flex', 'none']} width={'100%'} height={'100px'} borderTop={'1px'} borderTopColor={'lightgrey'} alignItems={'center'} justifyContent={'center'}>
        {LINK2.filter((item) => !exclude.includes(item.name)).map((item, index) => {
          if (item.isExternal) {
            return (
              <CustomText fontFamily={'DM-Regular'} fontSize={'16px'} marginX={'10px'} display={{ sm: exclude.includes(item.name) ? 'none':'inline', lg: 'inline'}} key={index.toString()}>
                <a key={index.toString()} href={item.link}>{item.name}</a>
              </CustomText>
            )
          } else {
            return (
              <CustomText display={{ sm: exclude.includes(item.name) ? 'none':'inline', lg: 'inline-block'}} fontFamily={'DM-Regular'} fontSize={'16px'} marginX={'10px'} key={index.toString()}>
                <Link href={`/${item.link}`} key={index.toString()}>
                  {item.name}
                </Link>
              </CustomText>
            )
          }
        })}
      </HStack>
      {
        showModal && (
          <Box position={'absolute'} width='100%' height={'100vh'} bg='#0000007f' bottom='0px' left={'0px'} justifyContent={'center'} alignItems={'center'}>

            <div className=" w-[500px] bg-white rounded-lg " >
              <div className=" w-full bg-white rounded-lg flex flex-col gap-4 px-6 py-5" >
                <p className=" font-semibold text-xl " >Add User Information To Continue</p>
                <div className=" w-full flex flex-col gap-2 mt-6 " >
                  <p>First Name</p>
                  <Input onChange={(e)=> setFirstName(e?.target?.value)} />
                </div>
                <div className=" w-full flex flex-col gap-2  " >
                  <p>Last Name</p>
                  <Input onChange={(e)=> setLastName(e?.target?.value)} />
                </div>
                <div className=" w-full flex flex-col gap-2  " >
                  <p>Username</p>
                  <Input onChange={(e)=> setUserName(e?.target?.value)} />
                  {CheckUsername && 
                    <p className=" text-sm text-chasescrollRed -mt-1 " >{CheckUsername}</p>
                  }
                </div>
                <button disabled={(!FirstName || !LastName || UserName?.length < 3 || CheckUsername) ? true : false} onClick={()=> clickHandler()} className=" w-full h-[45px] bg-chasescrollBlue text-white disabled:opacity-25 rounded-md mt-6 font-semibold " >{Loading ? "Loading..." : "Update Information"}</button>
              </div>
            </div>

          </Box>
        )
      }
    </VStack>
  )
}

export default LoginPage