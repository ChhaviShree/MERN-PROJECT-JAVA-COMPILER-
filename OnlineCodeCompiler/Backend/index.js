const express=require('express');

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    return res.json({"hello":"duniya"});
});

app.post("/run",(req,res)=>{

    const {language="cpp",code}=req.body;
    
    if(code===undefined){
        return res.status(400).json({success:false,error:"Empty code body"});
    }

    //need to geenrate a c++ file with content from the request
    //we need to run the file and send the response
    return res.json({language,code});

})



app.listen(5000,()=>{
    console.log(`server is running on port 5000 :]`);
});