import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../lib/api';
import toast from 'react-hot-toast';

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      // Show success message first
      toast.success("Logged out successfully");
      
      // Clear all queries and wait for it
      await queryClient.clear();
      
      // Small delay to ensure state updates
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 100);
    },
    onError: (error) => {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  });

  return { logoutMutation };
};

export default useLogout;