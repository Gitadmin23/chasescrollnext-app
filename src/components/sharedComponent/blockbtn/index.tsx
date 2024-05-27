import { useDetails } from '@/global-state/useUserDetails';
import { BlockList } from '@/models/BlockList';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CgMore } from "react-icons/cg";
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface Props {
    data: any,
    user_index: any,
    setDeleted?: any,
    deleted?: any,
    isprofile?: boolean
}

function BlockBtn(props: Props) {
    const {
        data,
        user_index,
        setDeleted,
        deleted,
        isprofile
    } = props

    const [showModal, setShowModal] = useState("0")
    const [loading, setLoading] = useState("0")
    const [ids, setIds] = useState<string[]>([])
    const [block, setBlock] = React.useState<BlockList | null>(null);
    const toast = useToast();
    const { userId } = useDetails((state) => state);
    const queryClient = useQueryClient()

    console.log(data);


    const self = userId === user_index;

    const { isLoading, isRefetching, refetch } = useQuery(['getBlockList'], () => httpService.get(`${URLS.GET_BLOCKED_LIST}`), {
        onSuccess: (data) => {
            const item: PaginatedResponse<BlockList> = data.data;
            console.log(data);

            const ids = item.content.map((itemm) => {
                if (user_index === itemm?.typeID) {
                    setBlock(itemm)
                }
                return itemm.typeID
            });
            setIds(ids);
        }
    });

    console.log(user_index);

    console.log(ids);


    const handleBlock = useMutation({
        mutationFn: (data: any) => httpService.post(`${URLS.BLOCK_USER}`, data),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: 'user successfully blocked',
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            refetch()
        },
        onError: () => {
            toast({
                title: 'Erro',
                description: 'An error occured while blocking user',
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            refetch()
        }
    });

    const handleUnblock = useMutation({
        mutationFn: () => httpService.delete(`${URLS.UNBLOCK_USER}/${block?.id}`),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: 'user succewssfully blocked',
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            refetch()
        },
        onError: () => {
            toast({
                title: 'Erro',
                description: 'An error occured while blocking user',
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        }
    });

    const blockSuggestion = async (event: any) => {

        event.stopPropagation();
        setLoading(user_index)
        const response = await httpService.post(URLS.BLOCK_USER, {
            blockType: "USER",
            typeID: user_index,
        })

        toast({
            title: 'Success',
            description: response?.data?.message,
            status: 'success',
            isClosable: true,
            duration: 5000,
            position: 'top-right',
        });

        queryClient.invalidateQueries([URLS.GET_SUGGESTED_FRIENDS])
        if (!isprofile) {
            setDeleted([...deleted, user_index])
        }
        setLoading("")
    }

    const clickHandler = (event: any) => {
        event.stopPropagation();
        setShowModal(user_index)
    }


    const closeHandler = (event: any) => {
        event.stopPropagation();
        setShowModal("0")
    }

    return (
        <Flex position={"relative"} width={isprofile ? "fit-content" : "full"} >
            {isprofile && (
                <>
                    {ids.includes(user_index) && (

                        <Button height={"fit-content"} _hover={{backgroundColor : "white"}} fontWeight={"normal"} bgColor={"white"} isLoading={isLoading || isRefetching || handleUnblock?.isLoading} onClick={() => handleUnblock.mutate()} fontSize={"md"} width={"full"}>

                            Unblock
                        </Button>
                    )}
                    {!ids.includes(user_index) && (
                        // <Text onClick={(e) => handleBlock.mutate({
                        //     blockType: "USER",
                        //     typeID: user_index,
                        // })} as={"button"} width={"full"}>
                        //     Block
                        // </Text>

                        <Button height={"fit-content"} _hover={{backgroundColor : "white"}} fontWeight={"normal"} bgColor={"white"} isLoading={isLoading || isRefetching || handleBlock?.isLoading} onClick={() => handleBlock.mutate({
                            blockType: "USER",
                            typeID: user_index,
                        })} fontSize={"md"} width={"full"}>

                             Block
                        </Button>
                    )}
                </>
            )}
            {!isprofile && (
                <Box as="button" onClick={(e: any) => clickHandler(e)} ml={"auto"} >
                    <CgMore size={25} />
                </Box>
            )}
            {showModal === user_index && (
                <Box position={"absolute"} zIndex={"20"} right={"0px"} left={"0px"} top={"25px"}  >
                    <Button onClick={(e) => blockSuggestion(e)} fontSize={"sm"} width={"full"}>
                        {loading === user_index ? "Loading.." : "Block"}
                    </Button>
                </Box>
            )}
            {showModal === user_index && (
                <Box onClick={closeHandler} position={"fixed"} inset={"0px"} zIndex={"10"} />
            )}
        </Flex>
    )
}

export default BlockBtn
