// '객체' 멤버 접근 방법
// : 멤버(속성, 메서드)
// - 객체는 각 요소값에 대해 '키'를 통해 접근

// 1) 점표기법
// - 객체명.속성명
// - 객체명.메서드명()

// 2) 대괄호 표기법
// - 객체명[속성명]
// - 객체명[메서드명]

let dog = {
  // == 프로퍼티 ==
  name: {
    last: 'choco',
    first: 'coco'
  },
  age: 3,
  color: 'brown',
  favoriteToy: ['곰인형', '탱탱볼'],

  // == 메서드 ==
  bark: function() {
    console.log('멍멍');
  },

  greet: function() {
    console.log(`Hello, ${this.name}`);
    console.log(`Hello, ${this.name.last}`);
  } // 모든 멤버 구현 이후에는 콤마 생략! 이 외 콤마 필수
}

// 1) 점 표기법
console.log(dog.age); // 3
console.log(dog.name.first); // coco

dog.greet(); 
//Hello, [object Object]
//Hello, choco

// 2) 대괄호 표기법
// : 객체명에 []첨부하여 ''안에 키 값을 문자열로 전달
console.log(dog['age']); // 3
console.log(dog['name']); // { last: 'choco', first: 'coco' }
dog['bark']; // 함수 접근 (호출 X)
dog['bark'](); // 함수 호출 // 멍멍

// +) 객체 프로퍼티에 속성 추가
// : 객체명.프로퍼티명 = 값 (데이터);