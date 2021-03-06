const express=require('express')
const Router=express.Router()
// Node libarary
const path=require('path')
const fs=require('fs')
const Author=require('../models/author')
const Book=require('../models/book')

const imageMimeTypes=['image/jpeg','image/png','image/gif']

// All Books Route
Router.get('/',async (req,res)=>{
    let query=Book.find()
    if (req.query.title !=null && req.query.title !='') {
        query=query.regex('title', new RegExp(req.query.title,'i'))
    }
    if (req.query.publishedBefore !=null && req.query.publishedBefore !='') {
        query=query.lte('publishDate',req.query.publishedBefore)
    }
    if (req.query.publishedAfter !=null && req.query.publishedAfter !='') {
        query=query.gte('publishDate',req.query.publishedAfter)
    }
    try{
        const books=await query.exec()
        res.render('books/index',{
        books,
        searchOptions:req.query
        })
    }
    catch{
        res.redirect('/')
    }

})
Router.get('/new',async (req,res)=>{
    renderNewPage(res,new Book())
})
Router.post('/',async (req,res)=>{
    const book=new Book({
        title:req.body.title,
        author:req.body.author,
        publishDate:new Date(req.body.publishDate),
        pageCount:req.body.pageCount,
        description:req.body.description
    })
    // req.body.cover isinya bisa diliat di dokumentasi
    saveCover(book,req.body.cover)
    try{
        const newBook=await book.save()
        res.redirect('/books')
    }catch{        
        renderNewPage(res,book,true)
    }
})
async function renderNewPage(res,book,hasError=false){
    try{
        const authors=await Author.find({})
        const params={authors,book}
        if (hasError) {
            params.errorMessage ='Error Creating'
        }
        res.render('books/new',params)
    }catch{
        res.redirect('/books')
    }
}
function saveCover(book,coverencoded) {
    if (coverencoded==null) return
    const cover=JSON.parse(coverencoded)
    if (cover !=null && imageMimeTypes.includes(cover.type)) {
        book.coverImage=new Buffer.from(cover.data,'base64')
        book.coverImageType=cover.type
    }
}
module.exports=Router