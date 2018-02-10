// alert("connected");
let todos = ["egg", "butter"];
// let length = todos.length;
let inputText = document.getElementById("entertodo");
let addbtn = document.getElementById("submittodo");
addbtn.addEventListener("click", function() {
    addTodos(inputText.value);
    console.log(inputText.value);
    event.preventDefault();
});
// inputText.addEventListener("change", function() {
//     console.log(inputText.value);
// });
function displayTodos() {
    let display = document.getElementById("display");
    let eachTodo = "";
    let length = todos.length;
    for (var i = 0; i < length; i++) {
        eachTodo += "<li>"+ todos[i] + "</li>";
    }
    display.innerHTML = "<ul>" + eachTodo + "</ul>";
    console.log(todos);
}

function addTodos(newTodo) {
    todos.push(newTodo);
    displayTodos();
}

displayTodos();