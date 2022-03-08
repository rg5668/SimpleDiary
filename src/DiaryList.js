import { useContext } from "react";
import { DiaryStateContext } from "./App";
import DiaryItem from "./DiaryItem";

const DiaryList = ({}) => {
  // console.log(dummyList);
  // useContext 어떤 컨텍스트 지정으로 값을 꺼내올 수 있다.
  const dummyList = useContext(DiaryStateContext);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{dummyList.length}개의 일기가 있습니다.</h4>

      <div>
        {/* id대신 (it,idx)도 사용 가능 */}
        {/* // DiaryItem ...it 모든 데이터 전달 */}
        {dummyList.map((it) => (
          <DiaryItem key={it.id} {...it} />
          // <div key={it.id}>
          //     <div>작성자 : {it.author}</div>
          //     <div>일기 : {it.content}</div>
          //     <div>감정 : {it.emotion}</div>
          //     <div>작성시간(ms) : {it.created_data}</div>
          // </div>
        ))}
      </div>
    </div>
  );
};

// 전달된 배열이 0개 일 경우 error가 발생해서 초기값을 여기서 잡아주면
// undefind가 나도 erorr가 발생하지 않는다.
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
