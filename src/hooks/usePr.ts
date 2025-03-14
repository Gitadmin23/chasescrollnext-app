import httpService from "@/utils/httpService"; 
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";  

const usePr = () => { 

    const query = useQueryClient()
    const toast = useToast()
 
    const createPr = useMutation({
        mutationFn: (data: {
            eventID: string,
            affiliateType: string,
            percent: number
        }) =>
            httpService.put(
                `/events/create-pr-request?eventID=${data?.eventID}&affiliateType=&${data?.affiliateType}&percent=${data?.percent}`, {}
            ),
        onSuccess: (data: any) => {  
            toast({
                title: "success",
                description:data?.data?.message ,
                status: "success",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });
            query?.invalidateQueries("all-events-details")
            
        },
        onError: () => { },
    });

    return {
        createPr
    };
}

export default usePr