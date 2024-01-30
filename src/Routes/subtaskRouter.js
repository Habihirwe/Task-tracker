import  express  from "express";
import authLogin from "../midleware/authentication.js";
import { createsubtask,getAllsubtasks,getsinglesubtask,deletesubtask,updatesubtask, updatingsubtaskstatus } from "../Controllers/Subtaskcontroller.js";

const subtaskRoute= express.Router()


subtaskRoute.post('/createsubtask/:taskId',authLogin,createsubtask)
subtaskRoute.get('/getsinglesubtask/:id',authLogin,getsinglesubtask)
subtaskRoute.get('/getallsubtasks',authLogin,getAllsubtasks)
subtaskRoute.delete('/deletesubtask/:id',authLogin,deletesubtask)
subtaskRoute.put('/updatesubtask/:id',authLogin,updatesubtask)
subtaskRoute.put('/subtaskstatus/:subtaskId', authLogin,updatingsubtaskstatus)


export default subtaskRoute