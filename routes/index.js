const express=require('express')
const Router=express.Router()

Router.get('/',(req,res)=>{
    res.render('layouts/layout')
})
module.exports=Router