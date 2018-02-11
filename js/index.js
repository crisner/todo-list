// alert("connected");
let todos = ["egg", "butter"];
let inputText = document.getElementById("entertodo");
let display = document.getElementById("display");
let length = todos.length;
let addbtn = document.getElementById("submittodo");
let ul = document.getElementById("todolist");
let delbtn = document.getElementsByClassName("delete");
let li = document.getElementsByClassName("crossed");

console.log(li);


// Add a new todo after submit
addbtn.addEventListener("click", function() {
    addTodos(inputText.value);
    console.log(inputText.value);
    event.preventDefault();
});

// Display todo list
function displayTodos() {
    let eachTodo = "";
    let crossed = "<span class='crossed'>[ ]</span>";
    let length = todos.length;
    for (var i = 0; i < length; i++) {
        eachTodo += "<li>" + crossed + todos[i] + " <span class='delete' id='"+ i +"'>x</span></li>";
    }
    display.innerHTML = "<ul id='todolist'>" + eachTodo + "</ul>";
    console.log(todos);
}

// Add a new todo
function addTodos(newTodo) {
    todos.push(newTodo);
    displayTodos();
    clearEntry();
}

// function removeTodo() {
//     let delbtn = document.getElementsByClassName("delete");
//     for (var i = 0; i < delbtn.length; i++) {
//         delbtn[i].addEventListener("click", function(e) {
//             e.target.innerText.remove(e.target.parentElement);
//             console.log(e.target.innerText);
//         });
//     }
// }

// Delete a todo
function deleteTodo(index) {
    todos.splice(index, 1);
    displayTodos();
}

// Complete a todo
function changeTodo(index, changeValue) {
    todos.splice(index, 1, changeValue);
    displayTodos();
}

// Clear form field after submit
function clearEntry() {
    inputText.value = "";
}


displayTodos();
// removeTodo();