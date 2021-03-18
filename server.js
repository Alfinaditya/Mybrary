if (process.env.NODE_ENV!=='production') {
    require('dotenv').config()
}
const express=require('express')
const app=express()
const indexRouter=require('./routes/index')
const mongoose=require('mongoose')

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(indexRouter)

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true},{ useUnifiedTopology: true })
const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.error('connected'))
app.listen(process.env.PORT||3000)