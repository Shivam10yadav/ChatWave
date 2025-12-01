import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { login } from '../lib/api'
import { LogIn } from 'lucide-react'

const useLogin = () => {
    const queryClient=useQueryClient()
  const {mutate:loginMutation,isPending,error}=useMutation({
    mutationFn:login,
    onSuccess:()=>queryClient.invalidateQueries({queryKey:["authUser"]})
  })
  return {error,isPending,loginMutation}
    
  
}

export default useLogin