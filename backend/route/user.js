const express = require("express")
const route = express.Router()
const usermodel = require("../models/user")
const jwt = require("jsonwebtoken")


route.get("/sp" , (req,res)=>{
    return res.status(200).send("login")
})
route.post("/signup", async (req, res) => {
    
    const { name, email, password } = req.body;
    let find = await usermodel.findOne({ email: email });
    if (find) {
        return res.json({ msg: "User already exists", success: false });
    }
    
    let cre = await usermodel.create({ name, email, password });
    return res.json({ msg: "User created successfully", success: true });
});

route.post("/login" , async(req,res)=>{
    const {email,password} = req.body
    const findemail = await usermodel.findOne({email:email})
    if(!findemail){
        return res.json({ msg: "User does not exists", success: false });
    }
    const findpassword = await usermodel.findOne({password:password})
    if(!findpassword){
        return res.json({ msg: "incorrect password", success: false });
    }
    let  jwtcreate = jwt.sign({name:findemail.email ,password:findpassword.password ,id:findemail._id},"yash" , {
        expiresIn:"24h"
    })
    res.cookie("token", jwtcreate);

    
    return res.json({ msg: "Login successfully", success: true });
})
route.get("/logout", (req, res) => {
    res.clearCookie("token");  // Clears the "token" cookie
    return res.json({ message: "Logout success", success: true });  // Responds with a success message
});

module.exports = route