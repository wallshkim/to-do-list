$(document).ready(onReady);


function onReady() {
    setupClickListeners();
    getTasks();
}// END onReady


/* sets up all click listeners */
function setupClickListeners() {
    $('#addTaskBtn').on('click', addTask);
    $('#taskTable').on('click', '.statusCheckbox', toggleComplete);
    $('#taskTable').on('click', '.deleteTaskBtn', deleteTask);
} // END setupClickListeners


/* gets value of taskIn input and runs saveTask to add it to the database
then clears input field */
function addTask() {
    let taskToSend = {
        task: $('#taskIn').val(),
    };

    saveTask(taskToSend);
    clearInputs();
} // END handleAddTask


/* get request to return all database rows */
function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        renderTasks(response);
    }).catch(function (err) {
        alert('error getting:', err);
    })
} // END getTasks


/* post request to add new task to database*/
function saveTask(newTask) {
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

/* put request to update completed status in database*/
function toggleComplete() {
    const id = $(this).closest('tr').data('id');
    const taskStatus = $(this).data('completed');

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


/* delete request to delete table row from database when delete button is clicked */
function deleteTask() {
    let id = $(this).closest('tr').data('id');

    $.ajax({
        type: 'DELETE',
        url: `/tasks/${id}`
    }).then(function () {
        getTasks();
    }).catch(function (err) {
        alert('error deleting:', err)
    })
} // END deleteTask


/* Empties table body then loops through array from GET request
if completed is marked as FALSE,it appends an unchecked box and a delete button to DOM
if completed it marked TRUE, it appends a checked box and a delete buttons to DOM */
function renderTasks(arrayOfTasks) {
    $('#taskTable').empty();

    arrayOfTasks.forEach(task => {
        if (task.completed == false) {
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


/* Clears the add task input field */
function clearInputs() {
    $('#taskIn').val('');
} // END clearInputs