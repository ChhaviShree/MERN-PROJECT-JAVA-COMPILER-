const {exec}=require('child_process');
const { error } = require('console');
const outputpath=path.join(__dirname,"outputs");
const fs=require('fs');
const path=require('path');
const { stderr } = require('process');

if(!fs.existsSync(outputpath)){
    fs.mkdirSync(outputpath,{recursive:true});
}

const executejava=(filepath)=>{
    const jobId=path.basename(filepath).split(".")[0];
    const outputpath=path.join(outputpath,`${jobId}.out`);
       
    return new Promise((resolve,reject)=>{
        exec(`java ${filepath} -o ${outputpath} &&  cd ${outputpath} && ./${jobId}.out`,
        (error,stdout,stderr)=>{
            if(error){
                reject({error,stderr});
            }
            if(stderr){
                reject(stderr);
            }
            resolve(stdout);
        });
    })
}

module.exports={
    executejava
}