document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');


//Create function for loading tasks

function loadTasks(){
    const storedTasks = JSON.parse(localstorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
}

//Adding new tasks
function addTask(taskText, save = true){
    if(!taskText){
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.onclick = () => {
        taskList.removeChild(li);
        removeTaskFromLocalStorage(taskText);
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);

    if(save) {
        saveTaskToLocalStorage(taskText);
    }

    taskInput.value = '';
}

//Saving Task to Local Storage
function saveTaskToLocalStorage(taskText){
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

//Create Event Listener for adding a task on button click
addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    addTask(taskText);
});

//Event Listener for adding a task when the enter key is pressed
taskInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    }
});


//Loading existing tasks from local storage on page load
loadTasks();
});