import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../lib/api';
import toast from 'react-hot-toast';

const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      
      // Remove all queries
      queryClient.removeQueries();
      
      // Force hard reload to /login (this clears everything)
      window.location.href = '/login';
    },
    onError: (error) => {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
      
      // Even on error, force logout
      queryClient.removeQueries();
      window.location.href = '/login';
    }
  });

  return { logoutMutation };
};

export default useLogout;