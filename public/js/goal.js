const goalForm = document.getElementById("goalForm");
const goalAddBtn = document.querySelector(".goalAddBtn");
const goalList = document.getElementById("goalList");
const goalInput = document.getElementById("goalInput");
const helperGoal = document.querySelector(".helperGoal");
const emoji = ["💖", "🥰", "🤩", "👊", "🔥", "💥", "🚀", "💯"];
let isCompletedGoal = false;
let goals = [];
//isonblur나 isfocusout등을 변수로 정해서 이용하는 것도 좋은 생각

goalInput.addEventListener("focusout", () => {
  helperGoal.classList.add("hideMsg");
  goalInput.style.borderBottom = "1px solid grey";
});

const paintGoalList = (parsedGoal) => {
  const div = document.createElement("div");
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.src = "img/x_mark.png";
  li.innerText = parsedGoal.text;
  li.addEventListener("click", onCompletedGoal);
  img.addEventListener("click", onRemoveGoal);
  div.id = parsedGoal.id;
  div.appendChild(li);
  div.appendChild(img);
  goalList.appendChild(div);
};

const saveGoals = () => {
  localStorage.setItem("goal", JSON.stringify(goals));
};

const onAddGoal = (e) => {
  e.preventDefault();
  const goalId = Date.now();
  const emojiIdx = Math.floor(Math.random() * emoji.length);
  const emojiIdx2 = Math.floor(Math.random() * emoji.length);

  if (goalInput.value === "") {
    helperGoal.classList.remove("hideMsg");
    goalInput.style.borderBottom = "1px solid red";
    goalInput.focus();
    return;
  } else {
    helperGoal.classList.add("hideMsg");
    goalInput.style.borderBottom = "1px solid grey";
  }

  const goalObj = {
    text: `${emoji[emojiIdx]}${goalInput.value}${emoji[emojiIdx2]}`,
    id: goalId,
  };
  goals.push(goalObj);
  paintGoalList(goalObj);
  saveGoals();
  goalInput.value = "";
};

const onCompletedGoal = (e) => {
  const goalTextStyle = e.target.style;
  isCompletedGoal = !isCompletedGoal;
  isCompletedGoal
    ? (goalTextStyle.textDecorationLine = "line-through")
    : (goalTextStyle.textDecorationLine = "");
  isCompletedGoal ? (goalTextStyle.color = "grey") : (goalTextStyle.color = "");
};

const onRemoveGoal = (e) => {
  const parentGoalDiv = e.target.parentNode;
  goalList.removeChild(parentGoalDiv);
  const deletedGoal = goals.filter((goal) => {
    goal.id !== Number(parentGoalDiv.id);
  });
  goals = deletedGoal;
  saveGoals();
};

const loadGoalList = () => {
  const loadedGoals = localStorage.getItem("goal");
  const parsedGoals = JSON.parse(loadedGoals);
  if (loadedGoals) {
    parsedGoals.forEach((goal) => paintGoalList(goal));
  }
};

goalAddBtn.addEventListener("click", onAddGoal);
loadGoalList();
