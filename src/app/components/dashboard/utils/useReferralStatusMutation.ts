import { useMutation } from "@tanstack/react-query";
import { notify, notifyError } from "@/components/Toast";
import {
  updateReferralStatus,
  updateReferralStatusPayload,
} from "@/utils/api/updateReferralStatus";

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
    onError: (error: any) => {
      notifyError(error?.message);
    },
  });
};
