import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";
import { toast } from "sonner";

import {client} from "@/lib/rpc"

type ResponseType= InferResponseType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"], 200>
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"]>

export const useRestInviteCode =()=>{

    const queryClient = useQueryClient();

    const mutation = useMutation <ResponseType,Error,RequestType> ({

        mutationFn: async({ param }) => {
            const response = await client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"]({ param })

            if(!response.ok) throw new Error("Failed to Reset Invite Code");

            return await response.json();
        },

        onSuccess: ({ data }) => {
            toast.success("Invite Code Reset");
            queryClient.invalidateQueries({queryKey:["workspaces"]});
            queryClient.invalidateQueries({queryKey:["workspaces", data.$id]});
        },

        onError: () => {
            toast.error("Failed to Reset Invite Code");
        }

    });
    return mutation;
}