import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetWorkspaces = () => {

    const query = useQuery({ queryKey : ["woekspaces"] , queryFn : async () => {

            const response = await client.api.workspaces.$get();

            if(!response.ok) throw new Error("Failted to fetch Workspaces");

            const { data } = await response.json();

            return data;
        },
    });

    return query;

}