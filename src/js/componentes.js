import { Todo } from '../classes';
import { todoList } from '../index';


const divTodoList = document.querySelector('.todo-list');
const inputNewTodo = document.querySelector('.new-todo');
const clearAllTodos = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const todoCount = document.querySelector('.todo-count');

export const updatePendientes = () => {
    todoCount.innerHTML = `<strong>${todoList.getPendientes()}</strong> pendiente(s)`;
}

export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
        <li class="${ todo.completado ? 'completed' : '' }" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ todo.completado ? 'checked' : '' }>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    updatePendientes();
    return div.firstElementChild;
}

inputNewTodo.addEventListener('keyup', ( event ) => {
    if( event.keyCode === 13 && inputNewTodo.value.length > 0) {
        const nuevoTodo = new Todo( inputNewTodo.value );
        todoList.nuevoTodo(nuevoTodo);   
        crearTodoHtml(nuevoTodo);
        inputNewTodo.value = '';        
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input') ){
        todoList.toggleTodo(todoId);
        todoElemento.classList.toggle('completed');
    } else if( nombreElemento.includes('button') ){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild( todoElemento );
    }
    updatePendientes();
});

clearAllTodos.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length-1 ; i >= 0 ; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);
        }
    }
    updatePendientes();
});


ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if(!filtro) return;

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch(filtro){
            case 'Pendientes':
                if(completado)
                    elemento.classList.add('hidden');
                break;
            case 'Completados':
                if(!completado)
                    elemento.classList.add('hidden');
                break;
        }
    }
});
