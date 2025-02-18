require('dotenv').config()
const express = require('express')
//import express from "express"


const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter', (req,res)=>{
    res.send("Twitter")
})

app.get('/youtube', (req,res)=>{
  res.send("<h1>Youtube</h1>")
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})