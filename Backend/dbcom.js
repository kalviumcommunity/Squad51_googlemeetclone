const mongoose=require("mongoose")
const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.Data_base_URI)
        console.log("Connected to MongoDB");

    }catch(err){
        console.log("error", err)
    }
    
}
const isConnected = ()=>{
    return mongoose.connection.readyState === 1;
}
module.exports={connectdb, isConnected};