'use strict';

// フォームに関するelements
const todoEl = document.getElementById('todo');
const submitEl = document.getElementById('submit');
const alertEl = document.getElementById('alert');
const resetEl = document.getElementById('reset');

// タスクリストに関するelements
const completedList = document.getElementById('completedTasks');
const uncompletedList = document.getElementById('uncompletedTasks');

// Local Storageからデータ取得、なければ初期オブジェクトを返却する関数
const getDataFromStorage = () => {
  let data = {
    complete: [],
    uncomplete: [],
  };
  if (localStorage.getItem('todo')) {
    data = JSON.parse(localStorage.getItem('todo'));
  }
  return data;
};

// ここから
// Todoが送信された際の処理
//

const clearInput = () => (todoEl.value = '');

const pushDataToStorage = (todo) => {
  const data = getDataFromStorage();
  const newData = {
    complete: [...data.complete, todo],
    uncomplete: [...data.uncomplete],
  };
  localStorage.setItem('todo', JSON.stringify(newData));
};

const getInputValue = (e) => {
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

submitEl.addEventListener('click', (e) => {
  const todo = getInputValue(e);
  if (!todo) return;
  pushDataToStorage(todo);
  uncompletedList.insertAdjacentHTML('beforeend', createTodo(todo));
  addCompleteEventListener();
});

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

// todo: string
const createTodo = (todo) => {
  const li = `
  <li>
    <p>${todo}</p>
    <div class="buttons">
      <button class="completeButton">完了</button>
    </div>
  </li>
  `;
  return li;
};

const createCompletedTodo = (todo) => {
  const li = `
  <li>
    <p>${todo}</p>
    <div class="buttons">
      <button class="delButton">削除</button>
      <button class="backButton">戻す</button>
    </div>
  </li>
  `;
  return li;
};

const handleCompleteTask = (e) => {
  const parentLi = e.target.parentNode.parentNode; // クリックされた対象の親要素li要素を取得
  e.target.parentNode.remove(); // 完了ボタンを含むdiv要素を削除
  parentLi.insertAdjacentHTML('beforeEnd', delButtons); // 削除、戻すボタンを含むdiv要素を追加
  completedList.appendChild(parentLi); // タスクを完了したタスクへ追加
  const todoText = parentLi.firstElementChild.textContent;
  const data = getDataFromStorage();
  const newData = {
    complete: data.complete.filter((todo) => todo !== todoText),
    uncomplete: [...data.uncomplete, todoText],
  };
  localStorage.setItem('todo', JSON.stringify(newData));
  addUncompleteEventListener();
  addDeleteEventListener();
};

const handleUncompleteTask = (e) => {
  const parentLi = e.target.parentNode.parentNode; // クリックされた対象の親要素li要素を取得
  e.target.parentNode.remove(); // 削除、戻すボタンを含むdiv要素を削除
  parentLi.insertAdjacentHTML('beforeEnd', compButton); // 完了ボタンを含むdiv要素を追加
  uncompletedList.appendChild(parentLi); // タスクを未完了のタスクへ追加
  const todoText = parentLi.firstElementChild.textContent;
  const data = getDataFromStorage();
  const newData = {
    complete: [...data.complete, todoText],
    uncomplete: data.uncomplete.filter((todo) => todo !== todoText),
  };
  localStorage.setItem('todo', JSON.stringify(newData));
  addCompleteEventListener();
};

const handleDeleteTask = (e) => {
  const parentLi = e.target.parentNode.parentNode; // クリックされた対象の親要素li要素を取得
  const todoText = parentLi.firstElementChild.textContent;
  const data = getDataFromStorage();
  const newData = {
    complete: [...data.complete],
    uncomplete: data.uncomplete.filter((todo) => todo !== todoText),
  };
  localStorage.setItem('todo', JSON.stringify(newData));

  parentLi.remove();
};

// EventListenerを付与する関数
const addCompleteEventListener = () => {
  const buttonComp = document.querySelectorAll('.completeButton');
  buttonComp.forEach((el) => {
    el.addEventListener('click', handleCompleteTask);
  });
};

const addUncompleteEventListener = () => {
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

// localStorage内のデータをレンダリングする
const renderTodos = (data) => {
  data.complete
    .map((todo) => createTodo(todo))
    .forEach((el) => uncompletedList.insertAdjacentHTML('beforeend', el));
  data.uncomplete
    .map((todo) => createCompletedTodo(todo))
    .forEach((el) => completedList.insertAdjacentHTML('beforeend', el));
};

renderTodos(getDataFromStorage());

// ストレージのデータを消去
const handleResetStorage = () => {
  localStorage.clear();
  location.reload();
};

resetEl.addEventListener('click', handleResetStorage);

// 初期化
addCompleteEventListener();
addUncompleteEventListener();
addDeleteEventListener();
