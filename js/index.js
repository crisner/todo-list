let todoList = {
    todos: [],

    // Add a new todo
    addTodos: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },

    // Delete a todo
    deleteTodo: function(index) {
        this.todos.splice(index, 1);
    },

    // Change a todo
    changeTodo: function(index, todoText) {
        this.todos.splice(index, 1, {
            todoText: todoText,
            completed: false
        });
        this.displayTodos();
    },

    // Complete a todo
    toggleCompleted: function(index) {
        let todo = this.todos[index];
        todo.completed = !todo.completed;
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


let handlers = {
    addTodos: function() {
        todoTextInput = document.getElementById("entertodo");
        todoList.addTodos(todoTextInput.value);
        todoTextInput.value = "";
        view.displayTodos();
    },

    deleteTodo: function(index) {
        todoList.deleteTodo(index);
        view.displayTodos();
    },

    toggleCompleted: function(index) {
        todoList.toggleCompleted(index);
        view.displayTodos();
    }
}

let view = {
    displayTodos: function() {
        let todoLength = todoList.todos.length;
        let todoUl = document.querySelector("ul");
        todoUl.innerHTML = "";
        
        if (todoLength === 0) {
            let todoLi = document.createElement("li");
            let todoTextContent = "";
            todoLi.innerHTML = "You have not added any todo yet!";
            todoUl.appendChild(todoLi); 
            console.log("You have not added any todo yet!");
        }
        else {
            for (var i = 0; i < todoLength; i++) {
                let todoLi = document.createElement("li");
                let todoTextContent = "";
                if (todoList.todos[i].completed === true) {
                    todoTextContent = "<input type='checkbox' class='toggle' checked>" + todoList.todos[i].todoText;
                    console.log("(X)" + todoList.todos[i].todoText);
                }
                else {
                    todoTextContent = "<input type='checkbox' class='toggle'> " + todoList.todos[i].todoText;
                    console.log("( )" + todoList.todos[i].todoText);
                }
                todoLi.id = i;
                todoLi.innerHTML = todoTextContent;
                // todoLi.insertBefore(this.createCheckedButton(), todoLi.childNodes[0]);
                todoLi.appendChild(this.createDeleteButton());
                todoUl.appendChild(todoLi);
            } 
        }
    },

    createDeleteButton: function() {
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&#10060";
        deleteButton.className = "delete";
        return deleteButton;
    },

    createCheckedButton: function() {
        let checked = document.createElement("input");
        checked.setAttribute("type", "checkbox");
        checked.setAttribute("class", "toggle");
        // checked.setAttribute("checked", "unchecked");
        return checked;
    },

    setEventHandlers: function() {
        var todoUl = document.querySelector("ul");
        todoUl.addEventListener("click", function(e) {
            let elementClicked = e.target;
            if (elementClicked.className === "delete") {
                let index = elementClicked.parentNode.id;
                handlers.deleteTodo(index);
            }
            if (elementClicked.className === "toggle") {
                let index = elementClicked.parentNode.id;
                handlers.toggleCompleted(index);
            }
            // console.log(e);
        });
    }
}



view.displayTodos();
view.setEventHandlers();