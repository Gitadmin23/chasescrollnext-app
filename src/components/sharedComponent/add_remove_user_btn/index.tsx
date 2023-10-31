import { AddProfileIcon } from '@/components/svg'
import { URLS } from '@/services/urls'
import httpService from '@/utils/httpService'
import { Button, Flex, Spinner, useToast } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { useMutation } from 'react-query'

interface Props {
    name: string,
    user_index: any,
    setJoinStatus: any,
    width?: string,
    search?: boolean,
    icon?: boolean
}

function AddOrRemoveUserBtn(props: Props) {
    const {
        name,
        user_index,
        setJoinStatus,
        width,
        search,
        icon
    } = props

    const [loading, setLoading] = useState("0")
    const toast = useToast()

    const unfriend = useMutation({
        mutationFn: () => httpService.delete(URLS.REMOVE_FRIEND + user_index, {}),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
            toast({
                title: 'Success',
                description: data.data?.message,
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            setLoading("0")
            setJoinStatus("pending")
        }
    });

    const addfriend = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.ADD_FRIEND, data),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
            toast({
                title: 'Success',
                description: data.data?.message,
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            setLoading("0")
            if (data?.data?.message === "Public profile auto friend") {
                setJoinStatus("CONNECTED")
            } else {
                setJoinStatus("FRIEND_REQUEST_SENT")
            }
        }
    });

    const handleadd = React.useCallback(() => {
        setLoading(user_index)
        addfriend.mutate({ toUserID: user_index })
    }, [addfriend, user_index])

    const handleRemove = React.useCallback(() => {
        setLoading(user_index)
        unfriend.mutate()
    }, [unfriend, user_index])

    const clickHandler = () => {
        if (name === "Pending" || name === "Disconnect") {
            handleRemove()
        } else {
            handleadd()
        }
    }

    return (
        <>
            {!icon && (
                <Flex justifyContent={"center"} alignItems={"center"} as={"button"} onClick={clickHandler} _hover={{ backgroundColor: "#5D70F9", color: "white" }} width={width ? width : "full"} rounded={"12px"} height={search ? "35px" : "43px"} bg={name === "Pending" ? "#fff3e7" : name === "Disconnect" ? "brand.chasescrollRed" : "white"} borderColor={(name === "Pending" || name === "Disconnect") ? "" : "brand.chasescrollBlue"} borderWidth={(name === "Pending" || name === "Disconnect") ? "0px" : "1px"} color={name === "Pending" ? "#f78b26" : name === "Disconnect" ? "white" : "brand.chasescrollBlue"} fontSize={search ? "11px" : "sm"} fontWeight={"semibold"}  >
                    {(loading === user_index) ? "Loading..." : name}
                </Flex>
            )}
            {(icon && name !== "Connect") ? (
                <Flex justifyContent={"center"} px={"3"} alignItems={"center"} _hover={{ backgroundColor: "white" }} width={width ? width : "full"} rounded={"12px"} height={search ? "35px" : "43px"} bg={name === "Pending" ? "#fff" : name === "Disconnect" ? "white" : "white"} borderColor={(name === "Pending" || name === "Disconnect") ? "" : "white"} borderWidth={(name === "Pending" || name === "Disconnect") ? "0px" : "0px"} color={name === "Pending" ? "#f78b26" : name === "Disconnect" ? "brand.chasescrollBlue" : "brand.chasescrollBlue"} fontSize={search ? "11px" : "sm"} fontWeight={"semibold"}  >
                    {(loading === user_index) ? "Loading..." : name === "Disconnect" ? "Connected" : name}
                </Flex>
            ) : (
                <>
                    {icon && ( 
                        <Flex as={"button"} onClick={clickHandler}>
                            {(loading === user_index) ? (
                                <Spinner size={"sm"} />
                            ) :
                                <AddProfileIcon />
                            }
                        </Flex>
                    )}
                </>
            )}
        </>
    )
}

export default AddOrRemoveUserBtn
