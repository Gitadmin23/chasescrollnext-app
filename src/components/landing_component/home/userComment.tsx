import { QuoteIcon } from "@/components/svg";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
// import { FaPlay } from "react-icons/fa";
import YouTube from "react-youtube";

interface IProps {
    name: string,
    detail: string,
    video?: boolean,
    url?: string
}

export default function UserComment() {

    const ref: any = React.useRef(null);

    const scroll = (scrolloffset: number) => {
        ref.current.scrollLeft += scrolloffset
    };

    const Card = (props: IProps) => {

        const {
            name,
            detail,
        } = props

        return (
            <Flex w={"399px"} h={"330px"} pb={"6"} pt={"4"} flexDir={"column"} pos={"relative"} rounded={"14px"} borderWidth={"1px"} borderColor={"#E2E8F0"} >
                <Flex px={"6"} pt={"2"} w={"full"} maxH={"200px"} overflowY={"auto"} >
                    <Text fontSize={"17.3px"} lineHeight={"28px"} letterSpacing={"-0.18px"} >{detail}</Text>
                </Flex>
                <Flex px={"6"} alignItems={"center"} position={"relative"} zIndex={"20"} mt={"auto"} gap={"3"} >
                    <Box bgColor={"gray.700"} w={"48px"} h={"48px"} rounded={"full"} />
                    <Text fontWeight={"medium"} fontSize={"15.13px"} lineHeight={"28px"} letterSpacing={"-0.16px"} >{name}</Text>
                </Flex>
                <Box pos={"absolute"} bottom={"0px"} zIndex={"0"} right={"4"} >
                    <QuoteIcon />
                </Box>
            </Flex>
        )
    }

    const Video = (props: IProps) => {

        const {
            url
        } = props

        return (
            <Flex w={"512px"} h={"330px"} bgColor={"red.300"} justifyContent={"center"} rounded={"14px"} alignItems={"center"}  >
                <YouTube className=" videoborder " videoId={url} opts={opts} />
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

    const data = [
        {
            "name": "",
            "detail": "",
            "video": true,
            "url": "rZpcP499EPY"
        },
        {
            "name": "Egwake Jc - Abuja",
            "detail": "My experience with Chasescroll was very nice.",
            "video": false,
        },
        {
            "name": "Osuntade Brian - Lagos",
            "detail": "My experience with Chasescroll was nice.",
            "video": false,
        },
        {
            "name": "Atuma Eric - Babcock University",
            "detail": "It was nice and all. Love the service.",
            "video": false,
        },
        {
            "name": "Akintokun Olamide - Port Harcourt",
            "detail": "It was an awesome experience.",
            "video": false,
        },
        {
            "name": "",
            "detail": "",
            "video": true,
            "url": "g0wurG_8E3Q"
        },
        {
            "name": "Akintunde Emma - Lagos",
            "detail": "It was nice and smooth, and I was able to organize my event properly.",
            "video": false,
        },
        {
            "name": "Ilenreh David - Abuja",
            "detail": "Yoo, fire as hell.",
            "video": false,
        },
        {
            "name": "Aderibigbe Precious - Port Harcourt",
            "detail": "It was a very pleasant one, to be honest. Sincerely, I’m very happy I got to know about it.",
            "video": false,
        },
        {
            "name": "Nwabueze Prince - Babcock University",
            "detail": "I recently had the pleasure of patronizing the Chasescroll brand, and I must say, my experience was nothing short of amazing! From the initial planning stages to the execution of the event, the team at Chasescroll was professional, organized, and dedicated to ensuring every detail was taken care of. I must say I was thoroughly impressed. I am extremely satisfied with the services provided by Chasescroll, and I would highly recommend them to anyone.",
            "video": false,
        },
        {
            "name": "Dada Jimmi - Port Harcourt",
            "detail": "I had a very nice experience with Chasescroll.",
            "video": false,
        },
        {
            "name": "",
            "detail": "",
            "video": true,
            "url": "0dHrSQ5hO6U"
        },
        {
            "name": "Olushola Andrew - Abuja",
            "detail": "Bro, thanks, the Chasescroll experience was fire.",
            "video": false,
        },
        {
            "name": "Ebereonwu Charles - Lagos",
            "detail": "It’s calm, mehn...really nice for real.",
            "video": false,
        },
        {
            "name": "Obele Chinaza - Babcock University",
            "detail": "Not gonna lie, my experience was really nice.",
            "video": false,
        },
        {
            "name": "Ugochukwu Chinaza - Port Harcourt",
            "detail": "My experience with Chasescroll has been so good, and I’m so happy. Thank you so much.",
            "video": false,
        },
        {
            "name": "Chijioke Ebube - Lagos",
            "detail": "My experience with Chasescroll was nice.",
            "video": false,
        },
        {
            "name": "Duruaku Michael - Abuja",
            "detail": "Okay, so my experience with Chasescroll was one of a kind. They really know their stuff. From the ease of use to the well-planned events, it’s really nice. I recommend a lot of people to try it.",
            "video": false,
        }
    ]


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
                    {data?.map((item: IProps, index: number) => {
                        if (item?.video) {
                            return (
                                <Video {...item} />
                            )
                        } else {
                            return (
                                <Card {...item} />
                            )
                        }
                    })}
                    {/* <Card />
                    <Card />
                    <Video />
                    <Card />
                    <Card />
                    <Video />
                    <Card />
                    <Video />
                    <Card />
                    <Card />
                    <Card /> */}
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