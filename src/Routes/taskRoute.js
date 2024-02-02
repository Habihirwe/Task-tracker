
import {createtask,getsingletask, getAlltasks,deletetask,updatetask,getTaskwithSubtask,updateTaskStatus} from "../Controllers/taskController.js";
import authLogin from "../midleware/authentication.js";

import  express from "express";
const taskRoute = express.Router();

taskRoute.post('/createtask',authLogin,createtask)
taskRoute.get('/getsingletask/:id',authLogin,getsingletask)
taskRoute.get('/getalltasks',getAlltasks)
taskRoute.delete('/deletetask/:id',authLogin,deletetask)
taskRoute.put('/updatetask/:id',authLogin,updatetask)
taskRoute.get('/gettaskwithsub/:taskId', authLogin,getTaskwithSubtask)
taskRoute.put('/updatetaskstatus/:taskId',authLogin,updateTaskStatus)


export default taskRoute