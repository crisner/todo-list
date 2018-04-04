/**
 * todoList
 * @namespace todoList
 */
let todoList = {
    /**
     * List of todos
     * @memberof todoList
     */
    todos: [],

    /**
     * Adds the new todo to the todo list
     * @description Adds the new todo to the todo list
     * @function addTodos
     * @memberof todoList
     * @param {string} todoText New todo 
     */
    addTodos: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },

    /**
     * Removes a todo from the todo list
     * @description Removes a todo from the todo list
     * @function deleteTodo
     * @memberof todoList
     * @param {number} index Index of the todo to be removed 
     */
    deleteTodo: function(index) {
        this.todos.splice(index, 1);
    },

    /**
     * Removes completed todos from the todo list
     * @description Removes completed todos from the todo list
     * @function deleteSelected
     * @memberof todoList
     */
    deleteSelected: function() {
        // TODO: Remove completed todo items from the todoList
        this.todos = this.todos.filter(function(todo) {
            return todo.completed === false;
        });
    },

    /**
     * Change a todo from the todo list
     * @description Changes a todo from the todo list
     * @function changeTodo
     * @memberof todoList
     * @param {number} index Index of the todo to be changed
     * @param {string} todoText Changed todo
     */
    changeTodo: function(index, todoText) {
        // TODO: Remove the todo item at index and add the changed todo item
        this.todos.splice(index, 1, {
            todoText: todoText,
            completed: false
        });
    },

    /**
     * Toggle a todo item
     * @description Toggles a todo item
     * @function toggleCompleted
     * @memberof todoList
     * @param {number} index Index of the todo to be marked as completed 
     */
    toggleCompleted: function(index) {
        let todo = this.todos[index];
        // Toggle completed
        todo.completed = !todo.completed;
    },

    /**
     * Toggle all todo items
     * @description Toggles all todo items
     * @function toggleAll
     * @memberof todoList
     */
    toggleAll: function() {
        // TODO: Get number of completed todos
        let completed = 0;
        let totalTodos = this.todos.length;
        this.todos.forEach(function(todo) {
            // TODO: if todo is completed, add 1 to the variable completed
            if (todo.completed === true) {
                completed ++;
            }
        });
        // TODO: Toggle all todo items
        this.todos.forEach(function(todo) {
            // TODO: If number of completed todos is equal to the total number of todo items, change completed to false 
            if (completed === totalTodos) {
                todo.completed = false;
            }
            // TODO: If number of completed todos is not equal to the total number of todo items, change completed to true
            else {
                todo.completed = true;
            }
        });
    } 
}

/**
 * Object containing methods for event handling
 * @namespace handlers
 */
