// 인증 객체 처리

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// 전역 상태 관리 될 사용자 데이터
interface User {
  id: number;
  loginId: string;
  // nickname: string;
}

export interface AuthState {
  //@ 현재 로그인한 사용자 정보 (로그인 안 했을 경우: null)
  user: User | null;
  //@ 로딩 상태 (로그인/로그아웃 요청 중 true)
  isLoading: boolean;
  //@ 토큰 상태
  accessToken: string | null;
  //@ 예외 상태
  error: string | null; 
  // 인증 여부 (토큰이 유효하고 사용자 정보가 있으면 true)
  // isAuthenticated: boolean;

  //^ 액션(Actions)
  //@ 로그인 함수 (비동기, API 요청)
  login: (loginId: string, password: string) => Promise<void>;
  //@ 로그아웃 함수
  logout: () => void;
  //@ 사용자 설정 함수
  setUser: (u: User | null) => void;
  //@ 토큰 설정 함수
  setAccessToken: (token: string | null) => void;
  //@ 리프레시 토큰 설정 함수
  refreshToken: () => Promise<void>;
}

//? set 설정 함수
//? get 함수

//? 미들웨어
// 1) devtools
// : React 상태 관리 라이브러리에서 브라우저 개발자 도구와 연결해주는 역할
// - dispatch되는 액션을 가로채서 개발자 도구에 상태 변화를 기록 + 상태 추적
//    > 디버깅 용이

// 2) persist
// : 상태를 지정된 스토리지에 저장하고, 앱이 다시 로드될 때 이 저장소에서 상태를 복원

const enhancers = (f: any) => {
  const persistOptions = {
    name: 'app-storage', // 로컬 스토리지 키 이름
  }

  return import.meta.env.MODE === 'production'
  ? persist(f, persistOptions)
  : devtools(persist(f, persistOptions));
} 

export const useAuthStore = create<AuthState>(
  enhancers((set, get) => ({
    user: null,
    accessToken: null,
    isLoading: false,
    error: null,

    login,
    logout,
    setUser: (u) => set({user: u}),
    setAccessToken,
    refreshToken,
  })));