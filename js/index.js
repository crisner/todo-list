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
    },

    // Toggle a todo
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

    changeTodo: function(index, todoText) {
        todoList.changeTodo(index, todoText);
        view.displayTodos();
    },

    toggleCompleted: function(index) {
        todoList.toggleCompleted(index);
        view.displayTodos();
    },

    toggleAll: function() {
        todoList.toggleAll();
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
                    todoTextContent = "<input type='checkbox' class='toggle' checked><span class='change'>" + todoList.todos[i].todoText + "</span>";
                    console.log("(X)" + todoList.todos[i].todoText);
                }
                else {
                    todoTextContent = "<input type='checkbox' class='toggle'><span class='change'>" + todoList.todos[i].todoText + "</span>";
                    console.log("( )" + todoList.todos[i].todoText);
                }
                todoLi.id = i;
                todoLi.innerHTML = todoTextContent;
                todoLi.appendChild(this.createInputField());
                todoLi.appendChild(this.createDeleteButton());
                todoLi.querySelector(".change-input").value = todoList.todos[i].todoText;
                todoLi.querySelector(".change-input").style.display = "none";
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

    createInputField: function() {
        let inputField = document.createElement("input");
        inputField.setAttribute("type", "text");
        inputField.className = "change-input";
        return inputField;
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
        });

        todoUl.addEventListener("dblclick", function(e){
            let elementClicked = e.target;
            if (elementClicked.className === "change") {
                let index = elementClicked.parentNode.id;
                let text = elementClicked.nextElementSibling;
                let todoText = "";
                text.style.display = "inline";
                text.focus();
                elementClicked.textContent = "";
            }
        });

        todoUl.addEventListener("keypress", function(e){
            let elementClicked = e.target;
            if (elementClicked.className === "change-input") {
                let index = elementClicked.parentNode.id;
                let todoText = "";
                if (e.key === "Enter") {
                    todoText = elementClicked.value;
                    handlers.changeTodo(index, todoText);
                }
            }
        });
    }
}



view.displayTodos();
view.setEventHandlers();