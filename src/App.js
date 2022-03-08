import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
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

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getDate();
      const newItem = {
        ...action.data,
        created_date,
      };

      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

// 전역적으로 데이터를 사용할수있는
// export만 쓰면 여러개를 쓸 수 있다. (default는 하나만 가능)
export const DiaryStateContext = React.createContext();

// dispatch를 내보내기 위한 Context
export const DiaryDispatchContext = React.createContext();

// ------------------------------APP-------------------------------------------
function App() {
  // 전역 상태 관리 (추가,삭제,수정)
  // react hooks
  // const [data, setData] = useState([]);

  // react reducer
  // 복잡한 상태변호를 따로 빼기 위해 reducer를 쓴다.
  const [data, dispatch] = useReducer(reducer, []);

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
    // reducer
    dispatch({ type: "INIT", data: initData });
    // setData(initData);
    // console.log(res);
  };

  // data 호출 (mount 되자마자 호출)
  useEffect(() => {
    getData();
  }, []);

  // 생성
  // useCallback 만들었던 함수 한번만 작동하게 (Editor 랜더안되게)
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });

    // const created_date = new Date().getTime();
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   created_date,
    //   id: dataId.current,
    // };

    dataId.current += 1;

    // setData([newItem, ...data]);
    // 함수형 업데이트
    // setData((data) => [newItem, ...data]);
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

    dispatch({ type: "REMOVE", targetId });
    // setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  // 수정
  const onEidt = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
    // setData((data) =>
    //   data.map((it) =>
    //     it.id === targetId ? { ...it, content: newContent } : it
    //   )
    // );
  }, []);

  // 재생성을 막기 위해 useMemo를 활용한다. (최적화)
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onEidt, onRemove };
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
    // <DiaryStateContext.Provider> 공급자 컴퍼넌트
    <DiaryStateContext.Provider value={data}>
      {/* DiaryDispatchContext (재생성되지 않는) */}
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          {/* <OptimizeTest /> */}
          {/* <Lifecycle /> */}
          <DiaryEditor />
          {/* onCreate={onCreate} */}
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 길기 비율 : {goodRatio}</div>

          <DiaryList />
          {/*  dummyList={data}  onEidt={onEidt} onRemove={onRemove} */}
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
