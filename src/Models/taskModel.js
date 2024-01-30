
import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    iscomplete:{
        type:Boolean,
        default: false
    },
    priority:{
        type:String,
        enum:['Low','Medium','High'],
        default:'Medium'
    },
    starteddate:{
       type:Date,
       required:true
    },
    subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }],
    deadline:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['queuing','started','completed','canceled'],
        default:'queuing'
    },
    dateCreated: {
        type: 'date',
        default: Date.now()
  
    }
})
const Task= mongoose.model('Task',taskSchema)
export default Task
