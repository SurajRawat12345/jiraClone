import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project", 
        required: true 
    },
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        trim: true 
    },
    status: { 
        type: String, 
        enum: ["backlog", "todo", "in-progress","blocked", "review", "done", "archived"], 
        default: "backlog" 
    },
    assigneeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    priority: { 
        type: String, 
        enum: ["low", "medium", "high"], 
        default: "medium" 
    },
    dueDate: { 
        type: Date 
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment" 
    }],
}, {
    timestamps: true
})

export default mongoose.model("Task", projectSchema);