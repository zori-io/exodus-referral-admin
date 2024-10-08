import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Label, TextInput } from "flowbite-react";
import { useCallback, useContext } from "react";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import authService from "@/appwrite/authConfig";
import { useRouter } from "next/navigation";
import { LoadingContext } from "@/store/LoadingContext";
import { LoginSchema } from "./LoginSchema";
import { AxiosError } from "axios";

interface LoginFormFields {
  email: string;
  password: string;
}

const AuthLogin = () => {
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginFormFields>({
    resolver: yupResolver(LoginSchema),
    mode: "all",
    delayError: 200,
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormFields) => {
      return await authService.signIn({
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: () => {
      setLoading(false);
      router.push("/");
    },
    onError: (error: AxiosError) => {
      setLoading(false);
      setError("root", {
        message: error.message,
      });
    },
  });

  const submitRequest = useCallback(
    async (data: LoginFormFields) => {
      setLoading(true);
      loginMutation.mutate(data);
    },
    [loginMutation, setLoading]
  );

  return (
    <form onSubmit={handleSubmit(submitRequest)}>
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="username"
          type="text"
          sizing="md"
          className="form-control"
          {...register("email")}
        />
        <p className="text-red-700 text-xs my-1 h-5">
          {errors?.email?.message}
        </p>
      </div>
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="userpwd" value="Password" />
        </div>
        <TextInput
          id="userpwd"
          type="password"
          sizing="md"
          className="form-control"
          {...register("password")}
        />
        <p className="text-red-700 text-xs my-1 h-5">
          {errors?.password?.message}
        </p>
      </div>
      <Button
        style={{
          backgroundColor: isValid ? "black" : "gray",
          marginTop: "40px",
        }}
        disabled={!isValid}
        type="submit"
        className="w-full bg-dark border-black"
      >
        Sign in
      </Button>
      <p className="text-red-700 text-xs my-1 h-5">{errors?.root?.message}</p>
    </form>
  );
};

export default AuthLogin;
