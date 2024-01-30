import mongoose from "mongoose";
import app from "./app.js";


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('database connected')
}).catch((err)=>{
    console.log(err)
})

const port=process.env.PORT || 5000
 app.listen(port ,()=>{
    console.log("The server  is listening on   : " +port)
})


export default app;