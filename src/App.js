import React, { useState } from 'react';
import './styles/Reset.css';
import './styles/App.css';
import { IoSearch } from "react-icons/io5";

import Modal from './components/Modal'; 
import MapComponent from './components/MapComponent';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const search = () => {
    alert('아직 미구현 기능입니다 ㅠ_ㅠ');
  };

  const addStory = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div id="wrap">
      {/* header */}
      <header id="header">
        <h1>
          GIS개발연습하기
          <span>100대명산 내가 정복한 산 (13/100)</span>
        </h1>
        <div className="search" onClick={search}>
          <IoSearch />
        </div>
      </header>

      {/* main */}
      <section id="container" className="main">
        <div className="content mapWrap">
          <h3>OPENLAYERS</h3>
          <MapComponent />
        </div>
        <div className="content storyBtn">
          <input type="button" className="btn addBtn" value="산행추가" onClick={addStory} />
        </div>
      </section>

      {/* footer */}
      <footer id="footer"></footer>


      {/* Modal Component */}
      <Modal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;