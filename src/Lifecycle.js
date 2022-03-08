// import React, { useEffect, useState } from 'react';

// // 자식 컴포넌트 만들어도됨 (가독성떄문에 파일을 따로 만드는것을 추천하긴 함)
// const UnmountTest = () => {
//     useEffect(() => {
//         console.log("Mount");

//         return () => {
//             //Unmount 시점에 실행되게 된다.
//             console.log("Unmount");
//         }
//     }, []);

//     return (
//         <div>
//             Unmount Testing Component
//         </div>
//     )
// };

// const Lifecycle = () => {    
//     // const [count, setCount] = useState(0);
//     // const [text, setText] = useState("");

//     // // 컴포넌트가 (Mount시점)탄생하는 순간
//     // useEffect(() => {
//     //     console.log("Mount~");
//     // }, []);
//     // // 업데이트 되는 순간 제어(리렌더링)
//     // // Dependency Array []를 전달 안하면 된다.
//     // useEffect(() => {
//     //     console.log("Update");
//     // })
//     // // 디펜데시에 어레이가 변하게 되면 콜백이 수행
//     // // 배열에 
//     // useEffect(() => {
//     //     console.log('count is update : '+ count);
//     //     if (count > 5) {
//     //         alert("count가 5를 넘었습니다 1로 초기화합니다.");
//     //         setCount(1);
//     //     }
//     // }, [count]);

//     // useEffect(() => {
//     //     console.log('count is update : '+ text);
//     // }, [text])

//     const [isVisible, setIsVisible] = useState(false);
//     const toggle = () => setIsVisible(!isVisible);
    
//     return (
//     <div>
//         {/* <div style={{ padding: 20 }}>
//             {count}
//             <button onClick={()=>setCount(count+1)}>+</button>
//         </div>
            
//         <div>
//             <input value={text} onChange={(e) => setText(e.target.value)} />
//         </div> */}
        
//             <button onClick={toggle}>ON/OFF</button>
//             {/* isVisible true일떄만 UnmountTest를 보여준다 (단락회로평가) */}
//             {isVisible && <UnmountTest />}
//     </div>
//     )
// }

// export default Lifecycle;