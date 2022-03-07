import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id:1,
//     author:"임건희",
//     content:"안녕하세요~",
//     emotion:5,
//     created_date : new Date().getTime(),
//   },
//   {
//     id:2,
//     author:"kunhee",
//     content:"dasdasdasdasdasdas~",
//     emotion:1,
//     created_date : new Date().getTime(),
//   },
//   {
//     id:3,
//     author:"LEEE",
//     content:"HIHIHIHIHIHIHIHIHIHIHI~",
//     emotion:3,
//     created_date : new Date().getTime(),
//   },
// ]

function App() {

  // 전역 상태 관리 (추가,삭제,수정)
  const [data, setData] = useState([]);

  // id값
  const dataId = useRef(0);

  // 생성
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current,
    }
    dataId.current += 1;
    setData([newItem, ...data]);
  }

  // 삭제
  const onRemove = (targetId) => {
    console.log(targetId + '가 삭제되었습니다.');
    // 필터해서 새로 랜더링
    // 원래 data에 targetId(삭제버튼)가 아닌것의 배열을 다시 setData에 저장 후 랜더링
    const newDiaryList = data.filter((it) => it.id !== targetId);
    // console.log(newDiaryList);
    setData(newDiaryList);
  };

  // 수정
  const onEidt = (targetId, newContent) => {
    setData(
      data.map((it) => it.id === targetId ? { ...it, content: newContent } : it )
    )
  }

  return (
    <div>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEidt={onEidt} onRemove={onRemove} dummyList={data} />
    </div>
  );
}

export default App;