let handlers = {
    /**
     * Event handler method for adding todo items
     * @function addTodos
     * @memberof handlers
     */
    addTodos: function() {
        let todoTextInput = document.getElementById("entertodo");
        todoTextInput.setAttribute("placeholder", "Enter new todo");
        // TODO: Call addTodos method of todoList
        if (todoTextInput.value !== "") {
            todoList.addTodos(todoTextInput.value);
            view.displayTodos();
        } else {
            todoTextInput.setAttribute("placeholder", "Please add a todo to your list");
            view.displayTodos();
            view.removeAnimation();
        }
        todoTextInput.value = "";
    },
    /**
     * Event handler method for deleting todo items
     * @function deleteTodo
     * @memberof handlers
     */
    deleteTodo: function(index) {
        let todoLength = todoList.todos.length;
        // TODO: Call deleteTodo method of todoList
        todoList.deleteTodo(index);
        // TODO: Display todo items
        view.displayTodos();
        // TODO: If there are more than one todo item on the list, call removeAnimation method from the view object
        if (todoLength > 1) {
            view.removeAnimation();
        }
    },
    /**
     * Event handler method for deleting selected todo items
     * @function deleteSelected
     * @memberof handlers
     */
    deleteSelected: function() {
        let todoLength = todoList.todos.length;
        view.deleteSelectedTodoAnimation(todoList.todos); // TODO: Run the animation for removing todo items
        setTimeout(function() {
            todoList.deleteSelected(); // TODO: Call the deleteSelected method from the todoList object
            view.displayTodos();
            if (todoLength > 1) {
                view.removeAnimation();
            }
        }, 1000);
    },
    /**
     * Event handler method for changing todo item
     * @function changeTodo
     * @memberof handlers
     */
    changeTodo: function(index, todoText) {
        todoList.changeTodo(index, todoText); // TODO: Call the changeTodo method from the todoList object
        view.displayTodos();
        view.removeAnimation();
    },
    /**
     * Event handler method for toggling a todo item
     * @function toggleCompleted
     * @memberof handlers
     */
    toggleCompleted: function(index) {
        todoList.toggleCompleted(index); // TODO: Call the toggleCompleted method from the todoList object
        view.displayTodos();
        view.removeAnimation();
    },
    /**
     * Event handler method for toggling all todo items
     * @function toggleAll
     * @memberof handlers
     */
    toggleAll: function() {
        todoList.toggleAll(); // TODO: Call the toggleAll method from the todoList object
        view.displayTodos();
        view.removeAnimation();
    }
}

/**
 * Object containing methods for visual elements of the page
 * @namespace view
 */
