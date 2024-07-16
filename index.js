const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const collection = require('./mongodb')

const tempelatepath = path.join(__dirname, '/templates')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", tempelatepath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req, res) => {
    res.render("login")
})

app.get("/signup",(req, res) => {
    res.render("signup")
})

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.passwor
    }
    try {
        await collection.insertMany([data])

    res.send("home")
    } catch (error) {
        console.log("error :", error)
        res.send("Cannot login, please try again later")
    }
    
})

app.post("/login", async (req, res) => {
    
    try{

        const check = await collection.findOne({name: req.body.name})

        if(check.password === req.body.password){
            res.render("home")
        }else{
            res.send("wrong password")
        }
    }
    catch{
        res.send("wrong details")
    }
    
})

app.listen(3000, () => {
    console.log('port connected...');
})
