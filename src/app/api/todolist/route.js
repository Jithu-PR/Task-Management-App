import connectionToDatabase from '../../../../lib/mongoose';
import Todo from '../../../../models/todo';
import { NextResponse } from 'next/server';

await connectionToDatabase();

export async function POST(request) {
  try {
    const { title, description, deadline } = await request.json();
    const newTodo = new Todo({ title, description, deadline });

    await newTodo.save();
    return NextResponse.json(
      { message: 'Task added successfully', newTodo },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: 'Error adding todo' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const todos = await Todo.find();
    return NextResponse.json(todos, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: 'Error getting all todos' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  const data = await request.json();
  try {
    const updatedTodo = await Todo.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    if (data.completed) {
      return NextResponse.json(
        { message: 'Todo marked as completed', updatedTodo },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Todo updated', updatedTodo },
        { status: 200 }
      );
    }
  } catch (e) {
    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const currentTodoId = url.searchParams.get('id');
    console.log(currentTodoId, 'id');

    if (!currentTodoId) {
      return NextResponse.json(
        { message: 'Todo ID is required' },
        { status: 400 }
      );
    }

    const deletedTodo = await Todo.findByIdAndDelete(currentTodoId);
    if (!deletedTodo) {
      return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Todo deleted successfully' },
      { status: 200 }
    );
  } catch (e) {
    console.log('error deleting todo', e);
    return NextResponse.json(
      { message: 'Error deleting todo' },
      { status: 500 }
    );
  }
}
