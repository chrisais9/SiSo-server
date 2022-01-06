import express from "express";

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

app.listen(3000, () => {
    console.log('Started server with 3000');
});

app.use(express.urlencoded({ limit: "100mb", extended: true })); // urlencode 지원
app.use(express.json({ limit: "100mb" })); // json 지원

app.use(router); // 라우터 연결

export default app;