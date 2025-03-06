// const express = require("express")
// const route = express.Router()
// const todomodel = require("../models/todo")

// route.post("/" , async (req,res)=>{
//     const {work,date} =req.body
//     console.log(req.user);
    
//     const cre =  await todomodel.create({work,createdby:req.user.id,date})
//     return res.json({msg:"successfull add" , success:true})
// })
// route.get("/allworks",async (req,res)=>{
//     const finddata = await todomodel.find({}).lean()
//     return res.json({data:finddata})
// })
// // Task Update Route (PUT)
// route.put('/update/:id', async (req, res) => {
//     const { work, date } = req.body;
//     const taskId = req.params.id;
    
//     try {
//       const updatedTask = await todomodel.findByIdAndUpdate(taskId, { work, date }, { new: true });
//       if (!updatedTask) {
//         return res.status(404).json({ msg: 'Task not found' });
//       }
//       res.json({ success: true, data: updatedTask });
//     } catch (error) {
//       console.error('Error updating task:', error);
//       res.status(500).json({ msg: 'Error updating task', error });
//     }
//   });
  
// // Task Delete Route (DELETE)
// route.delete('/delete/:id', async (req, res) => {
//     const taskId = req.params.id;
    
//     try {
//       const deletedTask = await todomodel.findByIdAndDelete(taskId);
//       if (!deletedTask) {
//         return res.status(404).json({ msg: 'Task not found' });
//       }
//       res.json({ success: true });
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       res.status(500).json({ msg: 'Error deleting task', error });
//     }
//   });
  
// module.exports =  route
const express = require("express");
const route = express.Router();
const todomodel = require("../models/todo");
const mongoose = require("mongoose")

// Create Task
route.post("/", async (req, res) => {
  const { work, date } = req.body;
  console.log(req.user); // Assuming req.user contains authenticated user data
  
  try {
    const newTask = await todomodel.create({ work, createdby: req.user.id, date });
    return res.json({ msg: "Task successfully added", success: true });
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ msg: 'Error creating task', success: false });
  }
});

// Get all tasks
route.get("/allworks", async (req, res) => {
  try {
    const finddata = await todomodel.find({createdby: new mongoose.Types.ObjectId(req.user.id)}).lean().populate("createdby");
    
    return res.json({ data: finddata });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ msg: 'Error fetching tasks' });
  }
});
// Example for Express.js
route.get("/api/checkLoginStatus", (req, res) => {
  if (req.user) {
      // If user is logged in
      res.json({ isLoggedIn: true });
  } else {
      // If user is not logged in
      res.json({ isLoggedIn: false });
  }
});

// Update Task
route.put('/update/:id', async (req, res) => {
  const { work, date } = req.body;
  const taskId = req.params.id;

  try {
    const updatedTask = await todomodel.findByIdAndUpdate(taskId, { work, date }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ msg: 'Task not found' ,success:false });
    }
    return res.json({ msg:"successfully update", success: true, data: updatedTask  });
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ msg: 'Error updating task', error });
  }
});

// Delete Task
route.delete('/delete/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await todomodel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    return res.json({  msg:"successfully delete",success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ msg: 'Error deleting task', error });
  }
});

module.exports = route;
