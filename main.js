const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const filterAll = document.getElementById('filterAll');
const filterCompleted = document.getElementById('filterCompleted');
const filterActive = document.getElementById('filterActive');




// Массив для хранения задач
let tasks = [];
let currentFilter = 'all'; // Храним текущий фильтр

// Функция для отображения задач с учётом фильтра
function renderTasks() {
    taskList.innerHTML = ''; // Очищаем список перед рендером

    let filteredTasks;
    if (currentFilter === 'all') {
        filteredTasks = tasks;
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    // Отображаем отфильтрованные задачи
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('completed');
        }
        li.addEventListener('click', () => toggleTaskCompletion(index));
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false});
        taskInput.value = '';
        saveTasksToLocalStorage();
        renderTasks();
    } 
}

function toggleTaskCompletion(index) {
    task[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage();
    renderTasks();
}

function filterTasks(filter) {
    currentFilter = filter;
    renderTasks();
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if(storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
}

addTaskBtn.addEventListener('click', addTask);
filterAll.addEventListener('click', () => filterTasks('all'));
filterCompleted.addEventListener('click', () => filterTasks('completed'));
filterActive.addEventListener('click', () => filterTasks('active'));

loadTasksFromLocalStorage()