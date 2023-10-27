import { URLS } from '@/services/urls'
import httpService from '@/utils/httpService'
import { Button, useToast } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { useMutation } from 'react-query'

interface Props {
    name: string,
    user_index: any,
    setJoinStatus: any,
    width?: string
}

function AddOrRemoveUserBtn(props: Props) {
    const {
        name,
        user_index,
        setJoinStatus,
        width
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
            setJoinStatus("CONNECTFriend")
        }
    });

    const handleadd = React.useCallback(() => {
        setLoading(user_index)
        addfriend.mutate({ toUserID: user_index })
    }, [])

    const handleRemove = React.useCallback(() => {
        setLoading(user_index)
        unfriend.mutate()
    }, [])

    const clickHandler = () => {
        if (name === "Pending" || name === "Disconnected") {
            handleRemove()
        } else {
            handleadd()
        }
    }

    return (
        <Button onClick={clickHandler} width={width ? width: "full"} rounded={"12px"} bg={(name === "Pending" || name === "Disconnected") ? "brand.chasescrollRed" : "brand.chasescrollBlue"} color={"white"} fontSize={"sm"}  >
            {(loading === user_index) ? "Loading..." : name}
        </Button>
    )
}

export default AddOrRemoveUserBtn
