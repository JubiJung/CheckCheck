const mainBtn = document.querySelector(".main");
const statsBtn = document.querySelector(".stats");
const mainPage = document.getElementById("main");
const statsPage = document.getElementById("stats");

mainBtn.addEventListener("click", () => {
  mainPage.style.display = "flex";
  mainPage.classList.remove("hidePage");
  mainBtn.classList.add("clicked");
  statsPage.classList.add("hidePage");
  statsPage.style.display = "none";
  statsBtn.classList.remove("clicked");
});

statsBtn.addEventListener("click", () => {
  statsPage.style.display = "flex";
  statsPage.classList.remove("hidePage");
  statsBtn.classList.add("clicked");
  mainPage.classList.add("hidePage");
  mainPage.style.display = "none";
  mainBtn.classList.remove("clicked");
});
