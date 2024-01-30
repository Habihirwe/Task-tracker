import mongoose from "mongoose";
const userSchema= mongoose.Schema({

    
    firstName:{
        type:String,
        required:true,
    },
    lastName: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    repeatPassword:{
        type:String,
        required:true
    },
    dateCreated: {
        type: 'date',
        default: Date.now()
    } 
})

const User  = mongoose.model('User', userSchema)
export default User