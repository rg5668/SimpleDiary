import React, { useEffect, useRef, useState } from "react";

const DiaryItem = ({
  author,
  content,
  created_date,
  emotion,
  id,
  onRemove,
  onEidt,
}) => {
  useEffect(() => {
    console.log(id, "번 째 아이템 렌더!");
  });

  // true, flase true가 되면 수정 false면 content render
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  // 새로운 내용을 localContent에 저장
  // content는 원래의 값
  const [localContent, setLocalContent] = useState(content);

  const localContentInput = useRef();

  // 삭제를 함수 따로 생성
  const handleRemove = () => {
    // console.log(id);
    if (window.confirm(id + "번째 일기를 정말 삭제하시겠습니까?")) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const heandleEdit = () => {
    // 길이가 짧으면 포커스
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    //검사
    if (window.confirm(id + "번 째 일기를 수정하시겠습니까?")) {
      onEidt(id, localContent);
      // 수정폼을 닫아줘야한다. false
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">
          {/* ms를 보기 좋게 시간 변경 방법 */}
          {new Date(created_date).toLocaleString()}
        </span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={heandleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          {/* isEdit = true */}
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
