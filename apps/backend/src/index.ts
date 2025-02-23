import express  from "express";
import userRouter from "./routes/userRouter";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from http backend");
});

app.use("/api/v1/user", userRouter);

app.listen(3003);