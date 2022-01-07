import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import EVM from "./modules/EnvironmentVariableManager";

import router from "./router";

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
    var responseText = 'Hello World!';
    res.send(responseText);
});

app.use(express.urlencoded({ limit: "100mb", extended: true })); // urlencode 지원
app.use(express.json({ limit: "100mb" })); // json 지원

app.use(router); // 라우터 연결

const httpServer = createServer(app);

// http 서버를 소켓 서버로 wrapping
const io = new Server(httpServer, {
    allowEIO3: true
});

interface MyFriend {
    name: String;
    email: String;
}
var friends = []

io.sockets.on("connection", (socket) => {
    console.log("connected")

    socket.on("friend_enter", (data) => {
        console.log("friend entered!!")
        console.log(data)
        friends.push({ name: data["name"], email: data["email"] })
        socket.broadcast.emit("friend_list", friends)
    })
});


httpServer.listen(EVM.PORT, () => {
    console.log('Started server with 3000');
});

export default app;