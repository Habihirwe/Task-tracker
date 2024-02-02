import subtaskValidationSChema from "../validation/subtaskvalidation.js";
import Subtask from "../Models/subtaskModel.js";
import Task from "../Models/taskModel.js";

const createsubtask= async(req,res)=>{
    const {error}= subtaskValidationSChema.validate(req.body)
    if(error){
        return res.status(400).json({
            status: "fail",
            validationError: error.details[0].message,
        
          });
    }

    try{
      const taskId= req.params.taskId
      const existingtask = await Task.findById(taskId)
      if(!existingtask){
        return res.status(404).json({
          status:'fail',
          "error":"the task not found"
        })
      }

        const subtask= new Subtask({
            title:req.body.title,
            description:req.body.description,
            task:existingtask._id
        })

        const savedSubtask= await subtask.save()
        existingtask.subtasks.push(savedSubtask._id);
        await existingtask.save()
        await savedSubtask.populate({ path: 'task',
        select: '_id',})
        return res.status(201).json({
            status:'success',
            "successMessage":"new subtask created successfully",
            data: savedSubtask
        })

    }catch(err){
        return res.status(400).json({
            status:"fail",
             error: err,
        })
        
    }

}

const getsinglesubtask = async(req,res)=>{
    try{
        const singlesubtask = await Subtask.findById(req.params.id)
        if(!singlesubtask){
            return res.status(404).json({
                status:"fail",
                message: "subtask not found",
            })
        }
         return   res.status(200).json({
            status:'success',
            data: singlesubtask
        })

    }catch(err){
        return res.status(500).json({
            staus:'fail',
            error:err.message
        })
    }
}

const  getAllsubtasks= async(req, res)=> {
    try {
      const allsubtasks = await Subtask.find()
      res.status(200).json({
        status: "success",
        data: allsubtasks,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        error: error.message,
      });
    }
  }

  const updatingsubtaskstatus= async(req,res)=>{
    try{
      const subtaskId= req.params.subtaskId
      const newstatus= req.body.status
      const existingsubtask= await Subtask.findById(subtaskId)

      if(!existingsubtask){
        return res.status(404).json({
          status:"fail",
          message:"subtask not found"
        })
      }
      if (!Subtask.schema.path('status').enumValues.includes(newstatus)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }

      if (existingsubtask.status === 'Started' && newstatus === 'Queuing') {
        return res.status(400).json({ message: 'Cannot transition from started to queuing' });
      }
      if ((existingsubtask.status === 'Completed' || existingsubtask.status === 'Canceled') && newstatus !== 'Completed') {
        return res.status(400).json({ message: 'Cannot transition from completed/canceled to a different status' });
      }

      if(existingsubtask.status==="Canceled"){
        return res.status(400).json({message: "can not be updated to order status"})
      }
      existingsubtask.status=newstatus;
      const updatedTask = await existingsubtask.save();
      return res.status(201).json({
        status:"success",
        message:"Subtast status updated",
        data:updatedTask,
      })

    }catch(err){
      return res.json(500).json({
        status:"fail",
        error:err
      })

    }

  }

  const deletesubtask = async (req, res) => {
    try {
      const subtaskId = req.params.id;
      const subtask = await Subtask.findById(subtaskId);
  
      if (!subtask) {
        return res.status(404).json({
          status: 'fail',
          error: "Subtask does not exist",
        });
      }
  
      const associatedTask = await Task.findById(subtask.task);
      if (!associatedTask) {
        return res.status(404).json({
          status: 'fail',
          error: "Associated task not found",
        });
      }
      associatedTask.subtasks = associatedTask.subtasks.filter(
        (taskId) => taskId.toString() !== subtaskId.toString()
      );
  
      await associatedTask.save();
      await subtask.deleteOne();
  
      return res.status(200).json({
        status: "success",
        message: "Subtask deleted successfully",
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  };
  

  const updatesubtask= async(req, res)=> {
    try {
      const { error } = subtaskValidationSChema.validate(req.body);

      if (error)
        return res.status(400).json({
          status: "fail",
          validationError: error.details[0].message,
        });
      const updatedtask = await Subtask.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
          },
        },
        { new: true }
      );
      
      if (!updatedtask) {
       return res.status(200).json({
          status: "fail",
          message: "subtask not found",
        });
        
      }
      res.status(200).json({
        status: "success",
        successMessage: "subtask updated successfully!",
        data: updatedtask,
      });
     
    } catch (error) {
      res.status(500).json({
        status: "fail",
        error: error.message,
      });
    }
  }

  export {createsubtask,getAllsubtasks,getsinglesubtask,deletesubtask,updatesubtask, updatingsubtaskstatus}