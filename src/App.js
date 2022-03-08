import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import OptimizeTest from "./OptimizeTest";
// import Lifecycle from './Lifecycle';

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

// API호출
// https://jsonplaceholder.typicode.com/comments

function App() {
  // 전역 상태 관리 (추가,삭제,수정)
  const [data, setData] = useState([]);

  // id값
  const dataId = useRef(0);

  // API 호출 하는 함수 (비동기)
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    // (테스트 데이터) 기초값 설정 (slice 데이터 자르기)
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
    // console.log(res);
  };

  // data 호출 (mount 되자마자 호출)
  useEffect(() => {
    getData();
  }, []);

  // 생성
  // useCallback 만들었던 함수 한번만 작동하게 (Editor 랜더안되게)
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    // setData([newItem, ...data]);
    // 함수형 업데이트
    setData((data) => [newItem, ...data]);
  }, []);

  // 삭제
  const onRemove = useCallback((targetId) => {
    // console.log(targetId + "가 삭제되었습니다.");
    // 필터해서 새로 랜더링
    // 원래 data에 targetId(삭제버튼)가 아닌것의 배열을 다시 setData에 저장 후 랜더링
    // const newDiaryList = data.filter((it) => it.id !== targetId);
    // console.log(newDiaryList);
    // setData(newDiaryList);
    // data에 최신 state
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  // 수정
  const onEidt = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []);

  // Memoization(useMemo) (연산 기억 후 똑같은 문제일 경우 연산하지 않고 바로 출력)
  // 지역함수
  const getDiaryAnalysis = useMemo(() => {
    // console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion > 3).length;
    const badCount = data.length - goodCount;
    // 기분 좋은 일기에 비율
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      {/* <OptimizeTest /> */}
      {/* <Lifecycle /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 길기 비율 : {goodRatio}</div>
      <DiaryList onEidt={onEidt} onRemove={onRemove} dummyList={data} />
    </div>
  );
}

export default App;
