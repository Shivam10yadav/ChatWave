import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../lib/api';
import toast from 'react-hot-toast';

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      
      // Show success message
      toast.success("Logged out successfully");
      
      // Redirect to login
      navigate('/login');
    },
    onError: (error) => {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  });

  return { logoutMutation };
};

export default useLogout;