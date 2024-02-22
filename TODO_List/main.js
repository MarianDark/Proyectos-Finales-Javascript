document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const emptyMessage = document.getElementById('emptyMessage');

    addTaskButton.addEventListener('click', function(event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌';

            deleteButton.addEventListener('click', function() {
                listItem.remove();
                if (taskList.children.length === 0) {
                    emptyMessage.style.display = 'block';
                }
            });

            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
            emptyMessage.style.display = 'none';
            taskInput.value = '';
        }
    });
});
