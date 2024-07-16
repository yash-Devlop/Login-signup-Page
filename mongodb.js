const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/Login-Signup")
.then(() => {
    console.log("mongodb connected...")
})
.catch(() => {
    console.log("failed to connect...")
})

const LogInSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true})

const collection = new mongoose.model("loginData", LogInSchema)

module.exports = collection