//This is the entry point. The backend server will start from here

const express = require("express");
const app = express();
require("dotenv").config();
import {Request, Response} from "express";

const port = process.env.PORT || 8080;

app.use (express.json());

app.get ("/", (req: Request, res: Response)=>{
    res.send ("Server started!!");
})

app.listen(port, ()=>{
    console.log (`Server started at http://localhost:${port}`);
})