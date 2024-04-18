const express = require("express");
const connectDB = require("./config/db");
const app = express()
require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./Middlewares/errorHandler");

const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({urlencoded : false}))

app.use("/api", require('./Routers/userRouter'))
app.use("/api/user", require('./Routers/taskRouter'))



app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))