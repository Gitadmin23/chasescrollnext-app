import { useDetails } from "@/global-state/useUserDetails";
import { IUser } from "@/models/User";
import { IDonationList } from "@/models/donation";
import { URLS } from "@/services/urls";
import httpService from "@/utils/httpService";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

const useGetDonationList = () => {


    const [data, setData] = React.useState<Array<IDonationList>>([]); 

    const { isLoading, isRefetching, refetch } = useQuery(
        ["getDonationList"],
        () => httpService.get(`/fund-raiser/search`),
        {
            // enabled: token ? false : true,
            onSuccess: (data) => {
                console.log(data?.data?.content);
                
                setData(data.data?.content); 
            }, 
        },
    ); 

    return {
        data,
        isLoading,
        refetch
    };
}

export default useGetDonationList