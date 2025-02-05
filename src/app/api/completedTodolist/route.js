import connectionToDatabase from "../../../../lib/mongoose";
import CompletedTodo from "../../../../models/completedTodo";
import { NextResponse } from "next/server";

export async function POST(request) {
    try{
        
        await connectionToDatabase();
        const {title, description, deadline} = await request.json();
        const newCompletedTodo = new CompletedTodo({title, description, deadline});
        await newCompletedTodo.save();
        return NextResponse.json(newCompletedTodo, {status: 201})
    }catch(e) {
        console.log(e);
        return NextResponse.json({ message: "Error adding todo" }, { status: 500 });
    }
}

export async function GET(request) {
    try{
        
        await connectionToDatabase();
        const todos = await CompletedTodo.find();
        console.log(todos,"todos");
        
        return NextResponse.json(todos, {status: 200})
    }catch(e) {
        console.log(e);
        return NextResponse.json({ message: "Error getting all todos" }, { status: 500 });
    }
}

export async function DELETE(request) {
    console.log("delete async");
    
    try {
        console.log("delete try block");

        await connectionToDatabase();
        
        const url = new URL(request.url);
        const currentCompletedTodoId = url.searchParams.get('id');
        console.log(currentCompletedTodoId,"id");
        
        if (!currentCompletedTodoId) {
            return NextResponse.json({ message: "Todo ID is required" }, { status: 400 });
        }

        const deletedCompletedTodo = await CompletedTodo.findByIdAndDelete(currentCompletedTodoId);
        if (!deletedCompletedTodo) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Todo deleted successfully" }, { status: 200 });

    } catch (e) {
        console.log("error deleting todo",e);
        return NextResponse.json({ message: "Error deleting todo" }, { status: 500 });
    }
}