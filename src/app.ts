import express from "express";

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

export default app;