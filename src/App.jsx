import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev)=>[{id:Date.now(), ...todo},...prev])
  }

  const updateTodo = (id, todo) => {
    //prev is previous state in which all todos were present in the array, eachtodo is individual todo which if id matches 
    //it will update otherwise will display as it is
    setTodos((prev) => prev.map((eachTodo)=>(eachTodo.id === id ? todo : eachTodo)));
  }

  const deleteTodo = (id) => {
    //Will filter out and show only the todos which do not match the id
    setTodos((prev) => prev.filter((todo) => todo.id!==id ));
  }

  const toggleComplete = (id) => {
    //getting all the todos from prev state array then mapping through them, comparing the id of eachTodo, if it matches
    //then toggle complete or not complete based on selection, otherwise return the other todos as it is during traversal of map
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo) )
  }

  //Local Storage work
  //when the page reloads, getting the todos from localstorage and converting the value received into JSON, 
  //then setTodos in the end to show it on the app
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0){
    setTodos(todos)}
  },[])

  //here todos is the key and the stringify value is the value. setting / saving the item in localstorage
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])


  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>

                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}
 
export default App
