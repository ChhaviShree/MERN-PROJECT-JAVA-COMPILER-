const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputpath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputpath)) {
    fs.mkdirSync(outputpath, { recursive: true });
}

const executejava = (filepath, className) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outpath = path.join(outputpath, `${jobId}.out`);

    return new Promise((resolve, reject) => {
        const command = `javac ${filepath} -d ${outpath} && cd ${outpath} && java ${className}`;
        console.log("Executing command:", command);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Error during execution:", error);
                reject(error);
            } else if (stderr) {
                console.error("Error in stderr:", stderr);
                reject(stderr);
            } else {
                console.log("Execution successful. Output:\n", stdout);
                resolve(stdout);
            }
        });
    });
}

module.exports = {
    executejava
}
