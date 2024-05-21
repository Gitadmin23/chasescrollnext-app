import CustomButton from "@/components/general/Button";
import { DownArrowIcon } from "@/components/svg";
import { THEME } from "@/theme";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FAQDATA } from '../../../constants/index';


export default function Faq() {

    return (
        <Flex px={"12"} py={"20"} w={"full"} >
            <Flex w={"full"} h={"full"} flexDir={"column"} pr={"4"} justifyContent={"center"} gap={"7"} alignItems={"start"} >
                <Text maxW={"347.48px"} fontWeight={"semibold"} fontSize={"45px"}  >Have questions? We have <span style={{ color: THEME?.COLORS?.chasescrollBlue }} >answers</span></Text>
                <Text fontSize={"15.38px"} lineHeight={"26px"} fontWeight={"medium"} >Want to know more? You can email us anytime at <span style={{ color: THEME?.COLORS?.chasescrollBlue, fontWeight: "400" }} >support@chasescroll.com</span></Text>
                <CustomButton text={"Get Started"} width={"152px"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"52px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"8px"} />
            </Flex>
            <Flex pl={"4"} w={"full"} flexDir={"column"} alignItems={"center"} borderLeftWidth={"1px"} borderLeftColor={"#E2E8F0"} >
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