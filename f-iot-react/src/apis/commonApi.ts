//! commonApi.ts
// : 페이지 전역 공통 데이터값 호출 API
// - 웹 페이지 구성을 위한 데이터이기 때문에 public 호출 - token 필요X

import { publicApi } from "./axiosInstance"

export interface CommonResponse { // 원래 types 폴더
  categories: string[];
  regions: string[];
}

export const getCommons = async () => {
  const res = await publicApi.get('/common');
  return res.data.data;
}