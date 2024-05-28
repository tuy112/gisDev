// 1. search 기능
function search() {
    alert('아직 미구현 기능입니다 ㅠ_ㅠ');
}

// 2. 산 클릭 이벤트 - 모달 창
function mountain() {
    alert('산이 클릭됨');
}

// 3. "산행추가" 버튼 (모달창 열기)
function addStory() {
    const modal = document.querySelector('.modal');
    modal.style.display = "block";
}

// 4. 모달 닫기 버튼
function closeModal(){
    const modal = document.querySelector('.modal');
    modal.style.display = "none";
}

// 5. 글쓰기 완료 버튼 (db연결-ajax)