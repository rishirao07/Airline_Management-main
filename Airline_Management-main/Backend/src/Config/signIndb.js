const mongoose=require("mongoose");
const connect=mongoose.connect("mongodb://localhost:27017/Airline_Management");

connect.then(()=>{
    console.log("Database connected Successfully");
})
.catch(()=>{
    console.log("Database cannot be connected");
});

const LoginSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("userdata",LoginSchema);
module.exports=collection;