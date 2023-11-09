"use client"
import { Box, Flex, Grid, GridItem, Image } from '@chakra-ui/react'
import React from 'react'
import ProfileImage from './profile_image'
import ProfileHeader from './profile_header'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { IMAGE_URL, URLS } from '@/services/urls'
import PostThreads from './post_component'

interface Props {
    user_index: string
}

function ProfileComponent(props: Props) {
    const {
        user_index
    } = props

    const [open, setOpen] = React.useState(false)
    const [postId, setPostId] = React.useState("")
    const { results, isLoading, ref, isRefetching, data } = InfiniteScrollerComponent({ url: URLS.GET_MEDIA_POST + user_index, limit: 10, filter: "id" })

    const clickHandler =(item: string)=> {
        setPostId(item)
        setOpen(true)
    }

    return (
        <Flex width={"full"} justifyContent={"center"} py={"6"} px={"6"} >
            <Grid width={"full"} templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']} gap={6} >
                {results.filter((item: any) => item?.joinStatus !== "SELF")?.map((item: {
                    type: string,
                    mediaRef: string,
                    id: string
                }, index: number) => {
                    return (
                        <GridItem onClick={()=> clickHandler(item?.id)} as={"button"} key={index} width={"full"} height={"200px"} rounded={"24px"} roundedTopRight={"none"} bgColor={"gray.300"}  >
                            {item?.type === "WITH_IMAGE" && (
                                <>
                                    { item?.mediaRef.startsWith('https://') && (
                                        <Image src={`${item?.mediaRef}`} alt={item?.mediaRef} rounded={"24px"} roundedTopRight={"none"} shadow={"lg"} width={"full"} height={"full"} objectFit={"cover"} />
                                    )}
                                    { !item?.mediaRef.startsWith('https://') && (
                                        <Image src={`${IMAGE_URL}${item?.mediaRef}`} alt={item?.mediaRef} rounded={"24px"} roundedTopRight={"none"} shadow={"lg"} width={"full"} height={"full"} objectFit={"cover"} />
                                    )}
                                </>
                            )} 
                            {item.type === 'WITH_VIDEO_POST' && item?.mediaRef &&
                                <video
                                    key={index.toString()}
                                    style={{width: "100%", height: "100%", borderRadius: "24px", borderTopRightRadius: "0px"}}
                                    className="rounded-b-[32px] rounded-tl-24px w-[170px] h-[170px] object-cover cursor-pointer z-0"
                                    // alt="media from user post" 
                                    controls
                                    autoPlay={false}
                                >
                                    <source src={`${IMAGE_URL}${item?.mediaRef}`} type="video/mp4" />
                                </video>
                            }
                        </GridItem>
                    )
                })}
            </Grid>
            <PostThreads post_index={postId} open={open} setOpen={setOpen} user_index={user_index} />
        </Flex>
    )
}

export default ProfileComponent
