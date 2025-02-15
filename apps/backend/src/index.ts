import express  from "express";
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from http backend");
})

app.listen(3003);