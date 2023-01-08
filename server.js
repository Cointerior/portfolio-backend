require("dotenv").config()
const nodemailer = require("nodemailer")
// const http = require("http")
const express = require("express")
// const crypto = require('crypto')
// const regEx = require("./config/regEX")
// const User = require("./model/UserSchema")
// const connectDB = require("./db/dbconn")
// const mongoose = require("mongoose")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("./public"))


app.get("/", (req, res) => {
    res.sendFile(render, "index")
})

const sendEmail = (name, email, subject, message, res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        }
      });

    const mailOptions = {
        from: "cointerior15@gmail.com",
        to: "cointerior15@gmail.com",
        subject: subject,
        html: `${message} from ${email}`
    }

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {  
             res.status(500).json({ error})
            // console.log(error);
        } else {
            res.status(200).json({message: "Mail sent successfully"})
        }
    })
}

app.post("/sendMail", (req, res) => {
    const { name, email, subject, message } = req.body
    if (!name || !email || !subject || !message) {
        return res.status(400).json({msg: "Recipient email and name is required"})
    }
    // console.log(name, email, subject, message)
    sendEmail(name, email, subject, message, res)
})



app.listen(3500, () => {
    console.log("Server started on port 3500")
 })    