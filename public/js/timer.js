const timer = document.getElementById("timer");
const timerStartBtn = document.querySelector(".timerStartBtn");
const timerStopBtn = document.querySelector(".timerStopBtn");
const timerResetBtn = document.querySelector(".timerResetBtn");
const todayStudiedTime = document.querySelector(".todayStudiedTime");
let sum = 0;
let interval;
let firstMinVal;
let stopTimer = true;
const expirationDate = new Date(new Date().setHours(24, 0, 0, 0));
const alarm = new Audio("./sound/time_out_alarm.mp3");

const loadTime = () => {
  const timeSum = localStorage.getItem("time");
  const parsedTimeSum = JSON.parse(timeSum);

  if (timeSum === null) {
    todayStudiedTime.innerText = "😎집중을 시작해 볼까요?💪";
  }
  if (timeSum) {
    todayStudiedTime.innerText = `오늘은 ${Math.floor(
      parsedTimeSum.sumTime / 60
    )}시간 ${parsedTimeSum.sumTime % 60}분 집중했네요!`;
  }
};

const timerInterval = (hourVal, minVal, secVal) => {
  const min = document.getElementById("min");
  stopTimer = false;
  if (min && minVal < 1) {
    alert("시간을 정확히 입력해 주세요.");
    return;
  }
  interval = setInterval(() => {
    if (secVal < 0) {
      minVal -= 1;
      secVal = 59;
    }
    if (minVal < 0) {
      hourVal -= 1;
      minVal = 59;
    }
    if (minVal >= 60) {
      hourVal = Math.floor(minVal / 60);
      minVal = minVal % 60;
    }
    timer.innerText = `${hourVal || "00"}:${minVal || "00"}:${secVal}`;
    if (secVal === 0 && minVal === 0 && hourVal === 0) {
      clearInterval(interval);
      sum += parseInt(firstMinVal);
      deleteTime();
      saveTime();
      calendarTime();
      loadTime();
      alarm.play();
    }
    secVal--;
  }, 1000);
};

const onStartHandler = () => {
  const min = document.getElementById("min");
  if (min !== null) {
    firstMinVal = min.value;
    let hourVal = 0;
    let minVal = min.value;
    let secVal = "00";
    timerInterval(hourVal, minVal, secVal);
  }
  if (timer.innerText && stopTimer === true) {
    const timerTextArr = timer.innerText.split(":");
    let hourVal = +timerTextArr[0];
    let minVal = +timerTextArr[1];
    let secVal = +timerTextArr[2];
    timerInterval(hourVal, minVal, secVal);
  }
};

const onStopHandler = () => {
  stopTimer = true;
  clearInterval(interval);
};

const onResetHandler = () => {
  clearInterval(interval);
  const input = document.createElement("input");
  const label = document.createElement("label");
  timer.innerText = "";
  label.htmlFor = "min";
  label.innerText = "분";
  input.id = "min";
  input.type = "number";
  input.min = 0;
  input.max = 59;
  input.placeholder = 25;
  input.value = 25;
  timer.appendChild(input);
  timer.appendChild(label);
};

const saveTime = () => {
  const currTime = Date.now();
  localStorage.setItem(
    "time",
    JSON.stringify({ sumTime: sum, currTime: currTime })
  );
  localStorage.setItem("calendarTime", sum);
};

const deleteTime = () => {
  const loadedTimeObj = localStorage.getItem("time");
  const parsedTimeObj = JSON.parse(loadedTimeObj);
  if (loadedTimeObj && expirationDate < parsedTimeObj.currTime) {
    localStorage.removeItem("time");
  }
};

timerStartBtn.addEventListener("click", onStartHandler);
timerStopBtn.addEventListener("click", onStopHandler);
timerResetBtn.addEventListener("click", onResetHandler);
loadTime();
