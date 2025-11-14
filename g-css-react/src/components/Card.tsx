import styled from '@emotion/styled'
import React from 'react'

export const CardContainer = styled.div`
  /*
    템플릿 리터럴 내에서 함수 사용 
    ({theme}) => theme.colors.card - 객체를 매개변수로 사용
  */
  background: ${({theme}) => theme.colors.card};
  color: ${({theme}) => theme.colors.text};
  box-shadow: ${({theme}) => theme.colors.shadow};
  
  border-radius: 12px;
  /* //@ 외부 컴포넌트의 padding에 clamp 사용 */
  padding: clamp(1rem, 2.5vw, 1.75rem); // (min, preferred(반응형으로 변화하는 값), max)
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CardTitle = styled.div`
  margin: 0;
  /* //@ 내부 글자에 clamp 사용 */
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${({theme}) => theme.colors.accent};
`;