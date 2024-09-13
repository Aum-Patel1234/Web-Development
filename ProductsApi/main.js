const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:__dirname})
    // res.send("Hello World!")
})
app.get('/products',(req,res)=>{
    res.send("products")
})
app.get('/route/:temp',(req,res)=>{
    res.send(`Hello ${req.params.temp}`)
})

app.listen(port,()=>{
    console.log(`Running at port - ${port}`);
})