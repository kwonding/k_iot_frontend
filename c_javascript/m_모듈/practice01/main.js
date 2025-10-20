//! 1) add: Named Import (이름 붙여 가져오기)
// - 생성된 이름(수출 파일)으로 사용하거나 중괄호 내에서 별칭 지정 가능
// - 중괄호 사용
import { add, multiply } from './mathModule.js';
console.log(add(10, 5)); // 15

//! 2) subtract: Default import (기본 내보내기)
// - 사용하는 모듈에서 이름 지정 가능 + 단 하나의 모듈만 지정 가능
// - 중괄호 사용 X
import 빼기 from './mathModule.js';
console.log(빼기(3, 1)); // 2

//! 3) multiply: Named Import (as 구문)
import { multiply as mp } from './mathModule.js';
console.log(mp(5, 6)); 30
console.log(multiply(7, 3)); 21

//! 4) divide: 모듈 전체 가져오기 (import * as 별칭)
import * as mathModule from './mathModule.js';
console.log(mathModule.add(5, 7)); // 12
console.log(mathModule.divide(5, 7)); // 0.7142857142857143
console.log(mathModule.divide(5, 0)); // 0으로 나누면 무한대의 수가 생성됩니다.