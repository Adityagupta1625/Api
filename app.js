require("dotenv").config();
require("./config/db").connect();

const express=require('express');
const bodyParser=require('body-parser');
const report=require('./routes/report');
const cors=require('cors');

app=express();
bodyParser.urlencoded({extended:false});
app.use(bodyParser.json()); 

app.get('/',(req,res)=>{
    res.send("Welcome to my API");
});

app.use('/report',report);

app.listen(3000,()=>{
    console.log("Server started at port 3000");
});
