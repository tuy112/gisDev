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
function sendDb(event) {
    sendform = event.target;
    event.preventDefault();

    // 유효성 검사
    if(sendForm.mName.value === ""){
        alert('산 이름을 입력해주세요');
        sendForm.mName.focus();
        return;
    }
    if(sendForm.mDay.value === ""){
        alert('산행 일을 입력해주세요');
        sendForm.mDay.focus();
        return;
    }
    if(sendForm.writeArea.value === ""){
        alert('산행 때 일어난 일을 적어주세요. 최소10자이상..');
        sendForm.writeArea.focus();
        return;
    }
}