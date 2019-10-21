console.log('js sourced');

$(document).ready(onReady);

function onReady() {
    console.log('jQuery sourced');
    setupClickListeners();
    getTasks();
}// END onReady

function setupClickListeners() {
    $('#addTaskBtn').on('click', addTask);
    $('#taskTable').on('click', '.statusCheckbox', toggleComplete);
    $('#taskTable').on('click', '.deleteTaskBtn', deleteTask);
} // END setupClickListeners


function addTask() {
    console.log('in addTask');

    let taskToSend = {
        task: $('#taskIn').val(),
    };

    // call saveTask with new task object
    saveTask(taskToSend);
    clearInputs();

} // END handleAddTask


function getTasks() {
    console.log('in getTasks');
    // ajax call to server to get tasks
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        renderTasks(response);
    }).catch(function (err) {
        alert('error getting:', err);
    })
} // END getTasks


function saveTask(newTask) {
    console.log('in saveTask');

    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            task: newTask.task
        }
    }).then(function () {
        getTasks();
    }).catch(function (err) {
        alert('error posting:', err);
    })
} // END saveTask


function toggleComplete() {

    const id = $(this).closest('tr').data('id');
    const taskStatus = $(this).data('completed');

    console.log('task id: ', id, 'task status is:', taskStatus, 'newStatus is: ', !taskStatus);

    $.ajax({
        type: 'PUT',
        url: `/tasks/${id}`,
        data: { newStatus: !taskStatus }
    }).then(function (response) {
        console.log('back from PUT:', response);
        getTasks();
    }).catch(function (err) {
        alert('error updating:', err);
    })
} // END toggleComplete


function deleteTask() {

    let id = $(this).closest('tr').data('id');
    console.log('in deleteTask, id: ', id);

    $.ajax({
        type: 'DELETE',
        url: `/tasks/${id}`
    }).then(function () {
        getTasks();
    }).catch(function (err) {
        alert('error deleting:', err)
    })
} // END deleteTask


function renderTasks(arrayOfTasks) {
    console.log('in renderTasks');
    // clear existing table body
    $('#taskTable').empty();

    //loop through array
    arrayOfTasks.forEach(task => {
        console.log('looping through the array completed status is:', task.completed);

        if (task.completed == false) {
            console.log('in if statement for completed = false');

            $('#taskTable').append(`
            <tr class="tableRow" data-id="${task.id}">
                <td class="taskDataCell">
                    <div class="pretty p-icon p-round p-jelly">
                        <input type="checkbox" class="statusCheckbox incomplete" id="checkbox${task.id}" data-completed="${task.completed}" name="${task.task}" value="${task.task}" />
                        <div class="state p-success">
                            <i class="icon material-icons">done</i>
                            <label class="taskItem" for="checkbox${task.id}">${task.task}</label>
                        </div>
                    </div>
                </td>
                <td>
                    <button type="button" class="deleteTaskBtn btn btn-outline-danger">X</button>
                </td>
            </tr>
        `)
        } // END if FALSE
        else if (task.completed == true) {
            console.log('in else if statement for completed = true');

            $('#taskTable').append(`
            <tr class="tableRow" data-id="${task.id}">
                <td class="taskDataCell">
                    <div class="pretty p-icon p-round p-jelly">
                        <input type="checkbox" class="statusCheckbox completed" id="checkbox${task.id}" data-completed="${task.completed}" name="${task.task}" value="${task.task}" checked />
                        <div class="state p-success">
                            <i class="icon material-icons">done</i>
                            <label class="completedTaskItem" for="checkbox${task.id}">${task.task}</label>
                        </div>
                    </div>
                </td>
                <td>
                    <button type="button" class="deleteTaskBtn btn btn-outline-danger">X</button>
                </td>
            </tr>
        `)
        } // END else if TRUE
        else {
            console.log('error with completed status');
        } // END else error

    });
} // END renderTasks


function clearInputs() {
    $('#taskIn').val('');
} // END clearInputs