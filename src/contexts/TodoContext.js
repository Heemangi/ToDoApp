import { useContext, createContext } from "react";

export const TodoContext = createContext({
    /**Todos has objects inside an array. todos is an array */
    todos:[
        {
            id: 1,
            todo: "todo msg",
            completed: false,
        }
    ],
    //Defining the methods/ functions that we will use in future, along with the required parameters.
    addTodo: (todo) => {},
    updateTodo: (id,todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
})


export const useTodo = () => {
    //Returning the context is necessary. context passing means specifying what is this context about
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider