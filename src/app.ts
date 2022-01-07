import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import EVM from "./modules/EnvironmentVariableManager";

import router from "./router";

const app = express();


var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};

app.use(requestTime)

app.get('/', (req: express.Request, res: express.Response) => {
    var responseText = 'Hello World!';
    res.send(responseText);
});

app.use(express.urlencoded({ limit: "100mb", extended: true })); // urlencode 지원
app.use(express.json({ limit: "100mb" })); // json 지원

app.use(router); // 라우터 연결

const httpServer = createServer(app)
const io = new Server(httpServer, {
    allowEIO3: true
})

io.on("connection", (socket) => {
    console.log("connected")
})

httpServer.listen(EVM.PORT, () => {
    console.log('Started server with 3000');
});

export default app;