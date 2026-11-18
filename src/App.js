import React, { useEffect, useState } from 'react';

import { IoSearch } from "react-icons/io5";

import Modal from './components/Modal';
import MapComponent from './components/MapComponent';

import './styles/Reset.css';
import './styles/App.css';

const API_URL = '';

function App() {

      const [mountains, setMountains] = useState([]);
      const [modalOpen, setModalOpen] = useState(false);
      const [loading, setLoading] = useState(true);

      // DB 산행 목록 조회
      const getMountains = async () => {
            try {
                  const response = await fetch(
                        `${API_URL}/api/mountains`
                  );
                  if (!response.ok) {
                        throw new Error('산행 목록 조회 실패');
                  }
                  const data = await response.json();
                  setMountains(data);
            } catch (error) {
                  console.error('산행 목록 조회 오류:', error);
                  alert('산행 기록을 불러오지 못했습니다.');
            } finally {
                  setLoading(false);
            }
      };

      // 최초 실행
      useEffect(() => {
            getMountains();
      }, []);

      // 산행 추가 모달
      const addStory = () => {
            setModalOpen(true);
      };
      const closeModal = () => {
            setModalOpen(false);
      };

      // 신규 산행 등록 완료
      const handleMountainAdded = (newMountain) => {
            setMountains(prevMountains => [
                  ...prevMountains,
                  newMountain
            ]);
      };

      // 검색 기능
      const search = () => {
            alert('검색 기능은 추후 구현 예정입니다.');
      };

      return (
            <div id="wrap">
                  
                  {/* header */}
                  <header id="header">
                        <h1>
                              GIS개발연습하기
                              <span>
                                    100대명산 내가 정복한 산
                                    ({mountains.length}/100)
                              </span>
                        </h1>

                        <div className="search" onClick={search}>
                              <IoSearch />
                        </div>
                  </header>

                  {/* main */}
                  <section id="container" className="main">
                        <div className="content mapWrap">
                              <h3>OPENLAYERS ({mountains.length}/100)</h3>
                              {loading ? (
                                    <p>산행 기록을 불러오는 중입니다.</p>
                              ) : (
                                    <MapComponent
                                          mountains={mountains}
                                    />
                              )}
                        </div>

                        <div className="content storyBtn">
                              <input
                                    type="button"
                                    className="btn addBtn"
                                    value="산행추가"
                                    onClick={addStory}
                              />
                        </div>

                  </section>

                  {/* footer */}
                  <footer id="footer"></footer>

                  {/* Modal */}
                  <Modal
                        isOpen={modalOpen}
                        onClose={closeModal}
                        onMountainAdded={handleMountainAdded}
                  />
            </div>
      );
}

export default App;
