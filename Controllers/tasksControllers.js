const Task = require("../Models/taskModels");
const asyncWrapper = require("../Middleware/asyncWrapper");
const { createCustomError, CustomAPIError } = require("../Errors/customErrors");

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});
const createTasks = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});
const getTasks = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`));
    }
    res.status(200).json({ task });
});
const updateTasks = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`));
    }
    res.status(200).json({ task });
});
const deleteTasks = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`));
    }
});

module.exports = {
    getAllTasks,
    createTasks,
    updateTasks,
    deleteTasks,
    getTasks,
};
