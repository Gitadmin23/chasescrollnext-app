"use client";

import { Avatar, Box, HStack, VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import Image from 'next/image';
import CustomText from '@/components/general/Text';
import '../globals.css'
// import { BellIcon, HomeIcon, MessageIcon, ProfileIcon2, SearchIcon, UsersIcon } from "../../../public/assets/svg";
import { FiBell, FiPlusSquare, FiMessageCircle, FiHome, FiSearch, FiCalendar, FiUsers, FiPower, FiUser } from 'react-icons/fi';
import { THEME } from '@/theme';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import ThreadCard from '@/components/home/ThreadCard';
const items = [1,2,3,4,5,6,7,8,2,3,4,5,6,7];
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
            route: '/dashboard/events',
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
    <VStack width='100%' backgroundColor={'whitesmoke'} spacing={0}>

        {/* NAVBAR SECTION */}
        <HStack width='100%' height='80px' borderBottomWidth={'1px'} borderBottomColor={'lightgrey'} backgroundColor={'white'} alignItems='center' justifyContent={'space-between'} paddingX={['20px', '40px']}>


            <HStack justifyContent={'center'}>
                <Image src='/assets/images/chasescroll-logo.png' width={50} height={50} alt='logo' />
                <CustomText fontFamily={'DM-Regular'} fontSize='lg' display={['none', 'inline']} color='brand.chasescrollBlue'>Chasescroll</CustomText>
            </HStack>
            
            {/* LARGE SCREEN ICONS */}
            <HStack display={['none', 'flex']}>
                <CustomText>DanDolla</CustomText>

                <Link href='/dashboard/profile/hdhdsjhahj'>
                    <Avatar name='Daniel Eanuel' size='md' marginX='10px' />
                </Link>
                
                <Link href='/dashboard/notification'>
                    <FiBell color={THEME.COLORS.chasescrollBlue}fontSize='30px' />
                </Link>
            </HStack>

            {/* SMALL SCREEN ICONS */}
            <HStack display={['flex', 'none']}>
                <Link href="/dashboard/chats">
                    <FiPlusSquare color={THEME.COLORS.chasescrollBlue}fontSize='30px' />
                </Link>

                <Link href='/dashboard/notification'>
                    <FiBell color={THEME.COLORS.chasescrollBlue}fontSize='30px' marginLeft='10px' marginRight='10px' />
                </Link>

                <Link href='/dashboard/chats'>
                    <FiMessageCircle color={THEME.COLORS.chasescrollBlue}fontSize='30px' />
                </Link>

                <Link href='/dashboard/profile/hdhdsjhahj'>
                    <Avatar name='Daniel Eanuel' size='md' marginX='10px' />
                </Link>
            </HStack>
            
        </HStack>

        {/* MAIN SECTION */}

        <HStack flex='1' width='100%' spacing={0} alignItems={'flex-start'} >

            {/* <VStack display={['none', 'flex']} flex='0.3' height='100%' bg='white' borderRightWidth={1} borderRightColor={'lightgrey'}>
                <VStack flex={0.8} width='100%' paddingTop={'40px'}>
                    {routes.map((item, index) => (
                        <MenuItem {...item} active={pathname.includes(item.text.toLowerCase()) ? true:false} key={index.toString()} />
                    ))}
                </VStack>
                <HStack paddingX={['20px', '40px']} flex={0.2} width='100%'>
                    <FiPower fontSize='25px' color="grey"  />
                    <CustomText fontSize={'20px'} color='grey' >Logout</CustomText>
                </HStack>
            </VStack> */}

            <VStack alignItems={'flex-start'} flex={1}  overflow='auto'  >
            { items.map((item, i) => (
                <ThreadCard key={i.toString()} />
            ))}
            </VStack>

        </HStack>

        {/* BOTTOM TAB */}
        <HStack paddingX='20px' justifyContent={'space-evenly'} width='100%' height='70px' bg='white' borderTopWidth={1} borderTopColor={'lightgrey'} display={['flex', 'flex', 'none', 'none']}>

            <Link href='/dashboard/home'>
                <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname.includes('home') ? 'brand.chasescrollBlue' : 'white'} color={pathname.includes('home') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                    <FiHome size='20px'  />
                </VStack>
            </Link>

            <Link href='/dashboard/explore'>
                <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname.includes('explore') ? 'brand.chasescrollBlue' : 'white'} color={pathname.includes('explore') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                    <FiSearch size='20px' />
                </VStack>
            </Link>

            <Link href='/dashboard/events'>
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

    </VStack>
  )
}

export default Layout