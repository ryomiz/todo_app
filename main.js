'use strict';

// フォームに関するelements
const todoEl = document.getElementById('todo');
const submitEl = document.getElementById('submit');
const alertEl = document.getElementById('alert');

// タスクに関するelements
const buttonComp = document.querySelectorAll('.completeButton');
const buttonBack = document.querySelectorAll('.backButton');
const buttonDel = document.querySelectorAll('.delButton');

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
  console.log(todo);
  clearInput();
};

submitEl.addEventListener('click', returnInputValue);

buttonComp.forEach((el) => {
  el.addEventListener('click', () => {
    console.log('Complete');
  });
});

buttonBack.forEach((el) => {
  el.addEventListener('click', () => {
    console.log('Back');
  });
});

buttonDel.forEach((el) => {
  el.addEventListener('click', () => {
    console.log('Delete');
  });
});
