"use client";

import { Avatar, Box, Flex, Grid, HStack, VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import Image from 'next/image';
import CustomText from '@/components/general/Text';
import '../globals.css'
// import { BellIcon, HomeIcon, MessageIcon, ProfileIcon2, SearchIcon, UsersIcon } from "../../../public/assets/svg";
import { FiBell, FiPlusSquare, FiMessageCircle, FiHome, FiSearch, FiCalendar, FiUsers, FiPower, FiUser } from 'react-icons/fi';
import { THEME } from '@/theme';
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import ThreadCard from '@/components/home/ThreadCard';
import Sidebar from './sidebar';
import { useDetails } from '@/global-state/useUserDetails';
import { useMutation } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';
const items = [1, 2, 3, 4, 5, 6, 7, 8, 2, 3, 4, 5, 6, 7];
type IRoute = {
    icon: ReactNode;
    text: string;
    route: string;
}

const MenuItem = ({
    icon,
    text,
    active,
    route,
}: {
    icon: any,
    text: string;
    active: boolean;
    route: string;
}) => {
    return (
        <Link href={route} style={{ width: '100%' }}>
            <HStack paddingX={['20px', '40px']} color={active ? 'brand.chasescrollBlue' : 'grey'} width='100%' height='80px' alignItems={'center'}>
                {icon}
                <CustomText fontSize={'18px'}>{text}</CustomText>
            </HStack>
        </Link>
    )
}

function Layout({ children }: {
    children: ReactNode
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { username, lastName, firstName, userId, setAll } = useDetails((state) => state);

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (data: string) => httpService.get(`${URLS.GET_USER_PRIVATE_PROFILE}`),
        onSuccess: (data) => { 
            setAll({
                userId: data?.data?.userId,
                userId: data?.data?.userId,
                firstName: data?.data?.firstName,
                lastName: data?.data?.lastName,
                email: data?.data?.email,
                dob: data?.data?.dob,
                username: data?.data?.username,
            })
        }
    });

    React.useEffect(() => {
        const Id = localStorage.getItem('userId'); 
        
        if (userId === null) {
            router.push('/auth')
        } else {
            mutate(Id as string);
        }
    }, [mutate, router, userId])

    const routes: IRoute[] = [
        {
            route: '/dashboard/home',
            icon: <FiHome fontSize='30px' />,
            text: 'Home'
        },
        {
            route: '/dashboard/explore',
            icon: <FiSearch fontSize='30px' />,
            text: 'Explore'
        },
        {
            route: '/dashboard/event',
            icon: <FiCalendar fontSize='30px' />,
            text: 'Events'
        },
        {
            route: '/dashboard/chats',
            icon: <FiMessageCircle fontSize='30px' />,
            text: 'Chats'
        },
        {
            route: '/dashboard/community',
            icon: <FiUsers fontSize='30px' />,
            text: 'Community'
        },
        {
            route: '/dashboard/profile/fhfhhd',
            icon: <FiUser fontSize='30px' />,
            text: 'Profile'
        }
    ];

    return (

        <Box className='w-full h-screen'>
            <Grid h="100vh" w={"full"} overflowY={"hidden"} >
                <Box width="full" position={"absolute"} zIndex={"30"} top={"0px"} >
                    {/* NAVBAR SECTION */}
                    {!pathname?.includes("create_event") && (
                        <HStack position={"absolute"} zIndex={"30"} top={"0px"} width='100%' height='80px' borderBottomWidth={'1px'} borderBottomColor={'lightgrey'} backgroundColor={'white'} alignItems='center' justifyContent={'space-between'} paddingX={['20px', '40px']}>

                            <HStack justifyContent={'center'}>
                                <Image src='/assets/images/chasescroll-logo.png' width={50} height={50} alt='logo' />
                                <CustomText fontFamily={'Satoshi-Regular'} fontSize='lg' display={['none', 'inline']} color='brand.chasescrollBlue'>Chasescroll</CustomText>
                            </HStack>

                            {/* LARGE SCREEN ICONS */}
                            <HStack display={['none', 'flex']}>
                                <CustomText>{username}</CustomText>

                                <Link href='/dashboard/profile/hdhdsjhahj'>
                                    <Avatar name='Daniel Eanuel' size='md' marginX='10px' />
                                </Link>

                                <Link href='/dashboard/notification'>
                                    <FiBell color={THEME.COLORS.chasescrollBlue} fontSize='30px' />
                                </Link>
                            </HStack>

                            {/* SMALL SCREEN ICONS */}
                            <HStack display={['flex', 'none']}>
                                <Link href="/dashboard/chats">
                                    <FiPlusSquare color={THEME.COLORS.chasescrollBlue} fontSize='30px' />
                                </Link>

                                <Link href='/dashboard/notification'>
                                    <FiBell color={THEME.COLORS.chasescrollBlue} fontSize='30px' marginLeft='10px' marginRight='10px' />
                                </Link>

                                <Link href='/dashboard/chats'>
                                    <FiMessageCircle color={THEME.COLORS.chasescrollBlue} fontSize='30px' />
                                </Link>

                                <Link href={`/dashboard/profile/${userId}`}>
                                    <Avatar name={`${firstName} ${lastName}`} size='md' marginX='10px' />
                                </Link>
                            </HStack>

                        </HStack>
                    )}
                </Box>
                <Flex flex={1} w="full" h="full" pt={!pathname?.includes("create_event") ? "80px": "0px"} pb={["70px", "70px", "0px", "0px"]} overflow={"hidden"} bg={"brand.black"} >
                    {!pathname?.includes("create_event") && (
                        <Box width={"fit-content"} display={['none', 'none', 'none', 'flex']}>
                            <Sidebar />
                        </Box>
                    )}
                    {children}

                
                <Flex flex={1} w="full" h="100%" pt={"80px"} overflowY={"hidden"} bg={"white"} >
                    <Box width={"fit-content"} >
                        <Sidebar />
                    </Box>
                    <Box flex={1}>
                        {children}
                    </Box>
                </Flex>
                {/* BOTTOM TAB */}
                <HStack paddingX='20px' position={"fixed"} bottom={"0px"} justifyContent={'space-evenly'} width='100%' height='70px' bg='white' borderTopWidth={1} borderTopColor={'lightgrey'} display={['flex', 'flex', 'flex', 'none']}>

                    <Link href='/dashboard/home'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname.includes('home') ? 'brand.chasescrollBlue' : 'white'} color={pathname.includes('home') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                            <FiHome size='20px' />
                        </VStack>
                    </Link>

                    <Link href='/dashboard/explore'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname.includes('explore') ? 'brand.chasescrollBlue' : 'white'} color={pathname.includes('explore') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                            <FiSearch size='20px' />
                        </VStack>
                    </Link>

                    <Link href='/dashboard/event'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname.includes('events') ? 'brand.chasescrollBlue' : 'white'} color={pathname.includes('events') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                            <FiCalendar size='20px' />
                        </VStack>
                    </Link>

                    <Link href='/dashboard/community'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname.includes('community') ? 'brand.chasescrollBlue' : 'white'} color={pathname.includes('community') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                            <FiUsers size='20px' />
                        </VStack>
                    </Link>

                    <Link href='/dashboard/profile/hfhdjd'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname.includes('profile') ? 'brand.chasescrollBlue' : 'white'} color={pathname.includes('profile') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                            <Avatar name='daniel emmanuel' size='sm' />
                        </VStack>
                    </Link>
                </HStack>
            </Grid>
        </Box>
    )
}

export default Layout