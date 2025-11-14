import styled from '@emotion/styled'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

//! mock data - simple line chart
const data = [
  {name: '월', sales: 120},
  {name: '화', sales: 200},
  {name: '수', sales: 180},
  {name: '목', sales: 230},
  {name: '금', sales: 300},
  {name: '토', sales: 400},
  {name: '일', sales: 330},
]

const ChartBox = styled.div`
  width: 100%;
  height: clamp(160px, 32vh, 320px);
`;

function SalesChartRecharts() {
  return (
    <ChartBox>
      {/* 
        Recharts 컴포넌트: ResponsiveContainer 
        > 반응형 컨테이터
        > 하위 children 요소 필수 (반응형으로 관리될 데이터)
      */}
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          data={data} margin={{top: 8, right: 12, left: 0, bottom: 0}}
        >
          {/* CartesianGrid: 차트 배경에 격자선(Grid) */}
          {/* 속성: strokeDasharray: 점선을 3px 그려짐 + 3px 비워짐 */}
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
          {/* dataKey: 넣어둔 데이터(배열)의 X값 설정 */}
          <XAxis dataKey='name' tick={{fontSize: 12}} />
          <YAxis tick={{fontSize: 12}} />
          {/* 마우스 hover 시 데이터 값을 보여주는 팝업 출력 */}
          <Tooltip />
          {/* 
            type: 곡선 형태 설정 
            >> monotone-일반 곡선, linear-직선, step-계단형, basis-더 부드러운 곡선

            dataKey: 데이터 배열의 Y값 설정
            stroke: 선의 색상

          */}
          <Line 
            type='monotone' 
            dataKey='sales' 
            stroke='#fb923c'
            // 선 두께: 배수값
            strokeWidth={2}
            // 점의 크기 설정
            // : dot={false} - 점 없음
            dot={{ r: 3 }}

            // lineChart에 fill을 넣으면 아래 부분이 채워짐
            // - 실제로는 Area 영역 사용 권장
            fill='#ffedd5'
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartBox>
  )
}

export default SalesChartRecharts