let view = {
    /**
     * Display todo items on page
     * @description Display todo items on the page
     * @function displayTodos
     * @memberof view
     */
    displayTodos: function() {
        let todoLength = todoList.todos.length;
        let todoUl = document.querySelector("ul");
        let indices = [];
        currentIndex = 0;
        todoUl.innerHTML = "";
        // TODO: If there are no items on the list, show message
        if (todoLength === 0) {
            let todoLi = document.createElement("li");
            todoLi.className = "default";
            let todoTextContent = "<span id='msg'>You have not added anything todo yet!</span>";
            todoLi.innerHTML = todoTextContent;
            todoUl.appendChild(todoLi); 
        }
        // TODO: If there are items in the todo list, create elements to display the items
        else {
            todoList.todos.forEach(function(todo, index) {
                let todoLi = document.createElement("li");
                let todoTextContent = "";
                if (todo.completed === true) {
                    todoTextContent = "<input type='checkbox' class='toggle' checked><span class='change'>" + todo.todoText + "</span>";
                    todoLi.style.color = "#c3c0c0";
                    todoLi.style.textDecoration = "line-through";
                    todoLi.style.textDecorationColor = "#c3c0c0";
                }
                else {
                    todoTextContent = "<input type='checkbox' class='toggle'><span class='change'>" + todo.todoText + "</span>";
                    todoLi.style.textDecoration = "none";
                }
                todoLi.id = index;
                todoLi.innerHTML = todoTextContent;
                todoLi.appendChild(view.createInputField());
                todoLi.appendChild(view.createDeleteButton());
                todoLi.querySelector(".change-input").value = todo.todoText;
                todoLi.querySelector(".change-input").style.display = "none";
                
                todoUl.appendChild(todoLi); 
                todoUl.appendChild(view.createBorder());
                indices.push(index);
            });
            currentIndex = Math.max(...indices);
            this.addAnimation(currentIndex); // TODO: Add animation to new todo
        }
    },
    /**
     * Animation for new todo
     * @description Animation for new todo
     * @function addAnimation
     * @memberof view
     * @param {number} index Index associated with the new todo
     */
    addAnimation: function(index) {
        let getLi = document.querySelectorAll("li");
        let border = document.querySelectorAll(".border");
        let currentLi = getLi[index];
        let currentBorder = border[index];
        // TODO: Add animation classes from Animate.css
        currentLi.classList = "animated fadeInDown position";
        currentBorder.classList = "border animated fadeIn";
    },
    /**
     * Remove animation for last todo
     * @description Removes animation for last todo
     * @function removeAnimation
     * @memberof view
     */
    removeAnimation: function() {
        let getLi = document.querySelectorAll("li");
        let border = document.querySelectorAll(".border");
        let currentLi = getLi[getLi.length-1];
        let currentBorder = border[getLi.length-1];
        // TODO: Assign default classes with no animation
        if (getLi[0].className !== "default") {
            currentLi.classList = "position";
            currentBorder.classList = "border";
        }
    },
    /**
     * Add animation for delete todo action
     * @description Adds animation when deleting a todo item
     * @function deleteTodoAnimation
     * @memberof view
     * @param {number} index Index associated with the todo to be deleted
     */
    deleteTodoAnimation: function(index) {
        let getLi = document.querySelectorAll("li");
        let border = document.querySelectorAll(".border");
        let currentLi = getLi[index];
        let currentBorder = border[index];
        // TODO: Add animation classes from Animate.css
        currentLi.classList = "animated fadeOut";
        currentBorder.classList = "border animated fadeOut";
    },
    /**
     * Add animation for delete selected todo action
     * @description Adds animation when deleting completed todo items
     * @function deleteSelectedTodoAnimation
     * @memberof view
     * @param {Object} todos - Placeholder for todo items
     */
    deleteSelectedTodoAnimation: function(todos) {
        let getLi = document.querySelectorAll("li");
        let border = document.querySelectorAll(".border");
        todos.forEach(function(todo, index) {
            let currentLi = getLi[index];
            let currentBorder = border[index];
            // TODO: Add animation classes from Animate.css to completed todo items
            if (todo.completed) {
                currentLi.classList = "animated fadeOut";
                currentBorder.classList = "border animated fadeOut";
            }  
        });
    },
    /**
     * Creates a delete button
     * @description Creates a delete button
     * @function createDeleteButton
     * @memberof view
     */
    createDeleteButton: function() {
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&#10060";
        deleteButton.className = "delete";
        return deleteButton;
    },
    /**
     * Creates an input text field
     * @description Creates an input text field
     * @function createInputField
     * @memberof view
     */
    createInputField: function() {
        let inputField = document.createElement("input");
        inputField.setAttribute("type", "text");
        inputField.className = "change-input";
        return inputField;
    },
    /**
     * Creates border element for each todo
     * @description Creates border element for each todo
     * @function createBorder
     * @memberof view
     */
    createBorder: function() {
        let border = document.createElement("div");
        border.className = "border";
        return border;
    },
    /**
     * Sets event handlers
     * @description Sets event handlers for elements in the display todo list
     * @function setEventHandlers
     * @memberof view
     */
    setEventHandlers: function() {
        var todoUl = document.querySelector("ul");
        var entertodo = document.querySelector("#entertodo");
        /**
         * Add event listener for delete and toggle
         */
        todoUl.addEventListener("click", function(e) {
            let elementClicked = e.target;
            if (elementClicked.className === "delete") {
                // TODO: Remove todo item animation
                let index = elementClicked.parentNode.id;
                view.deleteTodoAnimation(index);
                /**
                 * set a delay
                 * @function setTimeOut
                 * @param {Object} function containing action to be delayed
                 * @fires handlers.deleteTodo(index)
                 */
                setTimeout(function() {
                    handlers.deleteTodo(index);
                }, 1000);
            }
            if (elementClicked.className === "toggle") {
                // TODO: Toggle todo item
                let index = elementClicked.parentNode.id;
                handlers.toggleCompleted(index);
            }
        });
        /**
         * Add event listener for todo to be changed
         */
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
        /**
         * Add event listener for change-input
         */
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
        /**
         * Add event listener to add todo item on enter
         */
        entertodo.addEventListener("keypress", function(e){
            let elementClicked = e.target;
                if (e.key === "Enter") {
                    handlers.addTodos();
                }
        });
    }
}

view.displayTodos();
view.setEventHandlers();