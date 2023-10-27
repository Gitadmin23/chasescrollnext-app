import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Button, Flex, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CgMore } from "react-icons/cg";

interface Props {
    user_index: any,
    setDeleted: any,
    deleted: any
}

function BlockBtn(props: Props) {
    const {
        user_index,
        setDeleted,
        deleted
    } = props

    const [showModal, setShowModal] = useState("0")
    const [loading, setLoading] = useState("0")
    const toast = useToast()

    const blockSuggestion = async () => {
        setLoading(user_index)
        const response = await httpService.post(URLS.BLOCK_USER, {
            blockType: "USER",
            typeID: user_index,
        }) 
        console.log(response?.data?.message);
        
        toast({
            title: 'Success',
            description: response?.data?.message,
            status: 'success',
            isClosable: true,
            duration: 5000,
            position: 'top-right',
        }); 
        setDeleted([...deleted, user_index])
        setLoading("")
    }

    return (
        <Flex position={"relative"} width={"full"} >
            <Box as="button" onClick={()=> setShowModal(user_index)} ml={"auto"} >
                <CgMore size={25} />
            </Box>
            {showModal === user_index && ( 
                <Box position={"absolute"} zIndex={"20"} right={"0px"} left={"0px"} top={"25px"}  >
                    <Button onClick={blockSuggestion} fontSize={"sm"} width={"full"}>
                        {loading === user_index ? "Loading.." : "Block"}
                    </Button>
                </Box>
            )}
            {showModal === user_index && ( 
                <Box onClick={()=> setShowModal("0")} position={"fixed"} inset={"0px"} zIndex={"10"}/>
            )}
        </Flex>
    )
}

export default BlockBtn
