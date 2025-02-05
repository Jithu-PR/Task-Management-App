import connectionToDatabase from "../../../../lib/mongoose";
import Todo from "../../../../models/todo";
import { NextResponse } from "next/server";

export async function POST(request) {
    try{
        
        await connectionToDatabase();
        const {title, description, deadline} = await request.json();
        const newTodo = new Todo({title, description, deadline});
        await newTodo.save();
        return NextResponse.json(newTodo, {status: 201})
    }catch(e) {
        console.log(e);
        return NextResponse.json({ message: "Error adding todo" }, { status: 500 });
    }
}

export async function GET(request) {
    try{
        
        await connectionToDatabase();
        const todos = await Todo.find();
        console.log(todos,"todos");
        
        return NextResponse.json(todos, {status: 200})
    }catch(e) {
        console.log(e);
        return NextResponse.json({ message: "Error getting all todos" }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        console.log("PUT request received");

        await connectionToDatabase();

        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        const { title, description, deadline } = await request.json();
        
        console.log(id, title, description, deadline, "Received ID and Todo data");

        if (!id) {
            return NextResponse.json({ message: "Todo ID is required" }, { status: 400 });
        }

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id },
            { title, description, deadline },
            { new: true }
        );

        if (!updatedTodo) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        }

        return NextResponse.json(updatedTodo, { status: 200 });

    } catch (e) {
        console.log("Error editing todo", e);
        return NextResponse.json({ message: "Error editing todo" }, { status: 500 });
    }
}


export async function DELETE(request) {
    console.log("delete async");
    
    try {
        console.log("delete try block");

        await connectionToDatabase();
        
        const url = new URL(request.url);
        const currentTodoId = url.searchParams.get('id');
        console.log(currentTodoId,"id");
        
        if (!currentTodoId) {
            return NextResponse.json({ message: "Todo ID is required" }, { status: 400 });
        }

        const deletedTodo = await Todo.findByIdAndDelete(currentTodoId);
        if (!deletedTodo) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Todo deleted successfully" }, { status: 200 });

    } catch (e) {
        console.log("error deleting todo",e);
        return NextResponse.json({ message: "Error deleting todo" }, { status: 500 });
    }
}