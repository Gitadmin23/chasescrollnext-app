"use client"
import { useDetails } from '@/global-state/useUserDetails'
import { Box, Button, Flex, HStack, Image, Link, Switch, Tooltip, VStack, useColorMode } from '@chakra-ui/react'
import React, { ReactNode, useState } from 'react'
import { NewChatIcon, NewWalletIcon, NotificationIcon, SidebarCalendarIcon, SidebarEventIcon, SidebarHomeIcon, SidebarLogoutIcon, SidebarMessageIcon, SidebarSearchIcon, SidebarWalletIcon } from '@/components/svg/sidebarIcons';
import { usePathname, useRouter } from 'next/navigation';
import SearchBar from '@/components/explore_component/searchbar';
import { signOut, useSession } from 'next-auth/react';
import UserImage from '@/components/sharedComponent/userimage';
import CustomText from '@/components/general/Text';
import { HomeIcon, UsersIcon } from '@/components/svg';
import { SearchNormal1, Calendar, Warning2, LogoutCurve } from 'iconsax-react';
import useCustomTheme from '@/hooks/useTheme';
import getUser from '@/hooks/useGetUser';
import CreateEventBtn from '@/components/sharedComponent/create_event_btn';
import useModalStore from '@/global-state/useModalSwitch';
import ModalLayout from '@/components/sharedComponent/modal_layout'; 
import NotificationBar from '@/components/notification'; 
import useNotificationHook from '@/hooks/useNotificationHook';

