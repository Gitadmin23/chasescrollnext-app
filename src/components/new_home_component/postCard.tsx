import { IMediaContent } from '@/models/MediaPost'
import { Button, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import UserImage from '../sharedComponent/userimage'
import { textLimit } from '@/utils/textlimit'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { IMAGE_URL } from '@/services/urls'
import VideoPlayer from '../general/VideoPlayer'
import ImageSlider from '../modals/mediapostPages/ImageSlider'
import { HomeCommentIcon, HomeHeartFillIcon, HomeHeartIcon } from '../svg'
import useCustomTheme from '@/hooks/useTheme'
import useHome from '@/hooks/useHome'
import { CgMoreVertical } from 'react-icons/cg'
import ShareBtn from '../sharedComponent/new_share_btn'
import ModalLayout from '../sharedComponent/modal_layout'
import CustomText from '../general/Text'
import ReportUserModal from '../modals/Home/ReportModal'
import CommentSection from './commentSection'
import CustomButton from '../general/Button'
import { useRouter } from 'next/navigation'


export default function PostCard(props: IMediaContent) {

    const {
        user,
        comments,
        text,
        type,
        mediaRef,
        multipleMediaRef,
        likeStatus,
        likeCount,
        commentCount,
        id
    } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();

    const { likesHandle, loadingLikes, liked, setLiked, setLikeCount, likeCount: count, deletePost, deletingPost, deleteModal, setDeleteModal } = useHome()

    const [showReportModal, setShowReportModal] = useState(false);
    const [open, setOpen] = useState(false)
    const [openImage, setOpenImage] = useState(false)
    const [openComments, setOpenComments] = useState(false)

    const router = useRouter()

    useEffect(() => {
        setLiked(likeStatus ?? "")
        setLikeCount(likeCount ?? 0)
    }, [])


    const deleteHandler = () => {
        setOpen(false)
        setDeleteModal(true)
    }

    const reportHandler = () => {
        setOpen(false)
        setShowReportModal(true)
    }

    return (
        <Flex style={{ boxShadow: "0px 2px 8px 0px #0000000D" }} borderWidth={"0.5px"} bg={mainBackgroundColor} borderColor={borderColor} borderRadius={"36px"} borderTopRightRadius={"0px"} p={"5"} >
            <Flex w={"full"} gap={"3"} flexDir={"column"} >
                <Flex alignItems={"center"} gap={"3"} h={"78px"} w={"full"} rounded={"full"} borderWidth={"1px"} borderColor={borderColor} px={"4"} >
                    <Flex as={"button"} onClick={()=> router?.push(`/dashboard/profile/${user?.userId}`)} alignItems={"center"} gap={"3"} >
                        <UserImage size={"55px"} font={"20px"} data={user} image={user?.data?.imgMain?.value} />
                        <Flex flexDir={"column"} textAlign={"left"}  >
                            <Text color={"#233DF3"} >{textLimit(capitalizeFLetter(user?.firstName) + " " + capitalizeFLetter(user?.lastName), 40)}</Text>
                            <Text fontSize={"14px"} >@{user?.username}</Text>
                        </Flex>
                    </Flex>
                    <Flex onClick={() => setOpen(true)} as={"button"} ml={"auto"} pr={"1"} >
                        <CgMoreVertical size={"25px"} />
                    </Flex>
                </Flex>
                <Text>{text}</Text>
                {(type === "WITH_IMAGE" || type === "WITH_VIDEO_POST") &&
                    <Flex w={"full"} h={["236px", "236px", "236px", "350px", "350px"]} rounded={"16px"} borderWidth={"1px"} roundedTopRight={"0px"}>
                        {type === "WITH_VIDEO_POST" && (
                            <VideoPlayer
                                src={`${mediaRef}`}
                                measureType="px"
                            />
                        )}
                        {type === "WITH_IMAGE" && (
                            <Flex w={"full"} as={"button"} onClick={() => setOpenImage(true)} >
                                <ImageSlider links={multipleMediaRef} type="feed" />
                            </Flex>
                        )}
                    </Flex>
                }
                <Flex w={"full"} borderTopWidth={"1px"} pt={"4"} justifyContent={"space-between"} >
                    <Flex w={"fit-content"} alignItems={"center"} gap={"2px"} >
                        {!loadingLikes ?
                            <Flex
                                width={"24px"}
                                h={"30px"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                as={"button"}
                                onClick={() => likesHandle(id)}
                            >
                                {liked !== "LIKED" && (
                                    <HomeHeartIcon color={bodyTextColor} />
                                )}
                                {liked === "LIKED" && <HomeHeartFillIcon />}
                            </Flex> :
                            <Flex
                                width={"24px"}
                                h={"30px"}
                                justifyContent={"center"}
                                alignItems={"center"}>
                                <Spinner size={"sm"} />
                            </Flex>
                        }
                        <Text>{count}</Text>
                    </Flex>
                    <Flex as={"button"} onClick={() => setOpenComments(true)} w={"fit-content"} alignItems={"center"} gap={"2px"} >
                        <Flex
                            width={"24px"}
                            h={"30px"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            color={bodyTextColor}
                        >
                            <HomeCommentIcon color={bodyTextColor} />
                        </Flex>
                        <Text>{commentCount}</Text>
                    </Flex>
                    <Flex w={"fit-content"} alignItems={"center"} gap={"2px"} >
                        <ShareBtn type="POST" id={id} />
                    </Flex>
                </Flex>
            </Flex>
            <ModalLayout open={open} close={setOpen} size={"xs"} >
                <Flex w={"full"} flexDir={"column"} bg={mainBackgroundColor} >
                    <Flex as={"button"} w={"full"} h={"60px"} borderColor={borderColor} borderBottomWidth={"1px"} justifyContent={"center"} alignItems={"center"} >
                        <ShareBtn type="POST" id={id} istext={true} />
                    </Flex>
                    <Flex onClick={() => deleteHandler()} as={"button"} w={"full"} color={"#E90303"} h={"60px"} borderColor={borderColor} borderBottomWidth={"1px"} justifyContent={"center"} alignItems={"center"} >
                        Delete Content
                    </Flex>
                    <Flex onClick={() => reportHandler()} as={"button"} w={"full"} h={"60px"} borderColor={borderColor} borderBottomWidth={"1px"} justifyContent={"center"} alignItems={"center"} >
                        Report User
                    </Flex>
                    <Flex onClick={() => setOpen(false)} as={"button"} w={"full"} color={"#E90303"} h={"60px"} justifyContent={"center"} alignItems={"center"} >
                        Cancel
                    </Flex>
                </Flex>
            </ModalLayout>

            <ModalLayout open={deleteModal} close={setDeleteModal} size={"xs"} >
                <Flex width='100%'  bg={mainBackgroundColor} justifyContent={'center'} height='100%' alignItems={'center'} gap={"3"} p={"5"} flexDir={"column"} >
                    <Image alt='delete' src='/assets/images/deleteaccount.svg' />
                    <CustomText fontFamily='DM-Bold' textAlign={'center'} fontSize={'20px'}>Delete Post</CustomText>
                    <CustomText fontFamily={'DM-Regular'} textAlign={'center'} fontSize={'16px'} >Are you sure you want to delete this Post? this action cannot be undone.</CustomText>

                    <Button isDisabled={deletingPost} isLoading={deletingPost} onClick={() => deletePost(id)} width='100%' height='42px' bg='red' color="white" variant='solid'>Delete</Button>
                    <Button onClick={() => setDeleteModal(false)} width='100%' height='42px' borderWidth={'0px'} variant='outline' outlineColor={borderColor}>Cancel</Button>
                </Flex>
            </ModalLayout>
            <ReportUserModal
                typeID={id}
                REPORT_TYPE="REPORT_USER"
                isOpen={showReportModal}
                onClose={() => setShowReportModal(false)}
            />
            <ModalLayout size={["full", "full", "2xl"]} open={openComments} close={setOpenComments} >
                <CommentSection close={setOpenComments} count={count} liked={liked} likesHandle={likesHandle} loadingLikes={loadingLikes} content={props} />
            </ModalLayout>
            <ModalLayout size={"2xl"} open={openImage} close={setOpenImage} >
                <Flex  bg={mainBackgroundColor} flexDir={"column"} px={"6"} pt={"8"} w={"full"} >
                    <ImageSlider objectFit={true} links={multipleMediaRef} type="feed" />
                    <Flex w={"full"} justifyContent={"end"} py={"4"} >
                        <CustomButton onClick={() => setOpenImage(false)} text={"Close"} width={"fit-content"} px={"7"} />
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
} 