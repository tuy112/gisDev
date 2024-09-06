import React, { useState } from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      mountainName: '',
      mountainDay: '',
      mountainStory: ''
    });
  
    // 폼 데이터 업데이트 함수
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    // 글쓰기 완료 버튼 클릭 시 호출
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // 유효성 검사
      if (formData.mountainName === '') {
        alert('산 이름을 입력해주세요');
        return;
      }
      if (formData.mountainDay === '') {
        alert('산행 날짜를 입력해주세요');
        return;
      }
      if (formData.mountainStory === '') {
        alert('산행 내용을 입력해주세요');
        return;
      }
  
      alert('산행 기록이 저장되었습니다.');
      onClose(); // 모달 닫기
    };
  
    // 모달을 배경 클릭 시 닫기
    const handleBackgroundClick = (e) => {
      e.stopPropagation();
      onClose();
    };
  
    // 모달 내용 클릭 시 닫히지 않도록
    const handleModalClick = (e) => {
      e.stopPropagation();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="modal" onClick={handleBackgroundClick}>
        <div className="modalPopup" onClick={handleModalClick}>
          <h3>오늘 내가 다녀온 산 추가하기</h3>
          <form onSubmit={handleSubmit}>
            <label>산</label>
            <input
              type="text"
              name="mountainName"
              value={formData.mountainName}
              placeholder="산 이름 입력"
              onChange={handleInputChange}
            />
            <label>일시</label>
            <input
              type="text"
              name="mountainDay"
              value={formData.mountainDay}
              placeholder="산행 날짜 입력"
              onChange={handleInputChange}
            />
            <label>내용</label>
            <input
              type="text"
              name="mountainStory"
              value={formData.mountainStory}
              placeholder="산행 내용 입력"
              onChange={handleInputChange}
            />
            <div className="btnWrap">
              <button type="submit" className="btn sendBtn">글쓰기완료</button>
              <button type="button" className="btn closeBtn" onClick={onClose}>닫기</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Modal;