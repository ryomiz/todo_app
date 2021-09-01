'use strict';

// フォームに関するelements
const todoEl = document.getElementById('todo');
const submitEl = document.getElementById('submit');
const alertEl = document.getElementById('alert');

// タスクリストに関するelements
const completedList = document.getElementById('completedTasks');
const uncompletedList = document.getElementById('uncompletedTasks');

// ここから
// Todoが送信された際の処理
//
const clearInput = () => {
  todoEl.value = '';
};

const returnInputValue = (e) => {
  alertEl.classList.remove('active');
  e.preventDefault();
  const todo = todoEl.value;
  // todoが空白の際にエラーメッセージ
  if (!todo) {
    alertEl.classList.add('active');
    return;
  }
  clearInput();
  return todo;
};

// todo: string
const createTodo = (todo) => {
  const list = `
  <li>
    <p>${todo}</p>
    <div class="buttons">
      <button class="completeButton">完了</button>
    </div>
  </li>
  `;
  uncompletedList.insertAdjacentHTML('beforeend', list);
};

submitEl.addEventListener('click', (e) => {
  const todo = returnInputValue(e);
  createTodo(todo);
  addCompleteEventListener();
});
//
//
// ここまで

// Add EventListener
const addCompleteEventListener = () => {
  const buttonComp = document.querySelectorAll('.completeButton');
  buttonComp.forEach((el) => {
    el.addEventListener('click', handleCompleteTask);
  });
};

const addBackEventListener = () => {
  const buttonBack = document.querySelectorAll('.backButton');
  buttonBack.forEach((el) => {
    el.addEventListener('click', handleUncompleteTask);
  });
};

const addDeleteEventListener = () => {
  const buttonDel = document.querySelectorAll('.delButton');
  buttonDel.forEach((el) => {
    el.addEventListener('click', handleDeleteTask);
  });
};

// Button Elements
const compButton = `
<div class="buttons">
  <button class="completeButton">完了</button>
</div>`;

const delButtons = `  
<div class="buttons">            
  <button class="delButton">削除</button>
  <button class="backButton">戻す</button>
</div>`;

const handleCompleteTask = (e) => {
  const parentLi = e.target.parentNode.parentNode;
  e.target.parentNode.remove();
  parentLi.insertAdjacentHTML('beforeEnd', delButtons);
  completedList.appendChild(parentLi);
  addBackEventListener();
  addDeleteEventListener();
};

const handleUncompleteTask = (e) => {
  const parentLi = e.target.parentNode.parentNode;
  e.target.parentNode.remove();
  parentLi.insertAdjacentHTML('beforeEnd', compButton);
  uncompletedList.appendChild(parentLi);
  addCompleteEventListener();
};

const handleDeleteTask = (e) => {
  const parentLi = e.target.parentNode.parentNode;
  parentLi.remove();
};

addCompleteEventListener();
addBackEventListener();
addDeleteEventListener();
