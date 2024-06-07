"use client";

import { Avatar, Box, Flex, Grid, HStack, VStack, useToast, Image, Button, Modal, ModalBody, ModalContent, ModalOverlay, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
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
import { useMutation, useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { IMAGE_URL, URLS } from '@/services/urls';
import SearchBar from '@/components/explore_component/searchbar';
import NotificationBar from '@/components/navbar/notification';
import { Notification, Message, AddSquare, SearchNormal1, Calendar, People, Home, LogoutCurve, Warning2 } from 'iconsax-react'
import { HomeIcon, UsersIcon } from '@/components/svg';
import ImageModal from '@/components/general/ImageModal';
import UserImage from '@/components/sharedComponent/userimage';
import { signOut } from 'next-auth/react';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import DashboardNavbar from '@/components/sharedComponent/dashboard_navbar';
import CopyRightText from '@/components/sharedComponent/CopyRightText';
import PageLoader from '@/components/sharedComponent/pageLoader';
import useCustomTheme from "@/hooks/useTheme";
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
    const [id, setId] = React.useState<string | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    const toast = useToast();
    const [showModal, setShowModal] = React.useState(false);

    const { bodyTextColor, primaryColor,secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();

    const { username, lastName, firstName, userId, setAll, user } = useDetails((state) => state);

    const { isLoading } = useQuery(['getDetails', id], () => httpService.get(`${URLS.GET_USER_PRIVATE_PROFILE}`), {
        // enabled: id !== null,
        onSuccess: (data) => {
            setAll({
                user: data?.data,
                userId: data?.data?.userId,
                firstName: data?.data?.firstName,
                lastName: data?.data?.lastName,
                email: data?.data?.email,
                dob: data?.data?.dob,
                username: data?.data?.username,
            });
        },
        onError: (error) => {
            // toast({
            //     title: 'Error',
            //     description: 'An error occured while updating your profile',
            //     status: 'error',
            //     position: 'top-right',
            //     isClosable: true,
            //     duration: 3000,
            // });
            router.push('/auth');
        },
    });
    
    const Id = localStorage.getItem('user_id');

    React.useEffect(() => {
        if (Id === null) {
            router.push('/auth')
        } else {
            setId(Id as string);
            setAll({ userId: Id });
        }
    }, [Id]);


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
            route: '/dashboard/report',
            icon: <FiMessageCircle fontSize='30px' />,
            text: 'Dashboard'
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
            route: `/dashboard/profile/${userId}`,
            icon: <FiUser fontSize='30px' />,
            text: 'Profile'
        }
    ];

    const logout = async () => {
        setAll({ userId: '', dob: '', email: '', username: '', firstName: '', lastName: '', publicProfile: '' });
        localStorage.clear();
        await signOut();
        // router.push('/auth');
    }

    return (
        <Box className='w-full h-screen'>
            {/* MODALS */}
            <ImageModal />
            {/* MODAL */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} isCentered size='sm' closeOnOverlayClick={false} closeOnEsc={false}>
                <ModalOverlay />
                <ModalContent height={'300px'} borderRadius={'30px'}>
                    <ModalBody width={'100%'} height={'100%'} borderRadius={'20px'}>
                        <VStack width={'100%'} height={'100%'} justifyContent={'center'} spacing={6}>
                            <VStack width='60px' height={'60px'} borderRadius={'30px'} justifyContent={'center'} bg='#df26263b'>
                                <Warning2 color='red' size='30px' variant='Outline' />
                            </VStack>
                            <CustomText fontFamily={'DM-Medium'} fontSize={'18px'}>Are you sure you want to logout?</CustomText>
                            <VStack justifyContent={'center'} width={'100%'} spacing={4} height={'120px'} >
                                <Button variant={'outline'} outlineColor={'brand.chasescrollButtonBlue'} borderWidth={'0px'} width='100%' height={'32px'} color='brand.chasescrollButtonBlue' onClick={() => setShowModal(false)} >Cancel</Button>
                                <Button variant={'solid'} bg='red' width='100%' height={'40px'} color='white' onClick={logout} >Log out</Button>
                            </VStack>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Grid h="100vh" w={"full"} overflowY={"hidden"} backgroundColor={mainBackgroundColor} >

                <LoadingAnimation loading={isLoading || !firstName} >
                    {(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion")) && (
                        <Flex w={"full"} position={"fixed"} zIndex={"100"} top={"0px"} bg={{mainBackgroundColor}} >
                            <DashboardNavbar data={user} pathname={pathname} userId={userId} openmodal={setShowModal} image={user?.data.imgMain.value} />
                        </Flex>
                    )}
                    <Flex w="full" h="full" pt={(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion")) ? "80px" : "0px"} pb={["70px", "70px", "70px", "0px"]} overflow={"hidden"} bg={"white"} >
                        {(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion")) && (
                            <Box width={"fit-content"} display={['none', 'none', 'none', 'flex']} flexDir={"column"} >
                                <Sidebar />
                            </Box>
                        )}
                        {children}

                    </Flex>

                </LoadingAnimation>
                {/* BOTTOM TAB */}
                <PageLoader show={isLoading || !firstName} />
                <HStack paddingX='20px' zIndex={"100"} position={"fixed"} bottom={"0px"} justifyContent={'space-evenly'} width='100%' height='70px' bg='white' borderTopWidth={1} borderTopColor={'lightgrey'} display={['flex', 'flex', 'flex', 'none']}>
                    <Link href='/dashboard/home'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('home') ? 'brand.chasescrollBlue' : 'white'} color={pathname?.includes('home') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                            <HomeIcon />
                        </VStack>
                    </Link>

                    <Link href='/dashboard/explore'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('explore') ? 'brand.chasescrollBlue' : 'white'} color={pathname?.includes('explore') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                            <SearchNormal1 size='20px' />
                        </VStack>
                    </Link>

                    <Link href='/dashboard/event'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('event') ? 'brand.chasescrollBlue' : 'white'} color={pathname?.includes('event') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                            <Calendar size='20px' />
                        </VStack>
                    </Link>

                    <Link href='/dashboard/community'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('community') ? 'brand.chasescrollBlue' : 'white'} color={pathname?.includes('community') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                            {/* <People size='20px' /> */}
                            <UsersIcon />
                        </VStack>
                    </Link>

                    <Link href={userId ? `/dashboard/profile/${userId}` : ""}>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname?.includes('profile') ? 'brand.chasescrollBlue' : 'white'} color={pathname?.includes('profile') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                            <Box width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                                {user?.data.imgMain.value === null && (
                                    <VStack width={'100%'} height='100%' fontFamily={''} justifyContent={'center'} alignItems={'center'}>
                                        <CustomText fontFamily={'DM-Bold'} fontSize={'10px'} color='brand.chasescrollButtonBlue'>{firstName[0]?.toUpperCase()} {lastName[0]?.toUpperCase()}</CustomText>
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
                        </VStack>
                    </Link>
                </HStack>
            </Grid>
        </Box>
    )
}

export default Layout