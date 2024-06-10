import CustomButton from "@/components/general/Button";
import { DownArrowIcon } from "@/components/svg";
import { THEME } from "@/theme";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FAQDATA } from '../../../constants/index';
import { useState } from "react";


export default function Faq() {

    const [selectedData, setSelectedData] = useState(Array<string>)

    return (
        <Flex px={["6", "6", "12"]} gap={["4", "4", "0px"]} flexDir={["column", "column", "row"]} py={[ "10", "10", "20"]} w={"full"} >
            <Flex w={"full"} h={"full"} flexDir={"column"} pr={[ "0px", "0px", "4"]} justifyContent={"center"} gap={[ "4", "4", "7"]} alignItems={"start"} >
                <Text maxW={[ "190px", "190px", "347.48px"]} fontWeight={"semibold"} fontSize={[ "20px", "20px", "45px"]}  >Have questions? We have <span style={{ color: THEME?.COLORS?.chasescrollBlue }} >answers</span></Text>
                <Text fontSize={[ "12px", "12px", "15.38px"]} lineHeight={[ "17px", "17px", "26px"]} fontWeight={"medium"} >Want to know more? You can email us anytime at <span style={{ color: THEME?.COLORS?.chasescrollBlue, fontWeight: "400" }} >support@chasescroll.com</span></Text>
                <CustomButton text={"Get Started"} width={"152px"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"52px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"8px"} />
            </Flex>
            <Flex pl={["0px", "0px", "4"]} w={"full"} flexDir={"column"} alignItems={"center"} borderLeftWidth={[ "0px", "0px", "1px"]} borderLeftColor={"#E2E8F0"} >
                {FAQDATA?.map((item: {
                    title: string,
                    desc: string
                }, index: number) => {
                    return (
                        <Flex key={index} borderBottomWidth={"1px"} borderBottomColor={"#E2E8F0"} py={"8"} maxW={"575px"} w={"full"} >
                            <Flex justifyContent={"space-between"} gap={"4"} w={"full"} >
                                <Text fontSize={"19px"} lineHeight={"32px"} color={"#222222"} >{item?.title}</Text>
                                <Box as="button" >
                                    <DownArrowIcon />
                                </Box>
                            </Flex>
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}