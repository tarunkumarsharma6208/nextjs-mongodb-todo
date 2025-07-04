import { connectDB } from '@/lib/mongodb'
import Todo from '@/models/Todo'

export async function GET() {
  await connectDB()
  const todos = await Todo.find().sort({ createdAt: -1 })
  return Response.json(todos)
}

export async function POST(req) {
  const { text } = await req.json()
  await connectDB()
  const newTodo = await Todo.create({ text })
  return Response.json(newTodo)
}
