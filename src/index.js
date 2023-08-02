require("./db/connection");
require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./router/userRouter")
const clothRouter = require("./router/clothRouter")

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));

app.enable('trust proxy');
app.use(express.json());
app.use(cookieParser());

app.use(userRouter)
app.use("/api", clothRouter)

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(port, () => {
    console.log(`Connected to port ${port}`);
})
