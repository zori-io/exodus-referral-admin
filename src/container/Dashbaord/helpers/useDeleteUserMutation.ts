import { notify, notifyError } from "@/components/Toast";
import { deleteUser, deleteUserPayload } from "@/utils/api/deleteUser";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteUserMutation = (refetch: () => void) => {
  return useMutation({
    mutationFn: async ({ documentId }: deleteUserPayload) => {
      const result = await deleteUser({ documentId });
      if (result.error) {
        throw new Error(result.error);
      }
    },
    onSuccess: () => {
      refetch();
      notify("User deleted successfully");
    },
    onError: (error: AxiosError) => {
      notifyError(error?.message);
    },
  });
};
