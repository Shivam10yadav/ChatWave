import { useQuery } from '@tanstack/react-query'
import { getAuthUser } from '../lib/api'

const useAuthUser = () => {
const { data, isPending, isError, fetchStatus } = useQuery({
  queryKey: ["authUser"],
  queryFn: getAuthUser,
  retry: false,
  staleTime: 5 * 60 * 1000,
  refetchOnWindowFocus: false, // ✅ Add this line
})
console.log("Query Debug:", { isPending, isError, fetchStatus, data })
  return { 
    isLoading: isPending, 
    authUser: data?.user,
    isError 
  }
}

export default useAuthUser