const mongoose=require('mongoose')
const path=require('path')
const coverImageBasePath='uploads/bookCovers'
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    },
    publishDate:{
        type:Date,
        required:true
    },
    pageCount:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    coverImageName:{
        type:String,
        required:true,
    },
    author:{
        // id dari author collection data
        // jadi author book dan author memiliki id yang sama (refrence)
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Author'
    }
})

// properti virtual  yang berperilaku sama seperti diatas
bookSchema.virtual('coverImagePath').get(function(){
    if (this.coverImageName !=null) {
        return path.join('/',coverImageBasePath,this.coverImageName)
    }
})

module.exports=mongoose.model('Book',bookSchema)
module.exports.coverImageBasePath=coverImageBasePath