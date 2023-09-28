const fs=require('fs');
const path=require('path');
const {v4:uuid}=require('uuid');


const dirCodes=path.join(__dirname,"Codes");//cross combining

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true});
}

const generatefile=async (format,content)=>{
    const jobId=uuid();//return a string
    const filename=`${jobId}.${format}`
    const filepath=path.join(dirCodes,filename);//this will give unique id .java
    await fs.writeFileSync(filepath,content);
    return filepath;


};

module.exports={
    generatefile,
}