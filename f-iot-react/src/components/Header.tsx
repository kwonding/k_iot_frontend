import { useUIStore } from '@/stores/ui.store'
import React from 'react'

function Header() {
  const toggleSidebar = useUIStore(s => s.toggleSidebar);
  const toggleDarkMode = useUIStore(s => s.toggleDarkMode);
  const darkMode = useUIStore(s => s.darkMode);
  const isSidebarOpen = useUIStore(s => s.isSidebarOpen);
  const showToast = useUIStore(s => s.showToast);
  // 구조분해로 작성 시 toggleSidebar만 필요한 상황에서 구조분해 내에 있는 toggleDarkMode, darkMode가 전부 리렌더링 되어야하는 비효율적 상황발생
  // : 따라서 상단의 선택자 버전 코드가 일반적
  // const { toggleSidebar, toggleDarkMode, darkMode ... } = useUIStore();

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: darkMode ? "#222" : "#e4e4e4",
    borderBottom: darkMode ? "1px solid #444" : "1px solid #ccc"
  }

  const handleReserve = () => {
    // 예약 관련 코드 (프론트엔드 유효성 검사 + API 호출 + 응답 성공 완료)
    showToast('예약이 완료되었습니다.');
  }

  return (
    <header style={headerStyle}>
      <h3>Korea IoT React</h3>
      <div>
        <button onClick={toggleSidebar}>{isSidebarOpen ? "close" : "Menu"}</button>
        <button onClick={toggleDarkMode}>{darkMode ? 'Light' : 'Dark'}</button>
        <button onClick={handleReserve}>Reservation</button>
      </div>
    </header>
  )
}

export default Header