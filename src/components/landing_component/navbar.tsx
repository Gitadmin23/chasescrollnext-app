import { THEME } from "@/theme";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import CustomButton from "../general/Button";

function HomeNavbar() {

    const homelink = [
        {
            label: "Home",
            link: "/home"
        },
        {
            label: "Event",
            link: "/home"
        },
        {
            label: "About us",
            link: "/home"
        },
        {
            label: "Policy",
            link: "/home"
        },
        {
            label: "Terms & Condition",
            link: "/home"
        },
        {
            label: "Contact us",
            link: "/home"
        }
    ]

    return (
        <Flex w={"full"} height={"101.03px"} px={"12"} bgColor={"white"} justifyContent={"space-between"} alignItems={"center"} >
            <Flex alignItems={"center"} gap={"1"} >
                <Image width={["full", "full", "60px"]} src={"/assets/logo.png"} alt="logo" />
                <Text fontWeight={"bold"} color={THEME.COLORS.chasescrollBlue} >Chasescroll</Text>
            </Flex>
            <Flex gap={"5"} >
            {homelink?.map((item: {
                label: string,
                link: string
            }) => {
                return (
                    <Box as="button" _hover={{color: THEME?.COLORS?.chasescrollBlue}} >
                        <Text lineHeight={"22.5px"} fontWeight={"semibold"} >{item?.label}</Text>
                    </Box>
                )
            })}
            </Flex>
            <Flex gap={"4"} >
                <CustomButton text={"Login"} width={"152px"} backgroundColor={"white"} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={THEME?.COLORS?.chasescrollBlue} borderRadius={"8px"} />
                <CustomButton text={"Get Started"} width={"152px"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"8px"} />
            </Flex>
        </Flex>
    )
}

export default HomeNavbar