import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source"

const app = express(); //express 모듈의 최상위 함수 

app.use(express.json()); //request에서 json 형식의 파일을 받아 온 것을 해석
app.use(morgan("dev")); //개발환경에서 dev 옵션을 사용 
app.get("/", (_, res) => res.send("running"));

let port = 4000;

app.listen(port, async () => {
    console.log(`Server running at ... http://localhost:${port}`);

    AppDataSource.initialize().then(async () => {
        console.log("database initialized")
    }).catch(error => console.log(error))

});