let taskIdCounter = 0;
let currentColumnId = '';

function openModal(columnId) {
    currentColumnId = columnId;
    document.getElementById('task-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('task-modal').style.display = 'none';
    document.getElementById('task-input').value = '';
    document.getElementById('task-priority').value = 'high';
}

function addTask() {
    const taskText = document.getElementById('task-input').value.trim();
    const taskPriority = document.getElementById('task-priority').value;

    if (taskText === '') return;

    const taskContainer = document.querySelector(`#${currentColumnId} .task-container`);
    const task = document.createElement('div');
    task.className = `task ${taskPriority}`;
    task.draggable = true;
    task.id = `task-${taskIdCounter++}`;
    task.dataset.priority = taskPriority; // Store original priority

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;

    const prioritySelect = document.createElement('select');
    prioritySelect.className = 'priority-select';
    ['high', 'medium', 'low'].forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.text = priority.charAt(0).toUpperCase() + priority.slice(1);
        if (priority === taskPriority) option.selected = true;
        prioritySelect.appendChild(option);
    });

    prioritySelect.addEventListener('change', function() {
        task.className = `task ${this.value}`;
        task.dataset.priority = this.value; // Update stored priority
    });

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.textContent = 'x';
    removeButton.onclick = () => task.remove();

    task.appendChild(taskContent);
    task.appendChild(prioritySelect);
    task.appendChild(removeButton);
    taskContainer.appendChild(task);

    closeModal();

    // Add drag and drop event listeners
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
        e.target.style.display = 'none';
    }, 0);
}

function dragEnd(e) {
    e.target.style.display = 'flex';
}

document.querySelectorAll('.task-container').forEach(container => {
    container.addEventListener('dragover', dragOver);
    container.addEventListener('drop', drop);
});

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function drop(e) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    const task = document.getElementById(taskId);
    const newContainer = e.target.closest('.task-container');
    
    if (newContainer) {
        if (newContainer.parentElement.id === 'completed') {
            task.className = 'task low'; // Set to low priority (green)
        } else {
            const originalPriority = task.dataset.priority;
            task.className = `task ${originalPriority}`; // Revert to original priority
        }
        newContainer.appendChild(task);
        task.style.display = 'flex';
    }
}

// Handle Enter key press in input fields
document.getElementById('task-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

document.getElementById('task-priority').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

