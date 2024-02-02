import mongoose from "mongoose";
const userSchema= mongoose.Schema({

    
    firstname:{
        type:String,
        required:true,
    },
    lastname: {
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