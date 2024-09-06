import React, { useState } from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, onMountainAdded }) => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // 산 이름을 입력하면 Nominatim API로 좌표 조회
  const getCoordinates = async (mountainName) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${mountainName}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setLatitude(lat);
        setLongitude(lon);
      } else {
        alert('해당 산의 좌표를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  // 폼 제출 시
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      alert('좌표를 먼저 확인해주세요.');
      return;
    }

    const newMountain = {
      name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    try {
      // 서버로 POST 요청
      const response = await fetch('http://localhost:8080/mountains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMountain),
      });

      const result = await response.json();
      onMountainAdded(result);  // 부모 컴포넌트에 새 산 정보 알림
      onClose();  // 모달 닫기
    } catch (error) {
      console.error('Error adding mountain:', error);
    }
  };

  // 산 이름 입력 시 좌표 조회
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length > 2) {
      getCoordinates(e.target.value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modalPopup" onClick={(e) => e.stopPropagation()}>
        <h3>산 추가하기</h3>
        <form onSubmit={handleSubmit}>
          <label>산 이름</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="산 이름"
            required
          />
          <label>위도</label>
          <input
            type="text"
            value={latitude}
            readOnly
            placeholder="위도"
            required
          />
          <label>경도</label>
          <input
            type="text"
            value={longitude}
            readOnly
            placeholder="경도"
            required
          />
          <div className="btnWrap">
            <button type="submit" className="btn sendBtn">산행 추가</button>
            <button type="button" className="btn closeBtn" onClick={onClose}>닫기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;