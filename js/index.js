let todoList = {
    todos: [],

    // Display todo list
    displayTodos: function() {
        let todoLength = this.todos.length;
        if (todoLength === 0) {
            console.log("You have not added any todo yet!");
        }
        else {
            console.log("Todos");
            for (var i = 0; i < todoLength; i++) {
                if (this.todos[i].completed === true) {
                    console.log("(X)" + this.todos[i].todoText);
                }
                else {
                    console.log("( )" + this.todos[i].todoText);
                }
            } 
        }
    },

    // Add a new todo
    addTodos: function(newTodo) {
        this.todos.push({
            todoText: newTodo,
            completed: false
        });
        this.displayTodos();
    },

    // Delete a todo
    deleteTodo: function(index) {
        this.todos.splice(index, 1);
        this.displayTodos();
    },

    // Change a todo
    changeTodo: function(index, changeValue) {
        this.todos.splice(index, 1, {
            todoText: changeValue,
            completed: false
        });
        this.displayTodos();
    },

    // Complete a todo
    toggleCompleted: function(index) {
        let todo = this.todos[index];
        todo.completed = !todo.completed;
        this.displayTodos();
    },

    // Toggle all
    toggleAll: function() {
        let completed = 0;
        let totalTodos = this.todos.length;
        for (var i = 0; i < totalTodos; i++) {
            if (this.todos[i].completed === true) {
                completed ++;
            }
        }
        if (completed === totalTodos) {
            for (var i = 0; i < totalTodos; i++) {
                this.todos[i].completed = false;
            }
        }
        else {
            for (var i = 0; i < totalTodos; i++) {
                this.todos[i].completed = true;
            }
        }
        this.displayTodos();
    } 
}
