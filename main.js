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
const clearInput = () => (todoEl.value = '');

const returnInputValue = (e) => {
  e.preventDefault();
  alertEl.classList.remove('active');
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

// ボタンに関するelements
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
  const parentLi = e.target.parentNode.parentNode; // クリックされた対象の親要素li要素を取得
  e.target.parentNode.remove(); // 完了ボタンを含むdiv要素を削除
  parentLi.insertAdjacentHTML('beforeEnd', delButtons); // 削除、戻すボタンを含むdiv要素を追加
  completedList.appendChild(parentLi); // タスクを完了したタスクへ追加
  addBackEventListener();
  addDeleteEventListener();
};

const handleUncompleteTask = (e) => {
  const parentLi = e.target.parentNode.parentNode; // クリックされた対象の親要素li要素を取得
  e.target.parentNode.remove(); // 削除、戻すボタンを含むdiv要素を削除
  parentLi.insertAdjacentHTML('beforeEnd', compButton); // 完了ボタンを含むdiv要素を追加
  uncompletedList.appendChild(parentLi); // タスクを未完了のタスクへ追加
  addCompleteEventListener();
};

const handleDeleteTask = (e) => {
  const parentLi = e.target.parentNode.parentNode; // クリックされた対象の親要素li要素を取得
  parentLi.remove();
};

// EventListenerを付与する関数
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

// 初期化
addCompleteEventListener();
addBackEventListener();
addDeleteEventListener();
