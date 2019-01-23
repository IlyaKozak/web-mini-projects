// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function addTask(event) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  const li = document.createElement('li');
  // Add class for materialize styling
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement('a');
  // Add class for materialize styling (secondary-content moves it to the right)
  link.className = "delete-item secondary-content";
  // Add icon html (fa-remove - "x" mark)
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  li.appendChild(link);

  taskList.appendChild(li);

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  // Prevent form default behaviour
  event.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(event) {
  if (event.target.parentElement.classList.contains('delete-item')) {
    event.target.parentElement.parentElement.remove();
      
    removeTaskFromLocalStorage(event.target.parentElement.parentElement);
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function clearTasks() {
  // One option is:
  // taskList.innerHTML = '';
  // https://jsperf.com/innerhtml-vs-removechild/191
  // The faster option is:
  if (confirm("Are You Sure?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

  // Clear from Local Storage
  clearTasksFromLocalStorage();

}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(event) {
  const text = event.target.value.toLowerCase();

  // NodeList.forEach() 
  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    // String.prototype.indexOf()
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}