import Task from "../Models/taskModel.js";
import Subtask from "../Models/subtaskModel.js"
import taskValidationSChema from "../validation/taskvalidation.js";

const createtask = async (req, res) => {
  const { error } = taskValidationSChema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "fail",
      validationError: error.details[0].message,
    });
  }
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      starteddate: req.body.starteddate,
      priority: req.body.priority,
    });
    const newtask = await task.save();
    return res.status(201).json({
      status: "success",
      successMessage: "new task created successfully",
      data: newtask,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

const getsingletask = async (req, res) => {
  try {
    const singletask = await Task.findById(req.params.id).populate("subtasks");
    if (!singletask) {
      return res.status(404).json({
        status: "fail",
        message: "task not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: singletask,
    });
  } catch (err) {
    return res.status(500).json({
      staus: "fail",
      error: err.message,
    });
  }
};

const getAlltasks = async (req, res) => {
  try {
    const alltasks = await Task.find().populate("subtasks");
    res.status(200).json({
      status: "success",
      data: alltasks,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

const getTaskwithSubtask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId).populate("subtasks");

    return res.status.json({
      status: "success",
      message: "successifully retrived",
      data: task,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deletetask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        status: "fail",
        error: "task does not exist",
      });
    }
    await task.deleteOne();
    return res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const newStatus = req.body.status;
    const existingTask = await Task.findById(taskId);

    if (!existingTask) {
      return res.status(404).json({
        status: "fail",
        error: "Task not found",
      });
    }

    if (!Task.schema.path("status").enumValues.includes(newStatus)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    if (existingTask.status === "Started" && newStatus === "Queuing") {
      return res
        .status(400)
        .json({ message: "Cannot transition from started to queuing" });
    }

    if (
      (existingTask.status === "Completed" ||
        existingTask.status === "Canceled") &&
      newStatus !== "Completed"
    ) {
      return res
        .status(400)
        .json({
          message:
            "Cannot transition from completed/canceled to a different status",
        });
    }

    if (existingTask.status === "Canceled") {
      return res
        .status(400)
        .json({ message: "Cannot be updated to another status when canceled" });
    }
    const allSubtasksCompleted = existingTask.subtasks.every(
      (subtask) => subtask.status === "Completed"
    );
    existingTask.status = allSubtasksCompleted ? "Completed" : newStatus;
    const updatedTask = await existingTask.save();

    return res.status(201).json({
      status: "success",
      message: "Task status updated",
      data: updatedTask,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      error: err,
    });
  }
};


const updatetask = async (req, res) => {
  try {
    const { error } = taskValidationSChema.validate(req.body);

    if (error)
      return res.status(400).json({
        status: "fail",
        validationError: error.details[0].message,
      });
    const updatedtask = await Task.findByIdAndUpdate(
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
        message: "task not found",
      });
    }
    res.status(200).json({
      status: "success",
      successMessage: "task updated successfully!",
      data: updatedtask,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};
export {
  createtask,
  getsingletask,
  getAlltasks,
  deletetask,
  updatetask,
  getTaskwithSubtask,
  updateTaskStatus,
};
