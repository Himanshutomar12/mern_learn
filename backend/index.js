import express from "express";
import cors from "cors";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import Routes from "./routes/route.js";
import bodyParser from "body-parser";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const app = express();

app.use(bodyParser.json({extender:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())
app.use(express.json());

app.use("/", Routes);

const port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});
Connection();      