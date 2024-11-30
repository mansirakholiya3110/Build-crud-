const express=require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app=express();
require('dotenv').config()

app.use(express.json());
app.use(cors())

const port=process.env.PORT;
const dbURL=process.env.DB_URI;

const userRoutes = require('./routes/user'); 

app.use('/api/users', userRoutes);

app.listen(port,()=>{
    mongoose.connect(dbURL)
    .then(()=>console.log(`db connection...!!!!`))
    .catch((err)=>console.log(err))
    console.log(`server start..http://localhost:${port}`);
})