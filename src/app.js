
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser";
import userRoute from "./Routes/userRoute.js";
import taskRoute from "./Routes/taskRoute.js";
import subtaskRoute from "./Routes/subtaskRouter.js";


const app = express();

app.use(cors({origin: '*' }));

app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: "100mb", extended: true}))
app.use(express.urlencoded({limit: "100mb", extended: true, parameterLimit: 50000}))


dotenv.config();

app.use("/api", userRoute)
app.use('/api',taskRoute)
app.use('/api',subtaskRoute)


export default app;