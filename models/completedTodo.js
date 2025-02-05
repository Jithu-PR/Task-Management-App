import mongoose from "mongoose";

const CompletedTodoSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
    },
    description : {
        type: String,
        required : true,
    },    
    deadline : {
        type: Date,
        required : true,
    }
})

const CompletedTodo = mongoose.models.CompletedTodo || mongoose.model("CompletedTodo", CompletedTodoSchema);
export default CompletedTodo;
