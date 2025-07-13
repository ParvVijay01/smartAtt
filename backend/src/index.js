const express = require("express")
const connectDb = require("./config/mongoDb")
const dotenv = require("dotenv").config()
const authRoute = require("./route/AuthRoute")
const attRoute = require("./route/AttRoute")


const app = express()
const PORT = process.env.PORT || 5000
connectDb()
app.use(express.json())

app.get("/", (req,res) => {
    res.send("Hello World")
})

app.use("/api/auth", authRoute)
app.use("/api/att", attRoute)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})