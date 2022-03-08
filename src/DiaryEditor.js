import React, { useState, useRef, useEffect, useContext } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = ({}) => {
  //   useEffect(() => {
  //     console.log("DiaryEditor 렌더");
  //   });
  // const [author, setAuthor] = useState("");
  // const [content, setContent] = useState("");

  // Context에서 받아옴
  const { onCreate } = useContext(DiaryDispatchContext);

  // 상태값 저장값
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const authorInput = useRef();
  const contentInput = useRef();

  // 공통 함수
  const handleChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // console.log(state);
    if (state.author.length < 1) {
      // 요즘 트랜드는 alert 사용을 자제하는 편
      // alert("제목을 최소 한글자 이상 입력해주세요.");
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      // alert("본문은 최소 5글자 이상 입력해주세요.");
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.content);
    // console.log(state);
    alert("저장 성공");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          value={state.author}
          name="author"
          onChange={handleChangeState}
          // onChange={(e)=>{
          //     // console.log(e.target.value);
          //     // console.log(e.target.name);
          //     // setAuthor(e.target.value);
          //     // setState({
          //     //     ...state,
          //     //     author: e.target.value,
          //     // });
          //     onchange={handleChangeState}
          // }}
          placeholder="제목을 입력하세요."
        />
      </div>

      <div>
        <textarea
          ref={contentInput}
          value={state.content}
          name="content"
          onChange={handleChangeState}
          // onChange={(e)=> {
          //     // console.log(e.target);
          //     // console.log(e.target.value);
          //     // setContent(e.target.value);
          //     // setState({
          //     //     ...state,
          //     //     content: e.target.value,
          //     // });
          // }}
          placeholder="본문을 5글자 이상 입력하세요."
        />
      </div>

      <div>
        <span>오늘의 감정점수 : </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);
