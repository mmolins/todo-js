export class Todo {

    static fromJSON({tarea, id, completado, fechaCreacion}){
        const tempTodo = new Todo(tarea);
        tempTodo.id           = id;
        tempTodo.completado   = completado;
        tempTodo.fechaCrecion = fechaCreacion;
        return tempTodo;
    }


    constructor( tarea ) {
        this.tarea      = tarea;        
        this.id         = new Date().getTime();
        this.completado = false;
        this.fechaCrecion = new Date();
    }

}