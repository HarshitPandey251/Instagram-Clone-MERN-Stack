const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')
require("./models/user")

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`connection to database established`)
}).catch(err=>{
    console.log(`db error ${err.message}`);
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(5000,()=>{
    console.log("server is running on...")
})