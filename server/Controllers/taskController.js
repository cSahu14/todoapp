const asyncHandler = require("express-async-handler");
const Task = require("../Models/taskModel");

const getTask = asyncHandler(async (req, res) => {
    try {
        
        const task = await Task.findOne({ _id : req.params.id, user: req.user._id});

        if(!task) {
            res.status(400);
            throw new Error("Task Not Found.")
        }

        res.status(201).json({
            success: true,
            data: task
        })

    } catch (error) {
        console.log(error)
        res.status(400);
        throw new Error("Task Not Found.")
    }
   
})

const createTask = asyncHandler( async(req, res) => {
    try {
        const { name, status, isCompleted } = req.body;

        if(!name || !status ) {
            res.status(400);
            throw new Error("Please Add Fields.")
        }

        const task = await Task.create({
            name,
            status,
            isCompleted,
            user: req.user._id
        })

        if(task) {
            res.status(201).json({
                _id: task._id,
                name: task.name,
                status: task.status,
                isCompleted: task.isCompleted,
                user: task.user
            })
        }else {
            res.status(400);
            throw new Error("Invalid Task Data.")
        }
    } catch (error) {
        console.log(error)
        res.status(400);
        throw new Error("Task Not Created.")
    }
})

const getAllTasks = asyncHandler( async(req, res) => {

    try {
        const tasks = await Task.find({ user: req.user._id});
        if(tasks.length > 0) {
            res.status(201).json({
                success: true,
                data: tasks
            })
        } else {
            res.status(400);
            throw new Error("Cannot found tasks for user.")
        }
    } catch (error) {
        console.log(error)
        res.status(400);
        throw new Error("Cannot found tasks for user.")
    }
})

const deleteTask = asyncHandler ( async (req, res) => {
    try {
        const deleteTask = await Task.findOneAndDelete({ _id : req.params.id, user: req.user._id })


        if(!deleteTask) {
            res.status(400);
            throw new Error("Task Not Found.")
        }
       
        res.status(201).json({
            success: true,
            message: "Task Deleted Successfully."
        })
     
    } catch (error) {
        console.log(error)
        res.status(400);
        throw new Error("Task Not Found.")
    }
})

const updateTask = asyncHandler ( async (req, res) => {
    try {
        const {name, status, isCompleted} = req.body;
        const task = await Task.updateOne({
            _id: req.params.id,
            user: req.user._id
        },
        {
            $set: {
                name,
                status,
                isCompleted
            }
        })

        if(!task.modifiedCount) {
            res.status(400);
            throw new Error("Task not updated")
        }

        res.status(201).json({
            success: true,
            message: "Task Updated Successfully."
        })


    } catch (error) {
        console.log(error)
        res.status(400);
        throw new Error("Task not updated")
    }
})

module.exports = {
    getTask,
    createTask,
    getAllTasks,
    deleteTask,
    updateTask
}