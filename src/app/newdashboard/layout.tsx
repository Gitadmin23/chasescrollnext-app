"use client"
import { useDetails } from '@/global-state/useUserDetails'
import { Box, Flex, HStack, Image, Link, VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { FiSearch, FiCalendar, FiMessageCircle, FiUsers, FiUser } from 'react-icons/fi'
import { IoCalendarOutline, IoSearchOutline } from 'react-icons/io5';
import { SidebarCalendarIcon, SidebarEventIcon, SidebarHomeIcon, SidebarLogoutIcon, SidebarMessageIcon, SidebarNotificationIcon, SidebarProfileIcon, SidebarSearchIcon, SidebarWalletIcon } from '@/components/svg/sidebarIcons';
import { usePathname, useRouter } from 'next/navigation';
import SearchBar from '@/components/explore_component/searchbar';
import CustomButton from '@/components/general/Button';
import getUser from '@/hooks/getUser';
import { signOut } from 'next-auth/react';
import UserImage from '@/components/sharedComponent/userimage';
import CustomText from '@/components/general/Text';
import { HomeIcon, UsersIcon } from '@/components/svg';
import { IMAGE_URL } from '@/services/urls';
import { SearchNormal1, Calendar } from 'iconsax-react';
import useCustomTheme from '@/hooks/useTheme';

export default function Layout({ children }: {
    children: ReactNode
}) {

    type IRoute = {
        icon: ReactNode;
        text: string;
        route: string;
    }

    const { userId, setAll, user: data, } = useDetails((state) => state);

    const routes: IRoute[] = [
        {
            route: '/dashboard/home',
            icon: <SidebarHomeIcon color={true} />,
            text: 'Home'
        },
        {
            route: '/dashboard/explore',
            icon: <SidebarSearchIcon />,
            text: 'Explore'
        },
        {
            route: '/dashboard/event',
            icon: <SidebarCalendarIcon />,
            text: 'Events'
        },
        {
            route: '/dashboard/report',
            icon: <SidebarMessageIcon />,
            text: 'Dashboard'
        },
        {
            route: '/dashboard/chats',
            icon: <SidebarEventIcon />,
            text: 'Chats'
        },
        {
            route: '/dashboard/community',
            icon: <SidebarNotificationIcon />,
            text: 'Community'
        },
        {
            route: `/dashboard/profile/${userId}`,
            icon: <SidebarProfileIcon />,
            text: 'Community'
        },
        {
            route: `/dashboard/profile/${userId}`,
            icon: <SidebarWalletIcon />,
            text: 'Profile'
        }
    ];

    const { user } = getUser()

    const router = useRouter()
    const pathname = usePathname()

    const { bodyTextColor, primaryColor,secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();

    const logout = async () => {
        setAll({ userId: '', dob: '', email: '', username: '', firstName: '', lastName: '', publicProfile: '' });
        localStorage.clear();
        await signOut();
    }


    const Id = localStorage.getItem('user_id');

    React.useEffect(() => {
        if (Id === null) {
            router.push('/auth')
        } else {
            setAll({ userId: Id });
        }
    }, [Id]);

    return (
        <Flex w={"full"} h={"100vh"} bg={"white"} >
            <Flex w={"fit-content"} h={"screen"} display={["none", "none", "none", "none", "flex"]} > 
                <Flex w={"110px"} h={"screen"} flexDir={"column"} py={"4"} alignItems={"center"} borderRightColor={"#CCCCCC"} borderRightWidth={"1px"} >
                    <Image alt='logo' src='/images/logo.png' w={"50px"} />
                    <Flex flexDir={"column"} alignItems={"center"} mt={"auto"} gap={"3"} >
                        {routes?.map((item, index) => (
                            <Flex key={index} w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                                {item?.icon}
                            </Flex>
                        ))}

                        <Flex mt={"6"} flexDir={"column"} alignItems={"center"} >
                            <Flex w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                                <UserImage size={"36px"} border={"1px"} font={"16px"} data={data} image={user?.data?.imgMain?.value} />
                            </Flex>

                            <Flex w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                                <SidebarLogoutIcon />
                            </Flex>
                        </Flex>

                    </Flex>
                </Flex>
            </Flex>
            <Flex w={"full"} height={"100vh"} pos={"relative"} flexDirection={"column"} >
                <Flex w={"full"} h={"76px"} borderBottomColor={"#CCCCCC"} borderBottomWidth={"1px"} alignItems={"center"} px={"6"} justifyContent={"space-between"}  >
                    {(pathname !== "/dashboard/event/my_event" && pathname !== "/dashboard/event/past_event" && pathname !== "/dashboard/event/saved_event" && pathname !== "/dashboard/event/draft") && (
                        <Box display={["none", "none", "block"]} >
                            <SearchBar home={true} />
                        </Box>
                    )}
                    <CustomButton width={"180px"} text={"Create Event"} borderRadius={"full"} />
                </Flex>
                <Flex w={"full"} h={"100vh"} pb={["70px", "70px", "70px", "70px", "0px"]} pos={"absolute"} top={"0px"} insetX={"0px"} pt={"76px"} >
                    {children}
                </Flex>
            </Flex>

            <HStack paddingX='20px' zIndex={"100"} position={"fixed"} bottom={"0px"} justifyContent={'space-evenly'} width='100%' height='70px' bg={mainBackgroundColor} borderTopWidth={1} borderTopColor={borderColor} display={['flex', 'flex', 'flex', 'none']}>
                    <Link href='/dashboard/home'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('home') ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('home') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                            <HomeIcon />
                        </VStack>
                    </Link>

                    <Link href='/dashboard/explore'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('explore') ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('explore') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                            <SearchNormal1 size='20px' />
                        </VStack>
                    </Link>

                    <Link href='/dashboard/event'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('event') ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('event') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                            <Calendar size='20px' />
                        </VStack>
                    </Link>

                    <Link href='/dashboard/community'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('community') ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('community') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                            {/* <People size='20px' /> */}
                            <UsersIcon />
                        </VStack>
                    </Link>

                    <Link href={userId ? `/dashboard/profile/${userId}` : ""}>

                    <UserImage size={"40px"} border={"1px"} font={"16px"} data={data} image={user?.data?.imgMain?.value} />
                        {/* <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('profile') ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname?.includes('profile') ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
                            <Box width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                                {user?.data.imgMain.value === null && (
                                    <VStack width={'100%'} height='100%' fontFamily={''} justifyContent={'center'} alignItems={'center'}>
                                        <CustomText fontFamily={'DM-Bold'} fontSize={'10px'} color={bodyTextColor}>{firstName[0]?.toUpperCase()} {lastName[0]?.toUpperCase()}</CustomText>
                                    </VStack>
                                )}
                                {
                                    user?.data.imgMain.value !== null && (
                                        <>
                                            {user?.data.imgMain.value.startsWith('https://') && <Image alt='pic' src={`${user?.data.imgMain.value}`} width={'100%'} height={'100%'} objectFit='cover' />}
                                            {!user?.data.imgMain.value.startsWith('https://') && <Image alt='pic' src={`${IMAGE_URL}${user?.data.imgMain.value}`} width={'100%'} height={'100%'} objectFit='cover' />}
                                        </>
                                    )
                                }
                            </Box>
                        </VStack> */}
                    </Link>
                </HStack>
        </Flex>
    )
}
