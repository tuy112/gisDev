
import React, { useEffect, useState } from 'react';

import '../styles/Modal.css';

const API_URL = '';

const Modal = ({ isOpen, onClose, onMountainAdded }) => {
      const [name, setName] = useState('');
      const [latitude, setLatitude] = useState('');
      const [longitude, setLongitude] = useState('');

      const [searching, setSearching] = useState(false);
      const [saving, setSaving] = useState(false);
      const [message, setMessage] = useState('');

      // 모달 초기화
      useEffect(() => {
            if (isOpen) {
                  setName('');
                  setLatitude('');
                  setLongitude('');
                  setMessage('');
            }
      }, [isOpen]);

      // 산 이름으로 좌표 검색
      useEffect(() => {

            const mountainName = name.trim();

            setLatitude('');
            setLongitude('');
            setMessage('');

            if (!isOpen || mountainName.length < 2) {
                  setSearching(false);
                  return;
            }

            const controller = new AbortController();
            const timer = setTimeout(async () => {
                  setSearching(true);

                  try {
                        const response = await fetch(
                              `${API_URL}/api/mountains/geocode?name=${encodeURIComponent(mountainName)}`,
                              {
                                    signal: controller.signal
                              }
                        );

                        const result = await response.json();

                        if (!response.ok) {
                              throw new Error(
                                    result.message || '좌표 검색 실패'
                              );
                        }
                        setLatitude(result.latitude);
                        setLongitude(result.longitude);
                        setMessage('좌표 검색이 완료되었습니다.');

                  } catch (error) {
                        if (error.name !== 'AbortError') {
                              setMessage(error.message);
                              setLatitude('');
                              setLongitude('');

                        }

                  } finally {
                        if (!controller.signal.aborted) {
                              setSearching(false);
                        }

                  }

            }, 800);

            return () => {
                  clearTimeout(timer);
                  controller.abort();
            };

      }, [name, isOpen]);

      // 산행 등록
      const handleSubmit = async (e) => {

            e.preventDefault();

            if (!latitude || !longitude) {
                  alert('산 좌표를 먼저 확인해주세요.');
                  return;
            }
            setSaving(true);

            try {
                  const newMountain = {
                        name: name.trim(),
                        latitude: Number(latitude),
                        longitude: Number(longitude)
                  };
                  const response = await fetch(
                        `${API_URL}/api/mountains`,
                        {
                              method: 'POST',
                              headers: {
                                    'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(newMountain)
                        }
                  );
                  const result = await response.json();
                  if (!response.ok) {
                        throw new Error(
                              result.message || '산행 등록 실패'
                        );
                  }
                  onMountainAdded(result);
                  alert('산행 기록이 등록되었습니다.');
                  onClose();

            } catch (error) {
                  alert(error.message);

            } finally {
                  setSaving(false);
            }
      };

      if (!isOpen) {
            return null;
      }

      return (
            <div className="modal" onClick={onClose}>
                  <div
                        className="modalPopup"
                        onClick={(e) => e.stopPropagation()}
                  >
                        <h3>산 추가하기</h3>
                        <form onSubmit={handleSubmit}>

                              <label>산 이름</label>
                              <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="산 이름"
                                    required
                              />

                              <label>위도</label>
                              <input
                                    type="text"
                                    value={latitude}
                                    readOnly
                                    placeholder="위도"
                              />

                              <label>경도</label>
                              <input
                                    type="text"
                                    value={longitude}
                                    readOnly
                                    placeholder="경도"
                              />

                              <p className="coordinateMessage">
                                    {searching
                                          ? '좌표 검색 중입니다...'
                                          : message}
                              </p>

                              <div className="btnWrap">
                                    <button
                                          type="submit"
                                          className="btn sendBtn"
                                          disabled={
                                                saving ||
                                                searching ||
                                                !latitude ||
                                                !longitude
                                          }
                                    >
                                          {saving ? '등록 중...' : '산행 추가'}
                                    </button>
                                    <button
                                          type="button"
                                          className="btn closeBtn"
                                          onClick={onClose}
                                          disabled={saving}
                                    >
                                          닫기
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default Modal;
