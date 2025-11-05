import { Route, Routes } from 'react-router-dom';
import './App.css'
import Basic from '@/pages/a_basic';
import RoutePages from '@/pages/b_Route';
import Hooks from '@/pages/c_hooks';
import Navibar from './components/Navibar';
import PostList from './pages/_practices/a_basic/PostList';
import PostDetail from './components/PostDetail';
import SearchApp from './pages/_practices/c_hooks/SearchApp';

function App() {

  return (
    <>
    {/* 경로와 상관없이 렌더링 */}
    <h1>Korea IoT React Lecture</h1>
    <Navibar />

    {/* Routes 태그: Route를 감싸는 컴포넌트 */}
    <Routes>
      {/* Route 태그: 특정 경로에 컴포넌트 지정 (단일 태그 권장) */}
      <Route path='/basic' element={<Basic />}/>
      {/* 
        중첩 라우팅 사용을 위해서 반드시 부모 Route의 path 끝에 /*가 필수임!
        - 중첩된 자식 라우트 인식
      */}
      <Route path='/route/*' element={<RoutePages />}/>

      <Route path='/hooks' element={<Hooks />} />

      {/* //@ _practices 실습 코드 */}
      <Route path='/practice/post' element={<PostList />} />
      <Route path='/practice/post/:id' element={<PostDetail />} />
      <Route path='/practice/search' element={<SearchApp />} />

    </Routes>
    </>
  )
}

export default App
