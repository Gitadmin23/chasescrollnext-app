import CustomText from '@/components/general/Text';
import { CalendarIcon, HomeIcon, MessageIcon, ProfileIcon2, SearchIcon, UsersIcon } from '@/components/svg';
import { useDetails } from '@/global-state/useUserDetails';
import { Box, Flex, HStack, Link, VStack } from '@chakra-ui/react'; 
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react'
import { FiHome, FiSearch, FiCalendar, FiMessageCircle, FiUsers, FiUser, FiPower } from 'react-icons/fi';

type IRoute = {
    icon: any;
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
        <Link href={route} style={{ width: '100%', textDecoration: "none" }}  >
            <Flex paddingX={['20px', '40px']} gap={"4"} _hover={{backgroundColor: "#F8FAFC"}} color={active ? 'brand.chasescrollBlue' : 'grey'} width='100%' height='70px' alignItems={'center'}>
                {icon}
                <CustomText fontFamily={'DM-Bold'} fontSize={'16px'}>{text}</CustomText>
            </Flex>
        </Link>
    )
}

function Sidebar() { 
    const pathname = usePathname();
    const { userId: user_index } = useDetails((state) => state);

    const routes: IRoute[] = [
        {
            route: '/dashboard/home',
            icon: <HomeIcon />,
            text: 'Home'
        },
        {
            route: '/dashboard/explore',
            icon: <SearchIcon />,
            text: 'Explore'
        },
        {
            route: '/dashboard/event',
            icon: <CalendarIcon />,
            text: 'Event'
        },
        {
            route: '/dashboard/chats',
            icon: <MessageIcon />,
            text: 'Chats'
        },
        {
            route: '/dashboard/community',
            icon: <UsersIcon />,
            text: 'Community'
        },
        {
            route: '/dashboard/profile/' + user_index,
            icon: <ProfileIcon2 />,
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
            <Flex paddingX={['20px', '40px']} gap={"4"} flex={0.2} width='100%' alignItems={"center"} mt={"30px"}  height='70px'>
                <FiPower fontSize='25px' color="grey"  />
                <CustomText fontFamily={'DM-Bold'} fontSize={'16px'} color='grey' >Logout</CustomText>
            </Flex>
        </VStack>

    )
}

export default Sidebar
