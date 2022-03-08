// import React, { useState, useEffect } from "react";

// // // 자식 컴포넌트
// // // React.memo (고착 컴포넌트) text가 바뀌지 않으면 렌더링이 되지 않음.
// // const Textview = React.memo(({ text }) => {
// //   useEffect(() => {
// //     console.log("Update :: Text : ", { text });
// //   });
// //   return <div>{text}</div>;
// // });

// // // 자식 컴포넌트
// // const Countview = React.memo(({ count }) => {
// //   useEffect(() => {
// //     console.log("Update :: count : ", { count });
// //   });
// //   return <div>{count}</div>;
// // });

// const CounterA = React.memo(({ count }) => {
//   useEffect(() => {
//     console.log("CounterA Update - count: ", { count });
//   });

//   return <div>{count}</div>;
// });

// // obj가 객체이기 때문에 (얕은 비교) 리렌더링
// // 객체의 주소에 의한 비교
// // const CounterB = React.memo(({ obj }) => {
// //   useEffect(() => {
// //     console.log("CounterB Update - obj: ", obj.count);
// //   });

// //   return <div>{obj.count}</div>;
// // });

// const CounterB = ({ obj }) => {
//   useEffect(() => {
//     console.log("CounterB Update - obj: ", obj.count);
//   });

//   return <div>{obj.count}</div>;
// };

// // 얕은 비교를 하지 않기 위해 생성
// const areEqual = (prevProps, nextProps) => {
//   // true 이전 프롭스 현재 프로스가 같다. -> 리렌더링을 일으키지 않게 된다.
//   // false 이전과 현재가 다르다 -> 리렌더링을 일으키라
//   // if (prevProps.obj.count === nextProps.obj.count) {
//   //   return true;
//   // }
//   // return false;
//   return prevProps.obj.count === nextProps.obj.count;
// };

// const MemoizedCounterB = React.memo(CounterB, areEqual);

// const OptimizeTest = () => {
//   // // 컴포넌트 재사용하는 테스트용
//   // const [count, setCount] = useState(1);
//   // const [text, setText] = useState("");

//   // 두번째 테스트
//   const [count, setCount] = useState(1);
//   const [obj, setObj] = useState({
//     count: 1,
//   });

//   return (
//     <div style={{ padding: 50 }}>
//       {/* <div>
//         <h2>count</h2>
//         <Countview count={count} />
//         <button onClick={() => setCount(count + 1)}>+</button>
//       </div>

//       <div>
//         <h2>text</h2>
//         <Textview text={text} />
//         <input value={text} onChange={(e) => setText(e.target.value)}></input>
//       </div> */}

//       <div>
//         <h2> Count A</h2>
//         <CounterA count={count} />
//         <button onClick={() => setCount(count)}>A Boutton</button>
//       </div>

//       <div>
//         <h2> Count B</h2>
//         <MemoizedCounterB obj={obj} />
//         <button onClick={() => setObj({ count: obj.count })}>B Boutton</button>
//       </div>
//     </div>
//   );
// };

// export default OptimizeTest;
