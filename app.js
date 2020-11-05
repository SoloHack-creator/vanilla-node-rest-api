// selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// EventListener

document.addEventListener('DOMContentLoaded', getTodo);

const addTodo = (event) => {
  event.preventDefault();

  // Add div todo

  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // create list
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // add to local storage

  saveLocal(todoInput.value);
  // check Mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-button');
  todoDiv.appendChild(completedButton);

  // Trash
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-button');
  todoDiv.appendChild(trashButton);

  // append to todo list

  todoList.appendChild(todoDiv);
  // clear input values
  todoInput.value = '';
};

todoButton.addEventListener('click', addTodo);

const deleteCheck = (e) => {
  const item = e.target;
  // console.log(item);
  if (item.classList[0] === 'trash-button') {
    const todo = item.parentElement;
    // Add animation
    todo.classList.add('fall');
    removeLocal(todo);
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }
  // console.log(item);
  if (item.classList[0] === 'complete-button') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
};
todoList.addEventListener('click', deleteCheck);

filterOption.addEventListener('click', (e) => {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;

      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      default:
        todo.style.display = 'flex';
    }
  });
});

todoInput.addEventListener('keypress', (e) => {
  if (e.target.value != null) todoButton.removeAttribute('disabled');
});

function saveLocal(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodo() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // Add div todo
  todos.forEach((todo) => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create list
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // check Mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-button');
    todoDiv.appendChild(completedButton);

    // Trash
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-button');
    todoDiv.appendChild(trashButton);

    // append to todo list

    todoList.appendChild(todoDiv);
  });
}

function removeLocal(todo) {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  console.log('inside remove', todo.children[0].innerText);
  const todoIndex = todo.children[0].innerText;
  console.log(todos.indexOf(todoIndex));
  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem('todos', JSON.stringify(todos));
}
