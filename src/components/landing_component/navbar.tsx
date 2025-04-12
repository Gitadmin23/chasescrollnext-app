"use client"
import { THEME } from "@/theme";
import { Box, ButtonGroup, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import CustomButton from "../general/Button";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "../explore_component/searchbar";
import { HambergerMenu } from "iconsax-react";
import { jwtDecode } from "jwt-decode"


function HomeNavbar() {

    const homelink = [
        {
            label: "Home",
            link: "/home"
        },
        {
            label: "Events",
            link: "/"
        },
        {
            label: "About us",
            link: "/home/about-us"
        },
        {
            label: "FAQ",
            link: "/home#faq"
        },
        // {
        //     label: "Policy",
        //     link: "/home/privacy"
        // },
        {
            label: "Terms & Condition",
            link: "/home/terms"
        },
        {
            label: "Contact us",
            link: "/home/contact-us"
        }
    ]

    const [token, setToken] = React.useState<string | null>(() => localStorage.getItem("token"));
    const [refresh_token, setRefreshToken] = React.useState(() => localStorage.getItem("refresh_token"))

    console.log(`TOEkEN => ${token}`);

    const pathname = usePathname();
    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure()

    React.useEffect(() => {
        // Add token verification
        const verifyToken = () => {
            try {
                if (!token) return;

                const decoded = jwtDecode(token);
                const refresh_token = localStorage.getItem("refresh_token");
                // Check if token is expired
                if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh_token');
                    router.push('/auth'); // or wherever you want to redirect
                }
            } catch (error) {
                console.error('Token verification failed:', error);
                localStorage.removeItem('your_token_key');
                router.push('/auth');
            }
        }

        verifyToken();
        window.scrollTo(0, 0);
    }, [token])

    const clickHander = (item: string) => {
        router?.push(item)
        onClose()
    }


    return (
        <Flex w={"full"} color={"black"} height={["64px", "64px", "101.03px"]} px={["6", "6", "12"]} bgColor={"white"} justifyContent={"space-between"} alignItems={"center"} >
            <Flex onClick={() => router.push("/")} as={"button"} alignItems={"center"} gap={"1"} >
                <Image width={["32px", "32px", "60px"]} src={"/assets/logo.png"} alt="logo" />
                <Flex flexDir={"column"} alignItems={"start"} >
                    <Text fontWeight={"bold"} fontSize={["14px", "14px", "16px"]} color={THEME.COLORS.chasescrollBlue} >Chasescroll</Text>
                    <Text fontWeight={"medium"} fontStyle={"italic"} fontSize={["12px", "12px", "14px"]}>We build mermories.</Text>
                </Flex>
            </Flex>
            <Flex display={["none", "none", "flex"]}>
                {pathname?.includes("event") && (
                    <SearchBar home={true} />
                )}
            </Flex>
            <Flex display={["none", "none", "none", "flex"]} gap={"5"} >
                {homelink?.slice(0, pathname?.includes("event") ? 3 : 7)?.map((item: {
                    label: string,
                    link: string
                }) => {
                    return (
                        <Box onClick={() => router?.push(item?.link)} key={item?.label + item?.link} as="button" _hover={{ color: THEME?.COLORS?.chasescrollBlue }} >
                            <Text color={pathname === item?.link ? THEME?.COLORS?.chasescrollBlue : "#000"} lineHeight={"22.5px"} fontWeight={"semibold"} >{item?.label}</Text>
                        </Box>
                    )
                })}
            </Flex>
            {!token && (
                <Flex display={["none", "none", "none", "flex"]} gap={"4"} >
                    <CustomButton onClick={() => clickHander("/auth")} text={"Login"} width={"152px"} backgroundColor={"white"} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={THEME?.COLORS?.chasescrollBlue} borderRadius={"8px"} />
                    <CustomButton onClick={() => clickHander("/auth/signup")} text={"Get Started"} width={"152px"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"8px"} />
                </Flex>
            )}
            {token && (
                <Flex display={["none", "none", "none", "flex"]} gap={"4"} >
                    <CustomButton onClick={() => clickHander("/dashboard/event")} text={"Dashboard"} width={"152px"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"8px"} />
                </Flex>
            )}
            <Flex display={["flex", "flex", "flex", "none"]} >
                <button
                    onClick={onOpen}
                    className="p-3 z-50 focus:outline-none"
                >
                    <HambergerMenu
                        size="30"
                        color="#5D70F9"
                    />
                </button>
            </Flex>

            <Drawer
                isOpen={isOpen}
                placement='right'
                size={"xs"}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent bg={"white"} >
                    <DrawerCloseButton />

                    <DrawerBody >

                        <Flex width={"full"} h={"full"} pt={"20"} flexDir={"column"} alignItems={"center"} justifyContent={"start"} gap={"8"} fontSize={"lg"} >

                            <Flex flexDir={"column"} gap={"8"} >
                                {homelink?.map((item: {
                                    label: string,
                                    link: string
                                }) => {
                                    return (
                                        <Box onClick={() => clickHander(item?.link)} key={item?.label + item?.link} as="button" _hover={{ color: THEME?.COLORS?.chasescrollBlue }} >
                                            <Text color={pathname === item?.link ? THEME?.COLORS?.chasescrollBlue : "black"} lineHeight={"22.5px"} fontWeight={"semibold"} >{item?.label}</Text>
                                        </Box>
                                    )
                                })}
                            </Flex>
                            {!token && (
                                <Flex gap={"3"} width={"full"} my={"auto"} flexDir={"column"} justifyContent={"center"}  >
                                    <CustomButton onClick={() => clickHander("/auth")} text={"Login"} width={"full"} backgroundColor={"white"} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={THEME?.COLORS?.chasescrollBlue} borderRadius={"8px"} />
                                    <CustomButton onClick={() => clickHander("/auth")} text={"Get Started"} width={"full"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"8px"} />
                                </Flex>
                            )}
                            {token && (
                                <Flex gap={"3"} width={"full"} my={"auto"} flexDir={"column"} justifyContent={"center"}  >
                                    <CustomButton onClick={() => clickHander("/dashboard/event")} text={"Dashboard"} width={"full"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"8px"} />
                                </Flex>
                            )}
                            {/* )} */}
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}

export default HomeNavbar