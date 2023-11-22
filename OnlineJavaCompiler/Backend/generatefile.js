const fs=require('fs');
const path=require('path');
const {v4:uuid}=require('uuid');


const dirCodes=path.join(__dirname,"Codes");//cross combining

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true});
}

const generatefile = async (format, content, className) => {
    const jobId = uuid();
    const filename = `${className}.java`; // Use the provided class name
    const filepath = path.join(dirCodes, filename);
    await fs.writeFileSync(filepath, content);
    return filepath;
};


module.exports={
    generatefile,
}