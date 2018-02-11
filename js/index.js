let todoList = {
    todos: ["egg", "butter"],

    // Display todo list
    displayTodos: function() {
        console.log(this.todos);
    },

    // Add a new todo
    addTodos: function(newTodo) {
        this.todos.push(newTodo);
        this.displayTodos();
    },

    // Delete a todo
    deleteTodo: function(index) {
        this.todos.splice(index, 1);
        this.displayTodos();
    },

    // Change a todo
    changeTodo: function(index, changeValue) {
        this.todos.splice(index, 1, changeValue);
        this.displayTodos();
    }
}
