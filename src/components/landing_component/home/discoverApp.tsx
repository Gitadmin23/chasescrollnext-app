import CustomButton from "@/components/general/Button";
import { THEME } from "@/theme";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

type IProps = {
    hide?: boolean
}

export default function DiscoverApp(props: IProps) {

    const {
        hide
    } = props

    return (
        <Flex w={"full"} flexDir={"column"} >
            <Flex w={"full"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} gap={"10"} py={"20"} px={"12"} >
                <Flex w={"fit-content"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} gap={"3"} textAlign={"center"} >
                    <Text fontSize={"45px"} fontWeight={"semibold"} lineHeight={"40px"} >Discover <span style={{ color: THEME?.COLORS?.chasescrollBlue }} >Chasescroll</span></Text>
                    <Text fontSize={"24px"} lineHeight={"36px"} color={"#222222CC"} >Embark on an exciting journey of event exploration.</Text>
                    {hide && (
                        <CustomButton text={"Watch Video"} fontWeight={"semibold"} mt={"6"} width={"152px"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"8px"} />
                    )}
                </Flex>
                {!hide && (
                    <Flex w={"full"} pos={"relative"} h={"606px"} justifyContent={"center"} alignItems={"center"} >
                        <Image src="/images/discoverApp.png" alt="discoverApp" pos={"absolute"} w={"full"} inset={"0px"} rounded={"8px"} />
                        <CustomButton text={"Sign-up"} width={"175px"} backgroundColor={"white"} height={"60px"} borderWidth={"1px"} color={THEME?.COLORS?.chasescrollBlue} borderRadius={"8px"} />
                    </Flex>
                )}
            </Flex>
            {!hide && (
                <Flex width={"full"} alignItems={"center"} gap={"6"} px={"12"} justifyContent={"space-between"} height={"250px"} >
                    <Text maxW={"913px"} fontSize={"45px"} lineHeight={"58px"} letterSpacing={"-2.5px"} textAlign={"center"} fontWeight={"semibold"} ><span style={{ color: THEME?.COLORS?.chasescrollBlue }} >Loved</span> by our users</Text>
                    <CustomButton text={"Leave a Review"} fontWeight={"semibold"} width={"152px"} backgroundColor={THEME?.COLORS?.chasescrollButtonBlue} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={"white"} borderRadius={"8px"} />
                </Flex>
            )}
        </Flex>
    )
}