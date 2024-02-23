import ButtonGroup from '@/app/home/home_component/Navbar/ButtonGroup'
import SearchBar from '@/components/explore_component/searchbar'
import CustomText from '@/components/general/Text'
import NotificationBar from '@/components/navbar/notification'
import { THEME } from '@/theme'
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerOverlay, Flex, HStack, Image, Link, Text, useDisclosure } from '@chakra-ui/react'
import { Message, LogoutCurve, Wallet, HambergerMenu } from 'iconsax-react'
import { useRouter } from 'next/navigation'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { Icon } from "@iconify/react";
import { WalletIcon2 } from '@/components/svg'

interface Props {
    pathname?: string | null,
    userId?: any,
    openmodal?: any,
    home?: boolean
}

function DashboardNavbar(props: Props) {
    const {
        userId,
        openmodal,
        home
    } = props

    const router = useRouter()

    const clickHandler = (item: string) => {
        router.push(item)
    }

    let token = localStorage.getItem("token")

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [pathname, setPathname] = useState("")

    useEffect(() => {
        setPathname(window?.location?.pathname)
    }, [])

    return (
        <Box width="full">
            {/* NAVBAR SECTION */}
            {(!pathname?.includes("create_event") || !pathname?.includes("edit_draft") || !pathname?.includes("edit_event")) && (
                <HStack position={"absolute"} zIndex={"30"} top={"0px"} width='100%' height='80px' borderBottomWidth={'1px'} borderBottomColor={'lightgrey'} backgroundColor={'white'} alignItems='center' justifyContent={'space-between'} paddingX={['20px', '40px']}>

                    <Flex alignItems={"center"} gap={["3", "3", "12"]}>
                        <Flex role="button" width={"fit-content"} alignItems={"center"} gap={"1"} onClick={() => router.push("/dashboard/home")} justifyContent={'center'}>
                            <Image src='/assets/images/chasescroll-logo.png' width={50} height={50} alt='logo' />
                            <CustomText fontFamily={'Satoshi-Regular'} fontSize='lg' color='#12299C'>Chasescroll</CustomText>
                        </Flex>
                        <Box display={["none", "none", "block"]} >
                            <SearchBar home={home} />
                        </Box>
                    </Flex>
                    {/* LARGE SCREEN ICONS */}

                    {userId && (
                        <HStack gap={"4"} display={['none', 'flex']}>
                            <Box onClick={() => router.push("/dashboard/settings/payment/details")} as={"button"} >
                                {/* <Wallet
                                    color={THEME.COLORS.chasescrollBlue} size='30px'
                                /> */}
                                <WalletIcon2 />
                            </Box>
                            {/* <CustomText fontWeight={"bold"} >{username}</CustomText> */}
                            <NotificationBar />

                        </HStack>
                    )}
                    {/* SMALL SCREEN ICONS */}
                    {!home && (
                        <HStack display={['flex', 'none']}>

                            <Box onClick={() => router.push("/dashboard/settings/payment/details")} as={"button"} > 
                                <WalletIcon2 />
                            </Box>
                            <Link href='/dashboard/chats'>
                                <Message color={THEME.COLORS.chasescrollBlue} size='30px' variant='Outline' />
                            </Link>
                            <NotificationBar />
                            <LogoutCurve onClick={() => openmodal(true)} color='red' size={'30px'} variant='Outline' />
                        </HStack>
                    )}

                    {home && (
                        <Flex display={['none', "none", "none", "none", 'flex']} alignItems={"center"} gap={"7"} >
                            <Text as={"button"} fontWeight={"bold"} onClick={() => clickHandler("/")} color={"brand.chasescrollBlue"} >Event</Text>
                            <Text as={"button"} fontWeight={"bold"} onClick={() => clickHandler("/home")} color={pathname === "/home" ? "brand.chasescrollBlue" : "black"} >Home</Text>
                            <Text as={"button"} fontWeight={"bold"} onClick={() => clickHandler("/home/about")} color={pathname === "/home/about" ? "brand.chasescrollBlue" : "black"} >About us</Text>
                            {!token && (
                                <Flex ml={"6"} gap={"5"}>
                                    <ButtonGroup whitesecond ctaText="Login" url={"/auth"} />
                                    <ButtonGroup bluesecond ctaText="Get Started" url={"/auth/signup"} />
                                </Flex>
                            )}
                        </Flex>
                    )}

                    {home && (
                        <Flex width={"fit-content"} onClick={() => onOpen()} as={"button"} display={['flex', 'flex', 'flex', 'flex', 'none']}>
                            {/* <Icon className="text-2xl" icon="mdi:h/amburger-menu" /> */}
                            <HambergerMenu
                                size="30"
                                color="#000"
                            />
                        </Flex>
                    )}

                    <Drawer
                        isOpen={isOpen}
                        placement='right'
                        size={"sm"}
                        onClose={onClose}
                    >
                        <DrawerOverlay />
                        <DrawerContent bg={"white"} >
                            <DrawerCloseButton />

                            <DrawerBody >

                                <Flex h={"full"} pt={"20"} flexDir={"column"} alignItems={"center"} justifyContent={"start"} w={"full"} gap={"8"} fontSize={"lg"} >
                                    <Flex maxW={'220px'} width={"full"} flexDir={"column"} gap={"4"} >
                                        <ButtonGroup white={pathname === "/" ? false : true} active={pathname === "/" ? true : false}
                                            onClick={() => clickHandler("/")} ctaText="Event" url={"/"} />
                                        <ButtonGroup white={pathname === "/home" ? false : true} active={pathname === "/home" ? true : false}
                                            onClick={() => clickHandler("/home")} ctaText="Home" url={"/home"} />
                                        <ButtonGroup white={pathname === "/home/about" ? false : true} active={pathname === "/home/about" ? true : false}
                                            onClick={() => clickHandler("/home/about")} ctaText="About us" url={"/home/about"} />
                                        <ButtonGroup white={pathname === "/home/privacy_poilcy" ? false : true} active={pathname === "/home/privacy_poilcy" ? true : false}
                                            onClick={() => clickHandler("/home/privacy_poilcy")} ctaText="Policy" url={"/home/privacy_poilcy"} />
                                        <ButtonGroup white={pathname === "/home/terms" ? false : true} active={pathname === "/home/terms" ? true : false}
                                            onClick={() => clickHandler("/home/terms")} ctaText="Terms & Condition" url={"/home/terms"} />
                                        <ButtonGroup white={pathname === "/home/contact" ? false : true} active={pathname === "/home/contact" ? true : false}
                                            onClick={() => clickHandler("/home/contact")} ctaText="Contact us" url={"/home/contact"} />

                                    </Flex>
                                    {/* {!token && ( */}
                                    <Flex gap={"3"} width={"full"} my={"auto"} display={"flex"} justifyContent={"center"}  >
                                        <ButtonGroup white
                                            width={"152px"}
                                            onClick={onClose} ctaText="Login" url={"/auth"} />
                                        <ButtonGroup blue
                                            onClick={onClose} ctaText="Get Started" url={"/auth/signup"} />
                                    </Flex>
                                    {/* )} */}
                                </Flex>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </HStack>
            )}
        </Box>
    )
}

export default DashboardNavbar
