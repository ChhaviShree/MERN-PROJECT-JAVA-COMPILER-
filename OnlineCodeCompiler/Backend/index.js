const express=require('express');
const{generatefile}=require('./generatefile');

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    return res.json({"hello":"duniya"});
});

app.post("/run",async(req,res)=>{

    const {language="java",code}=req.body;
    
    if(code===undefined){
        return res.status(400).json({success:false,error:"Empty code body"});
    }

    const filepath=await generatefile(language,code);
    //need to geenrate a java file with content from the request
    //we need to run the file and send the response
    return res.json({filepath});

})



app.listen(5000,()=>{
    console.log(`server is running on port 5000 :]`);
});