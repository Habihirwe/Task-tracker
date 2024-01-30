
import mongoose from "mongoose";

const subtaskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    status:{
        type:String,
        enum:['Queuing','Started','Completed','Canceled'],
        default:'Queuing'
    },
    iscomplete:{
        type:Boolean,
        default: false
    },
    dateCreated: {
        type: 'date',
        default: Date.now()
  
    }
})
const Subtask= mongoose.model('Subtask',subtaskSchema)
export default Subtask
