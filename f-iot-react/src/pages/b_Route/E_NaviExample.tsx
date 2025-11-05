import React from 'react'
import { useNavigate } from 'react-router-dom'

function E_NaviExample() {
  const navigate = useNavigate(); // 정보를 들고 이동 - 정보를 받는 쪽은 useLocation사용

  //^ === EventHandler ===
  const moveToDetail = () => {
    // navigate의 두 번째 인자로 state값 전달
    // navigate(path, options?(객체))
    navigate('/route/detail', { 
      state: {
      userId: 10,
      username: '곰세마리',
      message: '리액트 라우트 훅 공부 중'
      }
    });
  }

  return (
    <div>
      <h2>useNavigate 실습 페이지</h2>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <button onClick={() => navigate('/route/locate')}>Location 페이지로 이동</button>
      <button onClick={moveToDetail}>Detail 페이지로 이동 (+ state 전달)</button>
    </div>
  )
}

export default E_NaviExample