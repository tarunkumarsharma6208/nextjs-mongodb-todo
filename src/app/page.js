'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTodos(data)
  }

  const addTodo = async () => {
    if (!task.trim()) return
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text: task }),
    })
    const newTodo = await res.json()
    setTodos([newTodo, ...todos])
    setTask('')
  }

  const toggleComplete = async (id, completed) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ completed: !completed })
    })
    const updated = await res.json()
    setTodos(todos.map(todo => todo._id === id ? updated : todo))
  }

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    setTodos(todos.filter(todo => todo._id !== id))
  }

  return (
    <main className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">To-Do App</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
          className="border p-2 rounded w-64"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {todos.map((todo) => (
          <li key={todo._id} className="flex justify-between items-center bg-white p-3 rounded shadow">
            <span
              onClick={() => toggleComplete(todo._id, todo.completed)}
              className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
