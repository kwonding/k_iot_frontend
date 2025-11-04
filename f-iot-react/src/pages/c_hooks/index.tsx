import React, { useEffect, useState } from 'react';
import State01 from './a_useState/State01';
import State02 from './a_useState/State02';
import State03 from './a_useState/State03';
import State04 from './a_useState/State04';
import State05 from './a_useState/State05';
import State06 from './a_useState/State06';
import Ref01 from './b_useRef/Ref01';
import CollapsibleSection from '@/components/CollapsibleSection';
import Ref02 from './b_useRef/Ref02';
import Effect01 from '../c_useEffect/Effect01';
import Effect02 from '../c_useEffect/Effect02';
import Effect_Practice01 from '../c_useEffect/Effect_Practice01';
import Ref_Practice01 from './b_useRef/Ref_Practice01';
import Ref_Practice02 from './b_useRef/Ref_Practice02';

// const h2Style = {
//   backgroundColor: 'black',
//   color: 'orange',
//   padding: '8px',
//   cursor: 'pointer',
// };


//  Index 컴포넌트
function Index() {
  // 섹션 개수 자동 반영
  const sectionCount = 3;
  const [sections, setSections] = useState<boolean[]>(Array(sectionCount).fill(false));

  // 최신 섹션만 열기
  useEffect(() => {
    setSections(Array(sectionCount).fill(false).map((_, i) => i === sectionCount - 1));
  }, [sectionCount]);

  // 클릭 시 해당 섹션만 열기
  const toggleSection = (index: number) => {
    setSections(prev => prev.map((_, i) => i === index ? !prev[i] : false));
  };


  return (
    <div>
      <h1 style={{ backgroundColor: 'black', color: 'white', padding: '8px' }}>
        === 리액트 Hooks ===
      </h1>

      <CollapsibleSection
        title="1. 리액트 Hooks - useState"
        isOpen={sections[0]}
        onToggle={() => toggleSection(0)}
      >
        <State01 /> <hr />
        <State02 /> <hr />
        <State03 /> <hr />
        <State04 /> <hr />
        <State05 /> <hr />
        <State06 /> <hr />
      </CollapsibleSection>

      <CollapsibleSection
        title="2. 리액트 Hooks - useRef"
        isOpen={sections[1]}
        onToggle={() => toggleSection(1)}
      >
        <Ref01 /> <hr />
        <Ref02 /> <hr />
        <Ref_Practice01 /> <hr />
        <Ref_Practice02 /> <hr />
      </CollapsibleSection>

      <CollapsibleSection
        title="3. 리액트 Hooks - useEffect"
        isOpen={sections[2]}
        onToggle={() => toggleSection(2)}
      >
        <Effect01 /> <hr />
        <Effect02 /> <hr />
        <Effect_Practice01 /> <hr />

      </CollapsibleSection>
    </div>
  );
}

export default Index;