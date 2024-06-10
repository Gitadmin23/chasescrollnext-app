import { QuoteIcon } from "@/components/svg";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
// import { FaPlay } from "react-icons/fa";
import YouTube from "react-youtube";

export default function UserComment() {

    const ref: any = React.useRef(null);

    const scroll = (scrolloffset: number) => {
        ref.current.scrollLeft += scrolloffset
    };

    const Card = () => {
        return (
            <Flex w={"399px"} h={"330px"} p={"6"} flexDir={"column"} pos={"relative"} rounded={"14px"} borderWidth={"1px"} borderColor={"#E2E8F0"} >
                <Text fontSize={"17.3px"} lineHeight={"28px"} letterSpacing={"-0.18px"} >Interest rates are so high - its a no- brainer to take advantage of the current market environment. With Finvest, I could buy everything easily through my phone.</Text>
                <Flex alignItems={"center"} mt={"auto"} gap={"3"} >
                    <Box bgColor={"gray.700"} w={"48px"} h={"48px"} rounded={"full"} />
                    <Text fontWeight={"medium"} fontSize={"15.13px"} lineHeight={"28px"} letterSpacing={"-0.16px"} >Arnav Sahu</Text>
                </Flex>
                <Box pos={"absolute"} bottom={"0px"} right={"4"} >
                    <QuoteIcon />
                </Box>
            </Flex>
        )
    }

    const Video = () => {
        return (
            <Flex w={"512px"} h={"330px"} bgColor={"red.300"} justifyContent={"center"} rounded={"14px"} alignItems={"center"}  >
                <YouTube className=" videoborder " videoId="TKODgfkpL6o" opts={opts} />
            </Flex>
        )
    }

    const opts = {
      height: '330',
      width: '512',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };

    return (
        <Flex w={"full"} flexDir={"column"} py={"12"} gap={"9"} >
            <Flex ref={ref} w={"full"} overflowX={"auto"} scrollBehavior={"smooth"} px={"12"} sx={
                {
                    '::-webkit-scrollbar': {
                        display: 'none'
                    }
                }
            }>
                <Flex w={"auto"} gap={"3"} >
                    <Card />
                    <Card />
                    <Video />
                    <Card />
                    <Card />
                    <Video />
                    <Card />
                    <Video />
                    <Card />
                    <Card />
                    <Card />
                </Flex>
            </Flex>
            <Flex w={"full"} justifyContent={"end"} gap={"4"} px={"12"} >
                <Box onClick={() => scroll(-400)} as="button" w={"40px"} h={"40px"} rounded={"full"} >
                    <Image w={"full"} h={"full"} rounded={"full"} src="/images/arrow.png" />
                </Box>
                <Box onClick={() => scroll(400)} transform={"rotate(180deg)"} as="button" w={"40px"} h={"40px"} rounded={"full"} >
                    <Image w={"full"} h={"full"} rounded={"full"} src="/images/arrow.png" />
                </Box>
            </Flex>
        </Flex>
    )
}