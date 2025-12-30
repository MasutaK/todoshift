const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');

// ----------------- THEME -----------------
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
let theme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
document.body.classList.add(theme);

themeToggle.addEventListener('click', () => {
    theme = document.body.classList.contains('dark') ? 'light' : 'dark';
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
});

// ----------------- TASKS -----------------
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task));

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if(taskText === "") return;
    const task = { text: taskText, completed: false };
    tasks.push(task);
    addTaskToDOM(task);
    saveTasks();
    taskInput.value = "";
});

// Add task to DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    if(task.completed) li.classList.add('completed');

    // Toggle completed
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        task.completed = !task.completed;
        saveTasks();
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tasks = tasks.filter(t => t !== task);
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}
