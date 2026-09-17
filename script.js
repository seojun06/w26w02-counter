// 타이머 시간
const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

// 현재 타이머 시간
let timeLeft = FOCUS_TIME;

// 현재 모드
let currentMode = "focus";

// 타이머 실행 여부
let timer = null;

// HTML 요소 가져오기
const timerDisplay = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const focusBtn = document.getElementById("focusBtn");
const breakBtn = document.getElementById("breakBtn");

const statusText = document.getElementById("status");


// 시간을 00:00 형식으로 표시
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const minuteText = String(minutes).padStart(2, "0");
    const secondText = String(seconds).padStart(2, "0");

    timerDisplay.textContent = `${minuteText}:${secondText}`;
}


// 타이머 시작
function startTimer() {
    // 이미 실행 중이면 중복 실행 방지
    if (timer !== null) {
        return;
    }

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            switchMode();
        }
    }, 1000);
}


// 타이머 일시정지
function pauseTimer() {
    clearInterval(timer);
    timer = null;
}


// 타이머 리셋
function resetTimer() {
    pauseTimer();

    if (currentMode === "focus") {
        timeLeft = FOCUS_TIME;
    } else {
        timeLeft = BREAK_TIME;
    }

    updateDisplay();
}


// 집중/휴식 모드 변경
function switchMode() {
    pauseTimer();

    if (currentMode === "focus") {
        currentMode = "break";

        timeLeft = BREAK_TIME;

        focusBtn.classList.remove("active");
        breakBtn.classList.add("active");

        statusText.textContent = "휴식 시간입니다.";
    } else {
        currentMode = "focus";

        timeLeft = FOCUS_TIME;

        breakBtn.classList.remove("active");
        focusBtn.classList.add("active");

        statusText.textContent = "집중 시간입니다.";
    }

    updateDisplay();
}


// 집중 버튼
focusBtn.addEventListener("click", () => {
    pauseTimer();

    currentMode = "focus";
    timeLeft = FOCUS_TIME;

    focusBtn.classList.add("active");
    breakBtn.classList.remove("active");

    statusText.textContent = "집중 시간입니다.";

    updateDisplay();
});


// 휴식 버튼
breakBtn.addEventListener("click", () => {
    pauseTimer();

    currentMode = "break";
    timeLeft = BREAK_TIME;

    breakBtn.classList.add("active");
    focusBtn.classList.remove("active");

    statusText.textContent = "휴식 시간입니다.";

    updateDisplay();
});


// 시작 버튼
startBtn.addEventListener("click", startTimer);


// 일시정지 버튼
pauseBtn.addEventListener("click", pauseTimer);


// 리셋 버튼
resetBtn.addEventListener("click", resetTimer);


// 처음 화면 표시
updateDisplay();