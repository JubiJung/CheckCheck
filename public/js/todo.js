const listAddBtn = document.querySelector(".todoAddBtn");
const ulList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const helperTodo = document.querySelector(".helperTodo");
const allSelectBtn = document.querySelector(".allSelectBtn");
const delSelectedListBtn = document.querySelector(".delSelectedListBtn");
const input = document.createElement("input");
let todos = [];
let isCompleted = false;

//isonblur나 isfocusout등을 변수로 정해서 이용하는 것도 좋은 생각

todoInput.addEventListener("focusout", () => {
  helperTodo.classList.add("hideMsg");
  todoInput.style.borderBottom = "1px solid grey";
});

const paintTodoList = (todo) => {
  const list = document.createElement("li");
  const div = document.createElement("div");
  const input = document.createElement("input");
  const label = document.createElement("label");
  const img = document.createElement("img");

  img.src = "img/x_mark.png";
  div.classList = "todoList";
  div.id = todo.id;
  label.htmlFor = `checkbox${todo.id}`;
  input.type = "checkbox";
  input.classList = "checkbox";
  input.id = `checkbox${todo.id}`;
  img.addEventListener("click", onDelToDoList);
  list.innerText = todo.text;
  list.addEventListener("click", onCompletedTodo);

  div.appendChild(input);
  div.appendChild(label);
  div.appendChild(list);
  div.appendChild(img);
  ulList.appendChild(div);
};

const onAddToDoList = (e) => {
  e.preventDefault();
  const todoId = Date.now();

  if (todoInput.value === "") {
    helperTodo.classList.remove("hideMsg");
    todoInput.style.borderBottom = "1px solid red";
    todoInput.focus();
    return;
  } else {
    helperTodo.classList.add("hideMsg");
    todoInput.style.borderBottom = "1px solid grey";
  }
  const todo = {
    text: todoInput.value,
    id: todoId,
  };
  todos.push(todo);
  paintTodoList(todo);
  saveTodo();
  todoInput.value = "";
};

const onDelToDoList = (e) => {
  const parentTodoDiv = e.target.parentNode;
  ulList.removeChild(parentTodoDiv);
  const deletedTodo = todos.filter((todo) => {
    return todo.id !== Number(parentTodoDiv.id);
  });
  todos = deletedTodo;
  saveTodo();
};

const onCompletedTodo = (e) => {
  const toDoTextStyle = e.target.style;
  isCompleted = !isCompleted;
  isCompleted
    ? (toDoTextStyle.textDecorationLine = "line-through")
    : (toDoTextStyle.textDecorationLine = "");
  isCompleted ? (toDoTextStyle.color = "grey") : (toDoTextStyle.color = "");
};

const onAllSelectBtn = () => {
  const checkboxes = document.querySelectorAll(".checkbox");
  const arr = [];
  checkboxes.forEach((cb) => cb.checked === true && arr.push("true"));
  arr.length !== checkboxes.length
    ? checkboxes.forEach((cb) => (cb.checked = true))
    : checkboxes.forEach((cb) => (cb.checked = false));
};

const onDeleteSelectedList = (e) => {
  todos = [];
  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach(
    (cb) =>
      cb.checked === false &&
      todos.push({
        text: cb.nextSibling.nextSibling.innerText,
        id: cb.parentNode.id,
      })
  );
  checkboxes.forEach(
    (cb) => cb.checked === true && ulList.removeChild(cb.parentElement)
  );
  saveTodo();
};

const saveTodo = () => {
  localStorage.setItem("todo", JSON.stringify(todos));
};

const loadTodoList = () => {
  const loadedTodos = localStorage.getItem("todo");
  const parsedTodos = JSON.parse(loadedTodos);
  if (loadedTodos) {
    parsedTodos.forEach((todo) => paintTodoList(todo));
  }
};

listAddBtn.addEventListener("click", onAddToDoList);
allSelectBtn.addEventListener("click", onAllSelectBtn);
delSelectedListBtn.addEventListener("click", onDeleteSelectedList);
loadTodoList();
