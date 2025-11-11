// 인증 객체 처리

import { refreshAccessToken, signIn, signOut } from "@/apis/authApi";
import { create  } from "zustand";

//! User 인터페이스 정의
// : 현재 로그인 된 사용자 정보를 표현하는 타입
// 전역 상태 관리 될 사용자 데이터
interface User {
  id: number;             // 사용자 고유 ID
  loginId: string;        // 사용자 로그인 ID (username 같은 것)
  // nickname: string;
}

//! AuthState 인터페이스 정의
// : zustand 스토어가 관리할 전체 상태 (데이터 + 함수)를 정의

export interface AuthState {
  //@ 현재 로그인한 사용자 정보 (로그인 안 했을 경우: null)
  user: User | null;
  //@ 현재 보유 중인 Access 토큰 상태 (JWT)
  accessToken: string | null;
  //@ 로딩 상태 (로그인, 갱신 중인지 여부)
  isLoading: boolean;
  //@ 예외 상태 (로그인 오류 메시지 저장용)
  error: string | null; 
  // 인증 여부 (토큰이 유효하고 사용자 정보가 있으면 true)
  // isAuthenticated: boolean;

  //^ 액션(Actions): 상태 변경 또는 비즈니스 로직 수행 함수
  //@ 로그인 처리 함수 (비동기, API 요청)
  login: (loginId: string, password: string) => Promise<void>;
  //@ 로그아웃 처리 함수
  logout: () => Promise<void>;
  //@ 사용자 정보 직접 갱신
  setUser: (u: User | null) => void;
  //@ 액세스 토큰 직접 갱신
  setAccessToken: (token: string | null) => void;
  //@ 리프레시 토큰 재갱신
  tryRefreshToken: () => Promise<void>;
}

//! Zustand 스토어 생성
// create<AuthState>: AuthState 타입을 기반으로 스토어 구조를 강제
export const useAuthStore = create<AuthState>(
  // 인자) set: 스토어 내부 상태 설정 함수
  // 반환) AuthState 타입 객체
  //      > 소괄호로 감싸서 반환
  set => ({
    //? == 기본 상태 초기화 ==
    user: null,             // 처음엔 로그인된 사용자 없음
    accessToken: null,      // 처음엔 토큰 없음
    isLoading: false,       // 로그인/갱신 로딩 상태 아님
    error: null,            // 에러 메시지 없음

    //? == 액션 정의 (함수 정의) ==
    //@ setUser 함수: 상태에 user값을 직접 설정
    setUser: (u) => set({user: u}),

    //@ setAccessToken 함수: 상태에 accessToken값을 직접 설정
    setAccessToken: (token) => set({ accessToken: token }),

    //@ login 함수: 로그인 API 요청(비동기) + 상태 업데이트
    login: async (loginId, password) => {
      // 로딩 시작
      set({ isLoading: true, error: null });
      try {
        // 서버로 로그인 요청
        const data = await signIn({loginId, password});

        // 로그인 성공 시 상태 업데이트
        // : 백엔드의 data값 활용하여 업데이트
        set({
          user: {id: 1, loginId: data.username },   // 서버 응답에 따라 유저 정보 저장
          accessToken: data.accessToken,            // 받은 엑세스 토큰 저장
          isLoading: false                          // 로딩 종료
        });
      } catch (e) {
        // 로그인 실패 시 에러 상태 저장
        set({
          isLoading: false,
          error: (e as Error).message ?? "로그인 실패",
        });
      }
    },
    logout: async () => {
      try {
        // 서버에 로그아웃 요청
        // : 서버에서 refreshToken 쿠키 삭제 등을 처리
        await signOut();
      } finally {
        set({
          user: null,
          accessToken: null
        });
      }
    },
    // 액세스 토큰 자동 갱신 시도
    tryRefreshToken: async () => {
      try {
        // 새로운 accessToken을 요청하는 API 호출
        // : 쿠키에 저장된 refreshToken을 자동으로 서버에 전송
        const newToken = await refreshAccessToken();

        // 새 토큰을 상태에 저장 - 사용자가 로그인 상태를 유지할 수 있게 됨
        set({accessToken: newToken});
      } catch (e) {
        set({user: null, accessToken: null, error: (e as Error).message})
      }
    },
  })
);


//? set 설정 함수
//? get 함수

//? Zustand 미들웨어
// 1) devtools(디버깅 툴 연동)
// : React 상태 관리 라이브러리에서 브라우저 개발자 도구와 연결해주는 역할
// - dispatch되는 액션을 가로채서 개발자 도구에 상태 변화를 기록 + 상태 추적
//    > 디버깅 용이

// 2) persist(로컬스토리지 저장)
// : 상태를 지정된 스토리지에 저장하고, 앱이 다시 로드될 때 이 저장소에서 상태를 복원