import ButtonGroup from '@/app/home/home_component/Navbar/ButtonGroup'
import SearchBar from '@/components/explore_component/searchbar'
import CustomText from '@/components/general/Text'
import NotificationBar from '@/components/navbar/notification'
import { THEME } from '@/theme'
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerOverlay, Flex, HStack, Image, Link, Text, useDisclosure } from '@chakra-ui/react'
import { Message, LogoutCurve } from 'iconsax-react'
import { useRouter } from 'next/navigation'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { Icon } from "@iconify/react"; 

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

                    <Flex alignItems={"center"} gap={"12"} >
                        <HStack role="button" onClick={() => router.push("/dashboard/home")} justifyContent={'center'}>
                            <Image src='/assets/images/chasescroll-logo.png' width={50} height={50} alt='logo' />
                            <CustomText fontFamily={'Satoshi-Regular'} fontSize='lg' display={['none', 'inline']} color='#12299C'>Chasescroll</CustomText>
                        </HStack>
                        {/* {userId && ( */}
                        <Box display={["none", "none", "block"]} >
                            <SearchBar home={home} />
                        </Box>
                        {/* )} */}
                    </Flex>
                    {/* LARGE SCREEN ICONS */}

                    {userId && (
                        <HStack display={['none', 'flex']}>
                            {/* <CustomText fontWeight={"bold"} >{username}</CustomText> */}
                            <NotificationBar />

                        </HStack>
                    )}

                    { }
                    {/* SMALL SCREEN ICONS */}
                    {!home && (
                        <HStack display={['flex', 'none']}>
                            <Link href='/dashboard/chats'>
                                <Message color={THEME.COLORS.chasescrollBlue} size='30px' variant='Outline' />
                            </Link>
                            <NotificationBar />
                            <LogoutCurve onClick={() => openmodal(true)} color='red' size={'30px'} variant='Outline' />
                        </HStack>
                    )}

                    {home && (
                        <Flex display={['none', "none", "none", "none", 'flex']} alignItems={"center"} gap={"7"} >
                            <Text as={"button"} onClick={() => clickHandler("/")} color={"brand.chasescrollBlue"} >Event</Text>
                            <Text as={"button"} onClick={() => clickHandler("/home")} color={pathname === "/home" ? "brand.chasescrollBlue" : "black"} >Home</Text>
                            <Text as={"button"} onClick={() => clickHandler("/home/about")} color={pathname === "/home/about" ? "brand.chasescrollBlue" : "black"} >About us</Text>
                            <Flex ml={"6"} gap={"5"}>
                                <ButtonGroup white ctaText="Login" url={"/auth"} />
                                <ButtonGroup blue ctaText="Get Started" url={"/auth/signup"} />
                            </Flex>
                        </Flex>
                    )}

                    {home && (
                        <Flex onClick={()=> onOpen()} as={"button"} display={['flex', 'flex','flex','flex','none']}> 
                            <Icon className="text-2xl" icon="mdi:hamburger-menu" />
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

                                <Flex pt={"20"} flexDir={"column"} alignItems={"center"} justifyContent={"start"} w={"full"} gap={"8"} fontSize={"lg"} >

                                    <Text as={"button"} onClick={() => clickHandler("/")} color={pathname === "/" ? "brand.chasescrollBlue" : "black"} >Event</Text>
                                    <Text as={"button"} onClick={() => clickHandler("/home")} color={pathname === "/home" ? "brand.chasescrollBlue" : "black"} >Home</Text>
                                    <Text as={"button"} onClick={() => clickHandler("/home/about")} color={pathname === "/home/about" ? "brand.chasescrollBlue" : "black"} >About us</Text>
                                    <Text as={"button"} onClick={() => clickHandler("/home/privacy_poilcy")} color={pathname === "/home/privacy_poilcy" ? "brand.chasescrollBlue" : "black"} >Policy</Text>
                                    <Text as={"button"} onClick={() => clickHandler("/home/terms")} color={pathname === "/home/terms" ? "brand.chasescrollBlue" : "black"} >Terms & Condition</Text>
                                    <Text as={"button"} onClick={() => clickHandler("/home/contact")} color={pathname === "/home/contact" ? "brand.chasescrollBlue" : "black"} >Contact us</Text>
                                </Flex>
                                {/* <ul className="mt-20 flex flex-col items-center justify-start w-full gap-8 text-lg">

                                    <div role="button"
                                        onClick={onClose}>

                                        <CustomLink path="/" transparent={false} isScrolled={false}>
                                            Event
                                        </CustomLink>
                                    </div>
                                    <div role="button"
                                        onClick={onClose}>

                                        <CustomLink path="/home" transparent={false} isScrolled={false}>
                                            Home
                                        </CustomLink>
                                    </div>
                                    <div role="button"
                                        onClick={onClose}>

                                        <CustomLink
                                            path="/home/about"
                                            transparent={false}
                                            isScrolled={false}
                                        >
                                            About us
                                        </CustomLink>
                                    </div>
                                    <div role="button"
                                        onClick={onClose}>
                                        <CustomLink path="/home/privacy_poilcy"
                                            onClick={onClose} transparent={false} isScrolled={false}>
                                            Policy
                                        </CustomLink>
                                    </div>
                                    <div role="button"
                                        onClick={onClose}>
                                        <CustomLink path="/home/terms"
                                            onClick={onClose} transparent={false} isScrolled={false}>
                                            Terms & Condition
                                        </CustomLink>
                                    </div>
                                    <div role="button"
                                        onClick={onClose}>
                                        <CustomLink
                                            path="/home/contact"
                                            onClick={onClose}
                                            transparent={false}
                                            isScrolled={false}
                                        >
                                            Contact us
                                        </CustomLink>
                                    </div>
                                </ul> */}
                            </DrawerBody>

                            <DrawerFooter gap={"5"} >
                                <ButtonGroup white
                                    onClick={onClose} ctaText="Login" url={"/auth"} />
                                <ButtonGroup blue
                                    onClick={onClose} ctaText="Get Started" url={"/auth/signup"} />
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </HStack>
            )}
        </Box>
    )
}

export default DashboardNavbar
