import CustomText from '@/components/general/Text';
import { HStack, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react'
import { FiHome, FiSearch, FiCalendar, FiMessageCircle, FiUsers, FiUser, FiPower } from 'react-icons/fi';

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
                <CustomText fontFamily={'Satoshi-Medium'} fontSize={'16px'}>{text}</CustomText>
            </HStack>
        </Link>
    )
}

function Sidebar() { 
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
            route: '/dashboard/event',
            icon: <FiCalendar fontSize='30px' />,
            text: 'Event'
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
        <VStack display={['none', 'none', 'flex', 'flex']} width={"300px"} height='100%' paddingBottom={"40px"} bg='white' overflowY={"auto"} borderRightWidth={1} borderRightColor={'lightgrey'}>
            <VStack flex={0.8} width='100%' paddingTop={'40px'}>
                {routes.map((item, index) => (
                    <MenuItem {...item} active={pathname.includes(item.text.toLowerCase()) ? true:false} key={index.toString()} />
                ))}
            </VStack>
            <HStack paddingX={['20px', '40px']} flex={0.2} width='100%'>
                <FiPower fontSize='25px' color="grey"  />
                <CustomText fontFamily={'Satoshi-Medium'} fontSize={'16px'} color='grey' >Logout</CustomText>
            </HStack>
        </VStack>

    )
}

export default Sidebar
