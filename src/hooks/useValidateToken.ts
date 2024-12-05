import httpService from "@/utils/httpService";
import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";

const useValidateRoken = () => {
 
    const token = localStorage.getItem('token')+"";

    const toast = useToast()
    
    const { mutate, isLoading, isSuccess } = useMutation({
        mutationFn: (info: any) => httpService.post(`/auth/verification/verify-token`, info),
        onError: (error) => {
            toast({
                title: 'An error occured',
                description: 'Token Has Expired',
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data) => { 
            console.log(data);
            
        },

    });

    // useEffect(()=> {
    //     mutate({
    //         token: token
    //     })
    // }, [])

    return { 
        isLoading
    };
}

export default useValidateRoken