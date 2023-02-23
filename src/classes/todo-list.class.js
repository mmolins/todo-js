import { Todo } from "./todo.class";


export class TodoList {

    constructor(  ){
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    getPendientes(){
        return this.todos.filter( todo => !todo.completado).length;
    }

    eliminarTodo( id ){
        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocalStorage();
    }

    toggleTodo( id ){        
        for(const todo of this.todos){
            if(todo.id == id){
                todo.completado = !todo.completado;
                break;
            }
        }
        this.guardarLocalStorage();
    }

    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        localStorage.setItem('todo',JSON.stringify(this.todos) );
     }

    cargarLocalStorage() {        
        this.todos = localStorage.getItem('todo') 
                            ? JSON.parse(localStorage.getItem('todo')) 
                            : [];
        this.todos = this.todos.map( Todo.fromJSON );
     }
}