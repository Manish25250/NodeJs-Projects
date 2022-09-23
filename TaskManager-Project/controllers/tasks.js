
const Task = require("../models/Task")
const asyncWrapper = require("../middleware/async.js")
const {createCustomError} = require("../errors/custom-error.js")

const getAllTasks = asyncWrapper( async (req,res) => {
      const tasks = await Task.find({})
      res.status(200).json({tasks})
})
// same could be achived from down below
//  async function getAllTasks(req, res) {
//   try {
//     const tasks = await Task.find({})
//     res.status(200).json({tasks})
//   } catch (error) {
//     res.status(500).json({msg: error})
//   }
// }

const createTask = asyncWrapper( async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({task})
  // before refactoring i.e. without asyncWrapper
  // try {
  //   const task = await Task.create(req.body)
  //   res.status(201).json({task})
  // } catch (error) {
  //   res.status(500).json({msg: error})
  // }
  // same could be achived from down below
  // Task.create(req.body, function (err, task) {
  //   if (err) {
  //     res.status(500).json({msg: err})
  //   }
  //   else
  //     res.status(201).json({
  //       task
  //     });
  // });
})

const getTask = asyncWrapper( async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
      return next(createCustomError(`No Task with id : ${taskID}`, 404));
    }

    res.status(200).json({ task });
})

const deleteTask = asyncWrapper( async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndRemove({ _id: taskID })
    if (!task) {
      return next(createCustomError(`No Task with id : ${taskID}`, 404));
    }
    return res.status(200).json({ task })
})

const updateTask = asyncWrapper( async (req, res) => {
    const { id: taskID} = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true, runValidators: true,
    });

    if (!task) {
      return next(createCustomError(`No Task with id : ${taskID}`, 404));
    }
    res.status(200).json({ task });
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
