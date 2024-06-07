"use client"
import { THEME } from "@/theme";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import CustomButton from "../general/Button";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "../explore_component/searchbar";

function HomeNavbar() {

    const homelink = [
        {
            label: "Home",
            link: "/newhome"
        },
        {
            label: "Event",
            link: "/newhome/event"
        },
        {
            label: "About us",
            link: "/newhome/about-us"
        },
        {
            label: "Policy",
            link: "/newhome/home"
        },
        {
            label: "Terms & Condition",
            link: "/home"
        },
        {
            label: "Contact us",
            link: "/newhome/contact-us"
        }
    ]

    const pathname = usePathname();
    const router = useRouter();

    console.log(pathname);


    return (
        <Flex w={"full"} height={["64px", "64px", "101.03px"]} px={"12"} bgColor={"white"} justifyContent={"space-between"} alignItems={"center"} >
            <Flex alignItems={"center"} gap={"1"} >
                <Image width={["32px", "32px", "60px"]} src={"/assets/logo.png"} alt="logo" />
                <Text fontWeight={"bold"} fontSize={["14px", "14px", "16px"]} color={THEME.COLORS.chasescrollBlue} >Chasescroll</Text>
            </Flex>
            {pathname?.includes("event") && (
                <SearchBar home={true} />
            )}
            <Flex display={["none", "none", "flex"]} gap={"5"} >
                {homelink?.slice(0, pathname?.includes("event") ? 3 : 6)?.map((item: {
                    label: string,
                    link: string
                }) => {
                    return (
                        <Box onClick={() => router?.push(item?.link)} key={item?.label} as="button" _hover={{ color: THEME?.COLORS?.chasescrollBlue }} >
                            <Text color={pathname === item?.link ? THEME?.COLORS?.chasescrollBlue : ""} lineHeight={"22.5px"} fontWeight={"semibold"} >{item?.label}</Text>
                        </Box>
                    )
                })}
            </Flex>
            <Flex display={["none", "none", "flex"]} gap={"4"} >
                <CustomButton text={"Login"} width={"152px"} backgroundColor={"white"} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={THEME?.COLORS?.chasescrollBlue} borderRadius={"8px"} />
                <CustomButton text={"Get Started"} width={"152px"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"8px"} />
            </Flex>
        </Flex>
    )
}

export default HomeNavbar