import { useMutation } from "@tanstack/react-query";
import {
  updateReferralStatus,
  updateReferralStatusPayload,
} from "@/utils/api/updateReferralStatus";
import { notify, notifyError } from "@/components/Toast";
import { AxiosError } from "axios";

export const useReferralStatusMutation = (refetch: () => void) => {
  return useMutation({
    mutationFn: async ({ documentId, status }: updateReferralStatusPayload) => {
      const result = await updateReferralStatus({ documentId, status });
      if (result.error) {
        throw new Error(result.error);
      }
    },
    onSuccess: () => {
      refetch();
      notify("Referral status updated successfully");
    },
    onError: (error: AxiosError) => {
      notifyError(error?.message);
    },
  });
};
