console.log('js sourced');

$(document).ready(onReady);

function onReady(){
    console.log('jQuery sourced');
    setupClickListeners();
    getTasks();
}// END onReady

function setupClickListeners(){
    $('#addTaskBtn').on('click', handleAddTask);
    $('#taskTable').on('click', '.statusCheckbox', toggleComplete );
} // END setupClickListeners


function handleAddTask(){
    console.log('in handleAddTask');

    let taskToSend = {
        task: $('#taskIn').val(),
    };

    // call saveTask with new task object
    saveTask(taskToSend);
    clearInputs();

} // END handleAddTask


function toggleComplete(){

    const id = $(this).parent().parent().data('id');
    
    const taskStatus = $(this).data('status');
    
    console.log('in toggleStatus:', id, taskStatus);
    // $.ajax({
    //     type: 'PUT',
    //     url: `/tasks/${id}`,
    //     data: { newStatus: !taskStatus }
    // }).then(function (response) {
    //     console.log('back from PUT:', response);
    //     getItems();
    // }).catch(function (err) {
    //     alert('error updating:', err);
    // })
    
}


function getTasks(){
    console.log('in getTasks');
    // ajax call to server to get tasks
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        renderTasks(response);
    })
} // END getTasks

function saveTask(newTask){
    console.log('in saveTask');
    
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            task: newTask.task
        }
    }).then(function() {
        getTasks();
    })
} // END saveTask


function renderTasks(arrayOfTasks){
    console.log('in renderTasks');
    // clear existing table body
    $('#taskTable').empty();

    //loop through array
    arrayOfTasks.forEach(task => {
        $('#taskTable').append(`
            <tr data-id="${task.id}">
                <td>
                    <input type="checkbox" class="statusCheckbox" id="checkbox${task.id}" data-status="${task.completed}" name="${task.task}" value="${task.task}" />
                </td>
                <td>
                    <label class="taskItem" for="checkbox${task.id}">${task.task}</label>
                </td>
                <td>
                    <button type="button" class="deleteTaskBtn">Delete</button>
                </td>
            </tr>
        `)
    });
} // END renderTasks

function clearInputs(){
    $('#taskIn').val('');
} // END clearInputs