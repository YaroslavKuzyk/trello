
import { useQuery } from "@tanstack/react-query"
import { authApi } from "../api"

export const useMe = () =>  useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.me(),
})