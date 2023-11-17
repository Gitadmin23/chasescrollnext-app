import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import BlockBtn from '../../sharedComponent/blockbtn'
import UserImage from '@/components/sharedComponent/userimage'
import AddOrRemoveUserBtn from '../../sharedComponent/add_remove_user_btn'
import { useRouter } from 'next/navigation'

interface Props {
    mutuals?: number,
    data:any,
    firstName: any,
    lastName: any,
    publicProfile: boolean,
    userId: any, 
    setDeleted?:any,
    deleted?:any
}

function UserExploreCard(props: Props) {
    const {
        mutuals = 0,
        data,
        firstName,
        lastName, 
        userId, 
        setDeleted,
        deleted
    } = props 

    const [isFriend, setisFriend] = useState(data?.joinStatus)
    const router = useRouter()

    return (
        <Flex as={"button"} alignItems={"center"} onClick={()=> router.push("/dashboard/profile/" + userId)} flexDirection={"column"} width={"180px"} gap={"12px"}  roundedBottom={"24px"} roundedTopLeft={"24px"} shadow={"lg"} p={"12px"} pb={"24px"} bg={"brand.chasescrollWhite"}>
            <BlockBtn setDeleted={setDeleted} deleted={deleted} user_index={userId} />
            <Flex alignItems={"center"} width={"full"} gap={["1", "1", "2"]} flexDirection={"column"} >
                <UserImage data={data} size={20} image={data?.data?.imgMain?.value} />
            </Flex>
            <Text fontWeight={"bold"} textAlign={"center"} fontSize={"sm"} >{(firstName+" "+lastName).length > 14 ? (firstName+" "+lastName).slice(0, 14)+"...": (firstName+" "+lastName)}</Text>
            <Text color={"brand.chasescrollGrey"} fontWeight={"semibold"} textAlign={"center"} fontSize={"xs"} >
            {mutuals} Mutual Connection{mutuals === 1 ? "" : "s"}
            </Text>
            <AddOrRemoveUserBtn name={(isFriend === "CONNECTED" || isFriend === "CONNECTFriend" || isFriend === "FRIEND_REQUEST_SENT" || isFriend === "FRIEND_REQUEST_RECIEVED") ? (isFriend === "FRIEND_REQUEST_SENT" || isFriend === "FRIEND_REQUEST_RECIEVED") ? "Pending" : isFriend === "CONNECTFriend" ? "Disconnect": "Disconnect": "Connect"} setJoinStatus={setisFriend} user_index={userId} />
        </Flex>
    )
}

export default UserExploreCard
