import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source"
import authRoutes from './routes/auth';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express(); //express 모듈의 최상위 함수 
const origin = process.env.ORIGIN;

app.use(cors({
    origin,
    credentials: true
}))

app.use(express.json()); //request에서 json 형식의 파일을 받아 온 것을 해석
app.use(morgan("dev")); //개발환경에서 dev 옵션을 사용 

dotenv.config();

app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoutes)

let port = 4000;
app.listen(port, async () => {
    console.log(`Server running at ... ${process.env.APP_URL}`);

    AppDataSource.initialize().then(async () => {
        console.log("database initialized")
    }).catch(error => console.log(error))

});