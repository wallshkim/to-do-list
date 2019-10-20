console.log('js sourced');

$(document).ready(onReady);

function onReady(){
    console.log('jQuery sourced');
    setupClickListeners();
}// END onReady

function setupClickListeners(){
    $('#addTaskBtn').on('click', handleAddTask);
} // END setupClickListeners


function handleAddTask(){
    console.log('in handleAddTask');
    
} // END handleAddTask

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

function renderTasks(array){
    console.log('in renderTasks');
    // clear existing table body
    $('#taskTable').empty();

    //loop through array
    array.forEach(element => {
        
    });
} // END renderTasks

function clearInputs(){

} // END clearInputs