const mongoose=require('mongoose');

const reportSchema=new mongoose.Schema({
    reportID:{type:String,required:true,unique:true},
    users:{type:Array,required:true},
    marketID:{type:String,required:true},
    marketName:{type:String,required:true},
    cmdtyID:{type:String,required:true},
    marketType:{type:String,required:true},
    cmdtyName:{type:String,required:true},
    priceUnit:{type:String,default:"kg"},
    price:{type:Number,required:true},
},{
    timestamps:true
});

reportSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
});

module.exports=mongoose.model('Report',reportSchema);