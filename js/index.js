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

    // Delete selected todos
    deleteSelected: function() {
        // USING FOR LOOP
        // let maxIndex = this.todos.length - 1;
        // for (let i = maxIndex; i > -1 ; i--) {
        //     if (this.todos[i].completed === true) {
        //         this.todos.splice(i, 1);
        //         // completed.push(i);
        //     }
        // }
        // USING FOREACH
        // let completed = [];
        // this.todos.forEach(function(todo) {
        //     if (todo.completed === false) {
        //         completed.push(todo);
        //     }
        // });
        // this.todos = completed;
        // USING FILTER
        this.todos = this.todos.filter(function(todo) {
            return todo.completed === false;
        });
        

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
        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completed ++;
            }
        });
        this.todos.forEach(function(todo) {
            if (completed === totalTodos) {
                todo.completed = false;
            }
            else {
                todo.completed = true;
            }
        });
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

    deleteSelected: function() {
        todoList.deleteSelected();
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
            let todoTextContent = "You have not added anything todo yet!";
            todoLi.innerHTML = todoTextContent;
            todoUl.appendChild(todoLi); 
        }
        else {
            todoList.todos.forEach(function(todo, index) {
                let todoLi = document.createElement("li");
                let todoTextContent = "";
                if (todo.completed === true) {
                    todoTextContent = "<input type='checkbox' class='toggle' checked><span class='change'>" + todo.todoText + "</span>";
                    console.log("(X)" + todo.todoText);
                }
                else {
                    todoTextContent = "<input type='checkbox' class='toggle'><span class='change'>" + todo.todoText + "</span>";
                    console.log("( )" + todo.todoText);
                }
                todoLi.id = index;
                todoLi.innerHTML = todoTextContent;
                todoLi.appendChild(view.createInputField());
                todoLi.appendChild(view.createDeleteButton());
                todoLi.querySelector(".change-input").value = todo.todoText;
                todoLi.querySelector(".change-input").style.display = "none";
                todoUl.appendChild(todoLi); 
            });
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
            if (elementClicked.className === "toggle" || elementClicked.className === "change") {
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