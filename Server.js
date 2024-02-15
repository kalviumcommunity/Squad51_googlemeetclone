var express=require("express")
var app=express()
app.get("/ping",(req,res)=>{
    res.send("pong")
})
app.get("",(req,res)=>{
    res.send("Hello guys")
})


app.listen(3000,()=>{
    console.log("hello")
})