export default function Layout({ children }: {
    children: ReactNode
}) {

    type IRoute = {
        icon: ReactNode;
        text: string;
        route: string;
    }

    const { userId, setAll, user: data, } = useDetails((state) => state);
    const [open, setOpen] = useState(false) 
    const router = useRouter()
    const { setGoogle, notifyModal, setNotifyModal } = useModalStore((state) => state);
    const pathname = usePathname()

    const { colorMode, toggleColorMode } = useColorMode();
    const routes: IRoute[] = [
        {
            route: '/dashboard',
            icon: <SidebarHomeIcon color={pathname === "/dashboard" ? true : false} />,
            text: 'Home'
        },
        {
            route: '/dashboard/explore',
            icon: <SidebarSearchIcon color={pathname?.includes("explore") ? true : false} />,
            text: 'Explore'
        },
        {
            route: '/dashboard/event',
            icon: <SidebarCalendarIcon color={pathname?.includes("event") ? true : false} />,
            text: 'Events'
        },
        {
            route: '/dashboard/chats',
            icon: <SidebarMessageIcon color={pathname === "/dashboard/chats" ? true : false} />,
            text: 'Chats'
        },
        {
            route: '/dashboard/community',
            icon: <SidebarEventIcon color={pathname === "/dashboard/community" ? true : false} />,
            text: 'Community'
        },
        {
            route: '',
            icon: <NotificationIcon color={pathname === "/dashboard/notification" ? true : false} />,
            text: 'Notification'
        },
        {
            route: `/dashboard/settings/payment/details`,
            icon: <SidebarWalletIcon color={pathname === "/dashboard/settings/payment/details" ? true : false} />,
            text: 'Wallet'
        }
    ];


    // <Notification color={THEME.COLORS.chasescrollBlue} size='30px' variant='Outline' onClick={() => setActive(prev => !prev)} />
    const { user } = getUser()


    const { bodyTextColor, primaryColor, secondaryBackgroundColor, mainBackgroundColor, borderColor, headerTextColor } = useCustomTheme();

    const logout = async () => {
        await signOut();
        setAll({ userId: '', dob: '', email: '', username: '', firstName: '', lastName: '', publicProfile: '' });
        localStorage.clear();
        // router?.push("/auth")

    }

    const { status } = useSession();


    const Id = localStorage.getItem('user_id');

    React.useEffect(() => {
        if ((status === "unauthenticated" && !Id)) {
            router.push('/auth')
        } else {
            setAll({ userId: Id ?? "" });
        }
    }, [Id, status, router]);

    const { count } = useNotificationHook() 
    
    return (
        <Flex w={"full"} h={"100vh"} bg={mainBackgroundColor} >
            {(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion")) && (
                <Flex w={"fit-content"} h={"screen"} display={["none", "none", "none", "flex", "flex"]} >
                    <Flex w={"110px"} h={"screen"} gap={"4"} overflowY={"auto"} flexDir={"column"} py={"4"} alignItems={"center"} justifyContent={"space-between"} borderRightColor={borderColor} borderRightWidth={"1px"} >
                        <Box as='button' onClick={() => router?.push("/")} >
                            <Image alt='logo' src='/images/logo.png' w={"50px"} />
                        </Box>
                        <Flex flexDir={"column"} alignItems={"center"} gap={"3"} >

                            {routes?.map((item, index) => (
                                <>
                                    {item?.text !== "Notification" && (
                                        <Flex as={"button"} onClick={() => router?.push(item?.route)} key={index} w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                                            <Tooltip label={item?.text} fontSize='sm'>
                                                <Box>
                                                    {item?.icon}
                                                </Box>
                                            </Tooltip>
                                        </Flex>
                                    )}
                                    {item?.text === "Notification" && (
                                        <Flex as={"button"} onClick={() => setNotifyModal(true)} key={index} w={"75px"} h={"56px"} position={"relative"} justifyContent={"center"} alignItems={"center"} >
                                            <Tooltip label={item?.text} fontSize='sm'>
                                                <Box>
                                                    {item?.icon}
                                                </Box>
                                            </Tooltip>
                                            {count && (
                                                <Flex w={"5"} h={"5"} rounded={"full"} bg={primaryColor} color={"white"} justifyContent={"center"} position={"absolute"} top={"1"} right={"2"} alignItems={"center"} fontWeight={"semibold"} fontSize={"12px"}  >
                                                    {count}
                                                </Flex>
                                            )}
                                        </Flex>
                                    )}
                                </>
                            ))}

                        </Flex>

                        <Flex flexDir={"column"} alignItems={"center"} >

                            <Flex w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                                <Tooltip label={"darkmode"} fontSize='sm'>
                                    <Box>
                                        <Switch isChecked={colorMode === 'dark'} size={'md'} onChange={() => toggleColorMode()} />
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Flex as={"button"} onClick={() => router?.push(`/dashboard/profile/${userId}`)} w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                                <Tooltip label={"profile"} fontSize='sm'>
                                    <Box>
                                        <UserImage size={"36px"} border={"1px"} font={"16px"} data={data} image={user?.data?.imgMain?.value} />
                                    </Box>
                                </Tooltip>
                            </Flex>

                            <Flex as={"button"} onClick={() => setOpen(true)} w={"75px"} h={"56px"} justifyContent={"center"} alignItems={"center"} >
                                <Tooltip label={"logout"} fontSize='sm'>
                                    <Box>
                                        <SidebarLogoutIcon />
                                    </Box>
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            )}
            <Flex w={"full"} height={"100vh"} pos={"relative"} flexDirection={"column"} >
                {(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion")) && (
                    <Flex w={"full"} h={"76px"} borderBottomColor={borderColor} borderBottomWidth={"1px"} alignItems={"center"} px={"6"} justifyContent={"space-between"}  >
                        {(pathname !== "/dashboard/event/my_event" && pathname !== "/dashboard/event/past_event" && pathname !== "/dashboard/event/saved_event" && pathname !== "/dashboard/event/draft") && (
                            <Box display={["none", "none", "none", "flex", "flex"]} >
                                <SearchBar />
                            </Box>
                        )}
                        <Flex as={"button"} onClick={() => router?.push("/dashboard")} display={["flex", "flex", "flex", "none", "none"]} alignItems={"center"} gap={"2"} >
                            <Image alt='logo' src='/images/logo.png' w={"35.36px"} />
                            {/* <Text fontSize={"17px"} fontWeight={"700"} color={primaryColor} >Chasescroll</Text> */}
                        </Flex>
                        <Flex ml={"auto"} display={["none", "none", "none", "flex", "flex"]} >
                            <CreateEventBtn btn={true} />
                        </Flex>
                        <Flex display={["flex", "flex", "flex", "none", "none"]} alignItems={"center"} gap={"3"} >
                            <CreateEventBtn mobile={true} />
                            <Flex zIndex={20} alignItems={"center"} justifyContent={"center"} borderWidth={"0.5px"} borderColor={"#ACACB080"} rounded={"32px"} p={"8px"} gap={"3"} px={"3"} >

                                <Flex onClick={() => router?.push("/dashboard/chats")} h={"20px"} alignItems={"center"} as='button' >
                                    <NewChatIcon />
                                </Flex>
                                <Flex onClick={() => router?.push("/dashboard/settings/payment/details")} h={"20px"} alignItems={"center"} as='button' >
                                    <NewWalletIcon />
                                </Flex>
                                <Flex>
                                    <LogoutCurve onClick={() => setOpen(true)} color='red' size={'20px'} variant='Outline' />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                )}
                {(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion")) ? (
                    <Flex w={"full"} h={"100vh"} pb={["70px", "70px", "70px", "0px", "0px"]} pos={"absolute"} top={"0px"} insetX={"0px"} pt={"76px"} overflowY={"hidden"} >
                        {children}
                    </Flex>
                ) : (
                    <Flex w={"full"} h={["100vh"]} pb={["70px", "70px", "70px", "0px", "0px"]} overflowY={"hidden"} >
                        {children}
                    </Flex>
                )}
            </Flex>

            <HStack paddingX='20px' zIndex={"100"} position={"fixed"} bottom={"0px"} justifyContent={'space-evenly'} width='100%' height='70px' bg={mainBackgroundColor} borderTopWidth={1} borderTopColor={borderColor} display={['flex', 'flex', 'flex', 'none']}>
                <Link href='/dashboard'>
                    <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname === "/dashboard" ? 'brand.chasescrollBlue' : secondaryBackgroundColor} color={pathname === "/dashboard" ? 'white' : bodyTextColor} justifyContent={'center'} alignItems={'center'}>
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

                </Link>
            </HStack>
            {/* <PageLoader show={!data?.email} /> */}
            <ModalLayout size={"sm"} open={open} close={setOpen} >
                <VStack
                    width={"100%"}
                    height={"100%"}
                    justifyContent={"center"}
                    spacing={6}
                    bgColor={mainBackgroundColor}
                    p={"6"}
                >
                    <VStack
                        width="60px"
                        height={"60px"}
                        borderRadius={"30px"}
                        justifyContent={"center"}
                        bg="#df26263b"
                    >
                        <Warning2 color="red" size="30px" variant="Outline" />
                    </VStack>
                    <CustomText fontFamily={"DM-Medium"} fontSize={"18px"}>
                        Are you sure you want to logout?
                    </CustomText>
                    <VStack justifyContent={"center"} width={"100%"}>
                        <Button
                            // outlineColor={"brand.chasescrollButtonBlue"}
                            borderColor={"brand.chasescrollButtonBlue"}
                            borderWidth={"1px"}
                            width="100%"
                            outline={"none"}
                            _hover={{ backgroundColor: "white" }}
                            bg={"white"}
                            height={"32px"}
                            color="brand.chasescrollButtonBlue"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            borderColor={"red"}
                            borderWidth={"1px"}
                            _hover={{ backgroundColor: "red" }}
                            bg="red"
                            width="100%"
                            height={"40px"}
                            color="white"
                            onClick={logout}
                        >
                            Log out
                        </Button>
                    </VStack>
                </VStack>
            </ModalLayout>

            <ModalLayout open={notifyModal} size={"xl"} title={"Notification"} close={setNotifyModal} >
                <NotificationBar />
            </ModalLayout>
        </Flex>
    )
}
