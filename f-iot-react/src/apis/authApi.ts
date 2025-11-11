import { privateApi, publicApi } from "./axiosInstance";

interface SignInRequest {
  loginId: string;
  password: string;
}

interface SignInResponse {
  username: string;
  accessToken: string;
}

//! 로그인
export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  const res = await publicApi.post('/auth/sign-in', data);
  // axios.post(url, data, config?) - url: 경로, data: 요청 본문, config: 헤더, 토큰, 옵션 등

  if (!res.data.success) throw new Error(`login failed`) // 서버가 보낸 JSON의 success 값
  return res.data.data;
}

//! 로그아웃
export const signOut = async (): Promise<void> => {
  await privateApi.post("/auth/sign-out");
}

//! Access 토큰 리프레스
export const refreshAccessToken = async (): Promise<string> => {
  const res = await publicApi.post("/auth/refresh-token", {}, {withCredentials: true});
  if (!res.data.success) throw new Error('Refresh failed');
  return res.data.data.accessToken;
}