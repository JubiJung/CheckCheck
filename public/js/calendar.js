const calendar = document.getElementById("calendar");
const calendarTitle = document.getElementById("calendarTitle");
const prevCalBtn = document.querySelector(".prevCalendar");
const nextCalBtn = document.querySelector(".nextCalendar");

let today = new Date();
const dateId = `${today.getFullYear()}${
  today.getMonth() + 1
}${today.getDate()}`;

const buildCalendar = () => {
  let row = null;
  let cell = null;
  let cnt = 0;
  const firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  calendarTitle.innerText = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월`;

  while (calendar.rows.length > 1) {
    calendar.deleteRow(calendar.rows.length - 1);
  }
  row = calendar.insertRow();
  for (i = 0; i < firstDate.getDay(); i++) {
    cnt += 1;
    cell = row.insertCell();
  }
  for (let i = 1; i <= lastDate.getDate(); i++) {
    cnt += 1;
    cell = row.insertCell();
    cell.innerText = i;
    cell.classList.add(`${today.getFullYear()}${today.getMonth() + 1}${i}`);
    if (cnt % 7 === 0) {
      row = calendar.insertRow();
    }
  }
  todaysDate();
  calendarTime();
};

const onPrevCalendar = () => {
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  buildCalendar();
};

const onNextCalendar = () => {
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  buildCalendar();
};

const calendarTime = () => {
  const calTime = localStorage.getItem("calendarTime");
  const td = document.getElementsByClassName(dateId)[0];
  if (!calTime || !td) return;
  if (0 < calTime && calTime < 240) {
    td.style.background = "#edf2fb";
  }
  if (240 < calTime && calTime < 600) {
    td.style.background = "#d7e3fc";
  }
  if (600 < calTime) {
    td.style.background = "#c1d3fe";
  }
};

const todaysDate = () => {
  const td = document.getElementsByClassName(dateId)[0];
  if (!td) return;
  td.style.fontWeight = "bold";
  td.style.fontSize = "12.5px";
  td.style.textDecorationLine = "underline";
  td.style.textDecorationThickness = "2px";
  td.style.textDecorationColor = "#d1495b";
};

prevCalBtn.addEventListener("click", onPrevCalendar);
nextCalBtn.addEventListener("click", onNextCalendar);

buildCalendar();
