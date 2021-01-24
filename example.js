// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pending = document.querySelector(".pending"),
  finished = document.querySelector(".finished");

const TODOS_LS = "toDos",
  TOFDOS_LS = "toDos2";

let toDos = [];
let toDos2 = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  if (li.parentNode === pending) {
    pending.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
  } else {
    finished.removeChild(li);
    const cleanToDos2 = toDos2.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos2 = cleanToDos2;
    saveFiDos();
  }
}

function changeToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const pendingText = li.firstChild.innerText;
  paintFiDo(pendingText);
  pending.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function backToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const finishedText = li.firstChild.innerText;
  paintToDo(finishedText);
  finished.removeChild(li);
  const cleanToDos2 = toDos2.filter(function (toDo2) {
    return toDo2.id !== parseInt(li.id);
  });
  toDos2 = cleanToDos2;
  saveFiDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function saveFiDos() {
  localStorage.setItem(TOFDOS_LS, JSON.stringify(toDos2));
}
let idNumbers = 1;

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const chnBtn = document.createElement("button");
  const newId = idNumbers;
  idNumbers += 1;
  const span = document.createElement("span");

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  chnBtn.innerText = "✅";
  chnBtn.addEventListener("click", changeToDo);
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(chnBtn);
  li.id = newId;
  pending.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintFiDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const BckBtn = document.createElement("button");
  const newId = idNumbers;
  idNumbers += 1;
  const Span = document.createElement("span");

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  BckBtn.innerText = "⏮";
  BckBtn.addEventListener("click", backToDo);
  Span.innerText = text;
  li.appendChild(Span);
  li.appendChild(delBtn);
  li.appendChild(BckBtn);
  li.id = newId;
  finished.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos2.push(toDoObj);
  saveFiDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const loadedFiDos = localStorage.getItem(TOFDOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  if (loadedFiDos !== null) {
    const parsedFiDos = JSON.parse(loadedFiDos);
    parsedFiDos.forEach(function (toDo2) {
      paintFiDo(toDo2.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
