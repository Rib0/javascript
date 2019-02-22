class TodoList {
    constructor () {
        this.todos = document.querySelector('.todos');
        const input = document.getElementById('input');

        this.addTodo = this.addTodo.bind(this);

        input.onkeypress = this.addTodo;
    }

    addTodo (e) {
        if (e.keyCode !== 13 || !e.target.value) return;

        this.createTodoBlock(e.target.value);
        e.target.value = '';
    }

    createTodoBlock (innerText) {
        const block = document.createElement('div');
        block.classList.add('todo');
        block.addEventListener('click', e => {
            this.completeTodo(e);
            this.closeTodo(e);
        })

        const complete = document.createElement('input');
        complete.type = 'checkbox';
        complete.classList.add('complete');

        const close = document.createElement('span');
        close.classList.add('close');
        close.textContent = 'x';

        const actions = document.createElement('div');
        actions.appendChild(complete);
        actions.appendChild(close);
        actions.classList.add('actions');

        const text = document.createElement('div');
        text.textContent = innerText;
        text.classList.add('text');

        block.appendChild(text);
        block.appendChild(actions);
        
        this.todos.insertBefore(block, this.todos.firstChild);
    }

    completeTodo (e) {
        if (!e.target.classList.contains('complete')) return;

        const todo = e.currentTarget.querySelector('.text');
        todo.classList.toggle('completed'); 
    }

    closeTodo (e) {
        if(!e.target.classList.contains('close')) return;

        const todo = e.currentTarget;
        todo.parentElement.removeChild(todo);        
    }
}

const todoList = new TodoList();