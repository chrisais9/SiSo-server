import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import EVM from "./modules/EnvironmentVariableManager";
import SlackManager from "./modules/SlackManager";
import morgan from "morgan"

import router from "./router";
import helmet from "helmet";

const app = express();

// 서버 종료 직전에 true로 바뀌고, 모든 요청의 isDisableKeepAlive를 끔
let isDisableKeepAlive = false;

app.use((req, res, next) => {
    // 서버 종료가 시작됐을 시 Connection을 종료함
    if (isDisableKeepAlive) res.set("Connection", "close");
    next();
})

app.use(helmet()) // 보안 모듈

app.use(
    morgan(`:date[iso] :method :url :status :response-time ms`, {
        skip: () => EVM.MUTE_LOG_MORGAN // 테스트 시 로그 숨기기 설정
    })
)

app.use(express.urlencoded({ limit: "100mb", extended: true })); // urlencode 지원
app.use(express.json({ limit: "100mb" })); // json 지원

app.set("trust proxy", true); // 프록시 설정

app.get('/', (req: express.Request, res: express.Response) => {
    var responseText = '시소 서버 정상 작동중!';
    res.send(responseText);
});
app.use(router); // 라우터 연결

// const httpServer = createServer(app);

// http 서버를 소켓 서버로 wrapping
// const io = new Server(httpServer, {
//     allowEIO3: true
// });

// interface MyFriend {
//     name: String;
//     email: String;
// }
// var friends = []

// io.sockets.on("connection", (socket) => {
//     console.log("connected")

//     socket.on("friend_enter", (data) => {
//         console.log("friend entered!!")
//         console.log(data)
//         friends.push({ name: data["name"], email: data["email"] })
//         socket.broadcast.emit("friend_list", friends)
//     })
// });
// httpServer.listen(EVM.PORT, () => {
//     process.uptime
//     process.send && process.send("ready")
//     console.log('Started server with 3000');
// });


const server = app.listen(EVM.PORT, async () => {
    process.uptime
    if (process.send) {
        process.send("ready")
    }

    if (EVM.NODE_APP_INSTANCE == 0 && EVM.NODE_ENV == "production") await SlackManager.sendSimpleMessage(`[${new Date().toLocaleString()}] *🟩 서버 재시작이 완료 되었습니다.*`)

    console.log('Started server with 3000');
});

process.on("SIGINT", () => {
    // 서버 종료 시 안전 종료를 위한 변수
    isDisableKeepAlive = true;

    // 안전한 서버 종료
    server.close(async () => {
        // 서버 종료 성공 시 정보 반환
        console.log(`SERVER CLOSED`);
        console.log(`INSTANCE_ID: ${EVM.NODE_APP_INSTANCE}`);

        if (EVM.NODE_APP_INSTANCE == 0 && EVM.NODE_ENV == "production") await SlackManager.sendSimpleMessage(`[${new Date().toLocaleString()}] *🟥 서버가 정상적으로 종료되었습니다. 재시작 대기중...*`)

        // 종료
        return process.exit(0);
    });
});

export default app;