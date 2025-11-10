import { publicApi } from "./axiosInstance";

interface SignInRequest {
  loginId: string;
  password: string;
}

export const signIn = async (data: SignInRequest) => {
  const res = await publicApi.post('/auth/sign-in', data);

  if (!res.data.success) throw new Error(`login failed`)
  return res.data.data;
}