import { connectDB } from '@/lib/mongodb'
import Todo from '@/models/Todo'

export async function PUT(req, { params }) {
  const { id } = params
  const { completed } = await req.json()
  await connectDB()
  const updated = await Todo.findByIdAndUpdate(id, { completed }, { new: true })
  return Response.json(updated)
}

export async function DELETE(req, { params }) {
  const { id } = params
  await connectDB()
  await Todo.findByIdAndDelete(id)
  return Response.json({ message: 'Deleted' })
}
