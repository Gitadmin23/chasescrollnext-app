import CustomButton from '@/components/general/Button';
import AddOrRemoveUserBtn from '@/components/sharedComponent/add_remove_user_btn';
import BlockBtn from '@/components/sharedComponent/blockbtn';
import ChatBtn from '@/components/sharedComponent/chat_btn';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import ModalLayout from '@/components/sharedComponent/modal_layout';
import ShareEvent from '@/components/sharedComponent/share_event';
import UserImage from '@/components/sharedComponent/userimage';
import { useDetails } from '@/global-state/useUserDetails';
import useCustomTheme from '@/hooks/useTheme';
import { IMAGE_URL, URLS } from '@/services/urls';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import httpService from '@/utils/httpService';
import { Box, Flex, Image, Text, useColorMode, useToast } from '@chakra-ui/react'
import { fstat } from 'fs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { IoMdSettings } from 'react-icons/io';
import { useQuery } from 'react-query';

interface Props {
    user_index: string
}

function ProfileImage(props: Props) {
    const {
        user_index
    } = props

    const toast = useToast()
    const [data, setData] = React.useState([] as any)
    const [showModal, setShowModal] = React.useState(false)
    const [isFriend, setisFriend] = useState(null)
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const { userId, user } = useDetails((state) => state);

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    // react query
    const { isLoading, isRefetching } = useQuery(['get-user-info'], () => httpService.get(URLS.GET_USER_DETAILS + "/" + user_index), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {

            setData(data?.data);
            setisFriend(data?.data?.joinStatus)
        }
    })

    const clickHandler = () => {
        if (userId === user_index) {
            router.push("/dashboard/settings")
        } else {
            setShowModal((prev) => !prev)
        }
    }

    const clickMore = () => {
        if (data?.data?.about?.value?.length > 18) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }

    console.log(data);
    

    return (
        <LoadingAnimation loading={isLoading} >
            <Box position={"relative"} bg={secondaryBackgroundColor} height={"442px"} >
                {data?.data === null && (
                    <Box width='full' height='full' bg='brand.chascrollButtonBlue' position={"absolute"} zIndex={"10"} inset={"0px"}></Box>
                )}
                {(data?.data?.imgMain?.value || (userId === user_index && user?.data?.imgMain?.value)) && (
                    <>
                        <Image id='img_blur' objectFit={"cover"} backdropFilter={"blur(10px)"} width={"full"} height={"full"} position={"absolute"} zIndex={"10"} inset={"0px"} src={(data?.data?.imgMain?.value?.includes('http') ? data?.data?.imgMain?.value : (IMAGE_URL + data?.data?.imgMain?.value))} alt='profile' />

                    </>
                )}
                <Box position={"relative"} zIndex={"10"} width={"fit-content"} pt={"8"} ml={"auto"} mr={"9"} >
                    {userId !== user_index && (
                        <Flex as={"button"} onClick={() => clickHandler()} bgColor={"#00000099"} width={"32px"} rounded={"full"} height={"32px"} justifyContent={"center"} alignItems={"center"} >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5.25C8.58579 5.25 8.25 5.58579 8.25 6C8.25 6.41421 8.58579 6.75 9 6.75H15C15.4142 6.75 15.75 6.41421 15.75 6C15.75 5.58579 15.4142 5.25 15 5.25H9Z" fill="white" />
                                <path d="M5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75H19C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25H5Z" fill="white" />
                                <path d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="white" />
                            </svg>
                        </Flex>
                    )}
                    {userId === user_index && (
                        <CustomButton onClick={() => clickHandler()} borderWidth={"1px"} color={"#5465E0"} mt={"3"} backgroundColor={"#EFF1FE"} fontWeight={"bold"} px={"4"} rounded={"8px"} width={"fit-content"}
                            text={
                                <Flex gap={"1"} alignItems={"center"} >
                                    <IoMdSettings size="25px" fontSize='30px' /> 
                                    Settings
                                </Flex>} />
                        // <Flex as={"button"} onClick={() => clickHandler()} bgColor={"#00000099"} width={"32px"} rounded={"full"} height={"32px"} justifyContent={"center"} alignItems={"center"} >
                        //     <IoMdSettings size="25px" fontSize='30px' color='white' />
                        // </Flex>
                    )}
                    {showModal && (
                        <Box width={"127px"} zIndex={"20"} position={"absolute"} top={"70px"} right={"0px"} shadow={"lg"} bg={"white"} rounded={"16px"} >
                            <Flex width={"full"} justifyContent={"center"} borderBottomColor={"#0000001F"} borderBottomWidth={"1px"} py={"2"} >
                                <BlockBtn data={data} isprofile={true} user_index={user_index} />
                            </Flex>
                            <Flex width={"full"} justifyContent={"center"} borderBottomWidth={"1px"} py={"2"} >
                                <ShareEvent type='PROFILE' isprofile={true} istext={true} id={user_index} />
                            </Flex>
                            <Flex onClick={() => setShowModal((prev) => !prev)} color={"#E90303"} as={"button"} width={"full"} justifyContent={"center"} borderBottomWidth={"0px"} py={"2"} >
                                <Text>Cancel</Text>
                            </Flex>
                        </Box>
                    )}
                    {showModal && (
                        <Box onClick={() => setShowModal((prev) => !prev)} inset={"0px"} position={"fixed"} zIndex={"10"} bg={"black"} opacity={"0.3"} />
                    )}
                </Box>
                <Box position={"absolute"} bottom={"170px"} left={"8"} zIndex={"20"} >
                    <UserImage data={data} image={data?.data?.imgMain?.value} size={["120px", "150px"]} font={["30px", '60px']} />
                </Box>
                <Flex zIndex={"20"} width={"full"} bottom={"0px"} insetX={"0px"} bg={"#00000099"} px={["6", "6", "9"]} height={"150px"} justifyContent={"space-between"} position={"absolute"} alignItems={"center"} >
                    <Box color={"white"} >
                        <Text fontSize={"22px"} fontWeight={"bold"} >{capitalizeFLetter(data?.firstName) + " " + capitalizeFLetter(data?.lastName)}</Text>

                        <Text fontSize={"sm"} >{data?.username}</Text>
                        {data?.showEmail && (
                            <Text fontSize={"sm"} >{data?.email}</Text>
                        )}
                        {(data?.data?.mobilePhone?.value && data?.showEmail) && (
                            <Text fontSize={"sm"} >Phone : {data?.data?.mobilePhone?.value}</Text>
                        )}
                        {data?.data?.about?.value && (
                            <>
                                {data?.data?.about?.value?.length > 18 ? (
                                    <Text display={"flex"} onClick={() => clickMore()} as={data?.data?.about?.value?.length > 18 ? "button" : "text"} fontSize={"sm"} >Bio : {data?.data?.about?.value?.slice(0, 18) + "..."}<Text color={"brand.chasescrollBlue"} fontWeight={"semibold"} >more</Text></Text>
                                ) :
                                    <Text onClick={() => clickMore()} as={data?.data?.about?.value?.length > 18 ? "button" : "text"} fontSize={"sm"} >Bio : {data?.data?.about?.value}</Text>}
                            </>
                        )}
                        {data?.data?.webAddress?.value && (
                            <Text fontSize={"sm"} >Website : {data?.data?.webAddress?.value ?? ""}</Text>
                        )}
                    </Box>
                    {userId === user_index && (
                        <Flex bgColor={mainBackgroundColor} color={"black"} py={"1"} gap={"3"} rounded={"full"} px={"4"} alignItems={"center"} justifyContent={"center"} >
                            <ShareEvent type='PROFILE' isprofile={true} id={user_index} />
                        </Flex>
                    )}

                    {userId !== user_index && (
                        <Flex bgColor={mainBackgroundColor} color={"black"} py={"1"} gap={"3"} rounded={"full"} px={"4"} alignItems={"center"} justifyContent={"center"}>
                            {isFriend && (
                                <AddOrRemoveUserBtn profile={true} icon={true} name={
                                    (isFriend === "CONNECTED" || isFriend === "CONNECTFriend") ?
                                        (isFriend === "FRIEND_REQUEST_RECIEVED" || isFriend === "FRIEND_REQUEST_SENT") ? "Pending" :
                                            isFriend === "CONNECTFriend" ? "Disconnect" :
                                                "Disconnect" :
                                        "Connect"}
                                    setJoinStatus={setisFriend} user_index={user_index} />
                            )}
                            <ChatBtn profile={data} userId={user_index} />
                        </Flex>
                    )}
                    <ModalLayout open={open} close={setOpen} title={userId === user_index ? "About Me" : (capitalizeFLetter(data?.firstName) + " " + capitalizeFLetter(data?.lastName))}>
                        <Box px={"6"} pb={"6"} >
                            <Text>{data?.data?.about?.value}</Text>
                        </Box>
                    </ModalLayout>
                </Flex>
            </Box>
        </LoadingAnimation>
    )
}

export default ProfileImage
