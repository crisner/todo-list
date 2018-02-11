// alert("connected");
let todos = ["egg", "butter"];
let length = todos.length;


// Display todo list
function displayTodos() {
    console.log(todos);
}

// Add a new todo
function addTodos(newTodo) {
    todos.push(newTodo);
    displayTodos();
}

// Delete a todo
function deleteTodo(index) {
    todos.splice(index, 1);
    displayTodos();
}

// Change a todo
function changeTodo(index, changeValue) {
    todos.splice(index, 1, changeValue);
    displayTodos();
}
