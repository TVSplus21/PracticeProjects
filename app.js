const express = require("express");
const app = express();
const tasks = require("./Routes/tasksRoutes");
const connectDB = require("./DB/connect");
require("dotenv").config();
const notFound = require("./Middleware/notFound");
const error = require("./Middleware/errorHandler");

//MIDDLEWARE
app.use(express.static("./public"));
app.use(express.json());

//ROUTES
app.use("/api/v1/tasks", tasks);
app.use(error);
app.use(notFound);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, console.log(`Server is listening on ${PORT}......`));
    } catch (error) {
        console.log(error);
    }
};

start();
