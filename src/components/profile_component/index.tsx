"use client"
import { Box, Flex, Grid, GridItem, Image } from '@chakra-ui/react'
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

interface Props {
    user_index: string | number
}

function ProfileComponent(props: Props) {
    const {
        user_index
    } = props

    // moving this to a global state
    // for some reason react setState doesn't work as expected in modal

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


    const [open, setOpen] = useState("")

    const closeHandler = () => {
        setOpen("")
    }
    const clickHandler = (item: any) => {
        console.log(item);
        // setAll({ typeID: item?.id, open: true });
        setOpen(item?.id)
    }

    return (
        <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
            <Flex width={"full"} justifyContent={"center"} px={"6"} >
                <Grid width={"full"} templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']} gap={6} >
                    {results.filter((item: any) => item?.joinStatus !== "SELF")?.map((item: IMediaContent, index: number) => {
                        return (
                            <GridItem onClick={() => clickHandler(item)} as={"button"} key={index} width={"full"} height={"200px"} rounded={"24px"} roundedTopRight={"none"} shadow={"lg"} bgColor={mainBackgroundColor}  >
                                {item?.type === "WITH_IMAGE" && (
                                    <ImageSlider links={item?.multipleMediaRef} type="feed" />
                                )}
                                {item.type === 'WITH_VIDEO_POST' && item?.mediaRef &&
                                    <VideoPlayer
                                        src={`${item?.mediaRef}`}
                                        measureType="px"
                                        rounded='24px'
                                    />
                                }
                                <ModalLayout size={"lg"} open={open === item?.id ? true : false} title={"My Post"} close={closeHandler} >
                                    <Flex w={"full"} px={"4"} pb={"4"} >
                                        <PostCard {...item} />
                                    </Flex>
                                </ModalLayout>
                            </GridItem>
                        )
                    })}
                </Grid>
            </Flex>
        </LoadingAnimation>
    )
}

export default ProfileComponent
