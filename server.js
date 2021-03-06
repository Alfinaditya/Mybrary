if (process.env.NODE_ENV!=='production') {
    require('dotenv').config()
}
const express=require('express')
const app=express()

const indexRouter=require('./routes/index')
const authorRouter=require('./routes/authors')
const bookRouter=require('./routes/books')

const mongoose=require('mongoose')
const expressLayouts=require('express-ejs-layouts')

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts);

app.use(express.urlencoded({limit:'10mb',extended:false}))
app.use(express.static('public'))

app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)


mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true},{ useUnifiedTopology: true })
const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.error('connected'))

app.listen(process.env.PORT||3000)