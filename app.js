const todoInput= document.querySelector('.todo-input');
const todoButton= document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);
$(document).ready(function(){
        $("#deadline").datepicker();
        console.log("hi");
});

function addTodo(event){
    //prevents form from being submitted
    event.preventDefault();

    const todoDiv= document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo= document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);

    //check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value='';
}

function deleteCheck(event){
    const item = event.target; 
    if(item.classList[0]=='trash-btn')
    {
        item.parentElement.classList.add("fall");
        item.parentElement.addEventListener('transitionend', function(){
            item.parentElement.remove();
        });
        let todosArr = JSON.parse(localStorage.getItem("todos"))
        let element=item.parentElement.getElementsByTagName('li')[0].innerHTML;
        const index = todosArr.indexOf(element);
        todosArr.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todosArr))
    }
    if(item.classList[0]=='complete-btn')
    {
        item.parentElement.classList.toggle("completed");    
    }
}

function filterTodo(event){
    const todoarr = todoList.childNodes;
    console.log(todoarr);
    for(todo in todoarr){
        console.log(todoarr[todo]);
        switch(event.target.value){
            case "all":
                if(todoarr[todo].nodeName != '#text'){
                    todoarr[todo].style.display = 'flex';
                }
                break;
            case "completed":
                if(todoarr[todo].nodeName != '#text'){
                    if(todoarr[todo].classList.contains("completed")){
                        todoarr[todo].style.display = 'flex';
                    } 
                    else{
                        todoarr[todo].style.display = 'none';
                    }
                }
                break;
            case "uncompleted":
                if(todoarr[todo].nodeName != '#text'){
                    if(!todoarr[todo].classList.contains("completed")){
                        todoarr[todo].style.display = 'flex';
                    } 
                    else{
                        todoarr[todo].style.display = 'none';
                    }
                }
                break;
        }
    };
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else
    {
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

window.onload = function getTodos(){
    let todos;
    if( localStorage.getItem('todos') === null){
        todos = [];
    }
    else
    {
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    console.log(todos);
    for(let i=0;i<todos.length;i++){
        console.log("in for loop : "+todos[i]);
        const todoDiv= document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo= document.createElement('li');
        newTodo.innerText = todos[i];
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML='<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    }
}
