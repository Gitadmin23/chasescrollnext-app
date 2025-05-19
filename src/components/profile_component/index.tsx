"use client"
import { Box, Flex, Grid, GridItem, Image, Link, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ProfileImage from './profile_image'
import ProfileHeader from './profile_header'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { IMAGE_URL, URLS } from '@/services/urls'
import PostThreads from './post_component'
import LoadingAnimation from '../sharedComponent/loading_animation'
import { useLocalModalState } from './modalstate'
import ModalLayout from '../sharedComponent/modal_layout'
import { PostCard } from '../new_home_component'
import { IMediaContent } from '@/models/MediaPost'
import ImageSlider from '../modals/mediapostPages/ImageSlider'
import VideoPlayer from '../general/VideoPlayer'
import useCustomTheme from '@/hooks/useTheme'
import { useRouter, useSearchParams } from 'next/navigation'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import { count } from 'console'
import moment from 'moment'
import router from 'next/router' 
import { IoIosMore } from 'react-icons/io'
import { IoArrowBack } from 'react-icons/io5' 
import ShareBtn from '../sharedComponent/new_share_btn'
import UserImage from '../sharedComponent/userimage'
import { HomeHeartIcon, HomeHeartFillIcon, HomeCommentIcon } from '../svg'

interface Props {
    user_index: string | number
}

function ProfileComponent(props: Props) {
    const {
        user_index
    } = props

    // moving this to a global state
    // for some reason react setState doesn't work as expected in modal

    const { push } = useRouter()

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();

    const { setAll, typeID } = useLocalModalState((state) => state);
    const { results, isLoading, ref, isRefetching, data } = InfiniteScrollerComponent({ url: URLS.GET_MEDIA_POST + user_index, limit: 10, filter: "id" })


    const [open, setOpen] = useState(false)
    const [singlePost, setSinglePost] = useState({} as any)
    const query = useSearchParams();
    const [textSize, setTextSize] = useState(100)

    const closeHandler = () => {
        setOpen(false)
    }
    const clickHandler = (item: any) => {
        // console.log(item);
        // setAll({ typeID: item?.id, open: true });
        setOpen(true)
        setSinglePost(item)
        // push("?open=true")
    }

    return (
        <LoadingAnimation withimg={true} loading={isLoading} refeching={isRefetching} length={results?.length} >
            <Flex width={"full"} justifyContent={"center"} px={"6"} >
                <Grid width={"full"} templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']} gap={6} >
                    {results.filter((item: any) => item?.joinStatus !== "SELF")?.map((item: IMediaContent, index: number) => {
                        return (
                            <GridItem onClick={() => clickHandler(item)} as={"button"} key={index} width={"full"} height={"200px"} rounded={"24px"} roundedTopRight={"none"} shadow={"lg"} bgColor={mainBackgroundColor}  >
                                {item?.type === "WITH_IMAGE" && (
                                    <ImageSlider links={item?.multipleMediaRef} type="feed" />
                                )}
                                {item.type === 'WITH_VIDEO_POST' && (item?.mediaRef || item?.multipleMediaRef[0]) &&
                                    <VideoPlayer
                                        src={`${item?.mediaRef ? item?.mediaRef : item?.multipleMediaRef[0]}`}
                                        measureType="px"
                                        rounded='24px'
                                    />
                                }
                            </GridItem>
                        )
                    })}
                </Grid>
                <ModalLayout size={"lg"} open={open} title={"My Post"} close={closeHandler} >
                    <Flex w={"full"} px={"4"} pb={"4"} >
                        {/* <PostCard {...item} /> */}
                        <Flex w={"full"} gap={"3"} flexDir={"column"} >
                            <Flex alignItems={"center"} gap={"3"} h={"fit-content"} w={"full"} rounded={"full"} borderWidth={"0px"} borderColor={borderColor}>
                                <Flex alignItems={"center"} gap={["1", "1", "1"]} >
                                    {/* {(pathname?.includes("share") && data?.email) && (
                                        <Box as='button' onClick={() => router.push("/dashboard")} >
                                            <IoArrowBack role="button" size={"25px"} />
                                        </Box>
                                    )} */}
                                    <Flex as={"button"} onClick={() => router?.push(`/dashboard/profile/${singlePost?.user?.userId}`)} gap={"3"} >
                                        <UserImage size={"42px"} data={singlePost?.user} font={"18px"} border={"1px"} image={singlePost?.user?.data?.imgMain?.value} />
                                        <Flex display={["none", "none", "block"]} flexDir={"column"} textAlign={"left"}  >
                                            {/* <Text color={"#233DF3"} >{textLimit(capitalizeFLetter(user?.firstName) + " " + capitalizeFLetter(user?.lastName), 15)}</Text> */}
                                            <Text fontSize={"14px"} >{textLimit(capitalizeFLetter(singlePost?.user?.firstName), 20)}</Text>
                                            <Text fontSize={"8px"} color={bodyTextColor} >{moment(singlePost?.timeInMilliseconds).fromNow()}</Text>
                                        </Flex>
                                        <Flex display={["block", "block", "none"]} flexDir={"column"} textAlign={"left"}  >
                                            <Text color={"#233DF3"} fontSize={"14px"} >{textLimit(capitalizeFLetter(singlePost?.user?.firstName) + " " + capitalizeFLetter(singlePost?.user?.lastName), 15)}</Text>
                                            <Text mt={"-4px"} fontSize={"10px"} >@{textLimit(singlePost?.user?.username, 12)}</Text>
                                            <Text fontSize={"8px"} color={bodyTextColor} >{moment(singlePost?.timeInMilliseconds).fromNow()}</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                {data?.email && (
                                    <Flex onClick={() => setOpen(true)} as={"button"} ml={"auto"} pr={"1"} >
                                        <IoIosMore size={"25px"} />
                                    </Flex>
                                )}
                            </Flex>
                            {(singlePost?.type === "WITH_IMAGE" || singlePost?.type === "WITH_VIDEO_POST") &&
                                <Flex w={"full"} h={["236px", "236px", "236px", "350px", "500px"]} rounded={"16px"} borderWidth={"1px"} roundedTopRight={"0px"}>
                                    {singlePost?.type === "WITH_VIDEO_POST" && (
                                        <VideoPlayer
                                            src={`${singlePost?.mediaRef ? singlePost?.mediaRef : singlePost?.multipleMediaRef[0]}`}
                                            measureType="px"
                                        />
                                    )}
                                    {singlePost?.type === "WITH_IMAGE" && (
                                        <Flex w={"full"} as={"button"} >
                                            <ImageSlider links={singlePost?.multipleMediaRef} type="feed" />
                                        </Flex>
                                    )}
                                </Flex>
                            }
                            <Flex px={"2"} >

                                {(singlePost?.text?.includes("https://") || singlePost?.text?.includes("http://") || singlePost?.text?.includes("www.")) ?
                                    (
                                        <Link wordBreak="break-all" href={singlePost?.text} target={"_blank"} textDecor={"underline"} color={primaryColor} fontSize={["14px", "14px", "16px"]} >{textLimit(singlePost?.text, 50)}</Link>
                                    ) :
                                    (
                                        <Text wordBreak="break-all" fontSize={["12px", "12px", "14px"]} >{capitalizeFLetter(textLimit(singlePost?.text, 100))} {singlePost?.text?.length > 100 && <span style={{ color: primaryColor, fontWeight: "700", fontSize: "14px" }} onClick={() => setTextSize((prev) => prev === 100 ? (10 * 100000000000) : 100)} role='button' >{textSize === 100 ? "more" : "less"}</span>}</Text>
                                    )
                                }
                            </Flex>
                        </Flex>
                    </Flex>
                </ModalLayout>
            </Flex>
        </LoadingAnimation>
    )
}

export default ProfileComponent
