import  { Login, createUser,getsingleUser,getAllUsers } from "../Controllers/userController.js";
import  Express from "express";
const userRoute=Express.Router();


userRoute.post('/signup',createUser)
userRoute.post('/login',Login)
userRoute.get('/getSingleUser/:id',getsingleUser)
userRoute.get("/getAllUsers",getAllUsers)



export default userRoute