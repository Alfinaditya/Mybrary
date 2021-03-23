const mongoose=require('mongoose')
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
    coverImage:{
        type:Buffer,
        required:true,
    },
    coverImageType:{
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
    if (this.coverImage !=null && this.coverImageType !=null) {
        return `data:${this.coverImageType};charset=utf-8;base64,
        ${this.coverImage.toString(`base64`)}`
    }
})

module.exports=mongoose.model('Book',bookSchema)
