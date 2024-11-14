import { IUser } from "@/models/User";
import { IDonationList } from "@/models/donation"; 
import httpService from "@/utils/httpService";
import React from "react";
import { useQuery } from "react-query";

interface IProps { 
    name: string,
    fundRaisers: Array<IDonationList>,
    user: IUser,
    id: string
}

const useGetDonationGroup = (id?: string) => {


    const [data, setData] = React.useState<Array<IProps>>([]);

    const { isLoading, isRefetching, refetch } = useQuery(
        ["getDonationGroup", id],
        () => httpService.get(`/fund-raiser-group/search`),
        {
            onSuccess: (data) => {
                setData(data?.data?.content)
            }
        },
    );

    return {
        data,
        isLoading,
        refetch,
        isRefetching
    };
}

export default useGetDonationGroup