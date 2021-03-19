const express=require('express')
const Router=express.Router()
const Author=require('../models/author')

// All Authors Route
Router.get('/',async (req,res)=>{
    let searchOptions={}
    if (req.query.name !== null && req.query.name !== '')  {
        searchOptions.name=new RegExp(req.query.name,'i')
    }
    try {
        const authors=await Author.find(searchOptions)
        res.render("authors/index",{
            authors,
            searchOptions:req.query
    })
    } catch (error) {
        
    }
})
Router.get('/new',(req,res)=>{
    res.render('authors/new',{author:new Author()})
})
Router.post('/',async (req,res)=>{
    const author=new Author({
        name:req.body.name
    })
    try {
        const newAuthor=await author.save()
        res.redirect('authors')
    } catch (error) {
        res.render('authors/new',)
        res.render('authors/new',{
            author:author,
            errorMessage : `something went wrong`
        })
    }
})
module.exports=Router