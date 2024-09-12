import toast from "react-hot-toast";

export const notify = (message: string) => toast.success(message);
export const notifyError = (message: string) => toast.error(message);
