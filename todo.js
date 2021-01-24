const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  toDoFinList = document.querySelector(".js-toDofinList");

const TODOS_LS = "toDos";
const TODOSFIN_LS = "toDosFin";

let toDos = [];
let toDosFin = [];

function moveToDo(event) {
  const moveBtn = event.target;
  const clickedLi = moveBtn.parentNode;
  const liText = clickedLi.querySelector("span").innerText;
  paintToDoFin(liText);
  toDoList.removeChild(clickedLi);
  const moveToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(clickedLi.id);
  });
  toDos = moveToDos;
  saveToDos();
}

function backToDo(event) {
  const backBtn = event.target;
  const clickedLi = backBtn.parentNode;
  const liText = clickedLi.querySelector("span").innerText;
  paintToDo(liText);
  toDoFinList.removeChild(clickedLi);
  const backToDos = toDosFin.filter(function (toDoFin) {
    return toDoFin.id !== parseInt(clickedLi.id);
  });
  toDosFin = backToDos;
  saveToDosFin();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  if (ul === toDoList) {
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
    saveToDosFin();
  } else {
    console.log(toDoFinList);
    toDoFinList.removeChild(li);
    const cleanToDosFin = toDosFin.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDosFin = cleanToDosFin;
    saveToDosFin();
  }
}

function saveToDosFin() {
  localStorage.setItem(TODOSFIN_LS, JSON.stringify(toDosFin));
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  console.log(text);
  // below const's name can be potato
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const newId = toDos.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  finBtn.innerText = "✅";
  finBtn.addEventListener("click", moveToDo);

  const span = document.createElement("span");
  span.innerText = text;

  li.appendChild(delBtn);
  li.appendChild(span);
  li.appendChild(finBtn);
  li.id = newId;
  toDoList.appendChild(li);
  // toDos array에 저장
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintToDoFin(text) {
  // below const's name can be potato
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const newId = toDosFin.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", backToDo);

  const span = document.createElement("span");
  span.innerText = text;

  li.appendChild(backBtn);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoFinList.appendChild(li);
  // toDos array에 저장
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDosFin.push(toDoObj);
  saveToDosFin();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  // reset input
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const loadedToDosFin = localStorage.getItem(TODOSFIN_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  if (loadedToDosFin !== null) {
    const parsedToDosFin = JSON.parse(loadedToDosFin);
    parsedToDosFin.forEach(function (toDoFin) {
      paintToDoFin(toDoFin.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
