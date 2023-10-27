import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import BlockBtn from './blockbtn'
import UserImage from '@/components/sharedComponent/userimage'
import AddOrRemoveUserBtn from '../../sharedComponent/add_remove_user_btn'

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

    return (
        <Flex flexDirection={"column"} width={"180px"} gap={"12px"}  roundedBottom={"24px"} roundedTopLeft={"24px"} shadow={"lg"} p={"12px"} pb={"24px"} bg={"brand.chasescrollWhite"}>
            <BlockBtn setDeleted={setDeleted} deleted={deleted} user_index={userId} />
            <Flex alignItems={"center"} gap={["1", "1", "2"]} flexDirection={"column"} >
                <UserImage data={data} size={20} />
            </Flex>
            <Text fontWeight={"bold"} textAlign={"center"} fontSize={"sm"} >{(firstName+" "+lastName).length > 14 ? (firstName+" "+lastName).slice(0, 14)+"...": (firstName+" "+lastName)}</Text>
            <Text color={"brand.chasescrollGrey"} fontWeight={"semibold"} textAlign={"center"} fontSize={"xs"} >
            {mutuals} Mutual Connection{mutuals === 1 ? "" : "s"}
            </Text>
            <AddOrRemoveUserBtn name={(isFriend === "FRIEND_REQUEST_RECIEVED" || isFriend === "FRIEND_REQUEST_SENT" || isFriend === "CONNECTED" || isFriend === "CONNECTFriend") ? isFriend === "FRIEND_REQUEST_SENT" ? "Pending" : isFriend === "CONNECTFriend" ? "Disconnected": "Disconnected": "Connect"} setJoinStatus={setisFriend} user_index={userId} />
        </Flex>
    )
}

export default UserExploreCard
