const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
 work:String,
 createdby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
 },
 date:Date
})
let tododata = mongoose.model("todolist" , userschema)
module.exports = tododata