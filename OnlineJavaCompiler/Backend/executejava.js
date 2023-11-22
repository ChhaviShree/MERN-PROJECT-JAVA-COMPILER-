const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputpath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputpath)) {
    fs.mkdirSync(outputpath, { recursive: true });
}

const executeJava = (filepath, className, input) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outpath = path.join(outputpath, `${jobId}.out`);

    return new Promise((resolve, reject) => {
        const javaProcess = spawn('java', [className], { cwd: outpath });

        javaProcess.stdin.write(input + '\n');
        javaProcess.stdin.end();

        let output = '';

        javaProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        javaProcess.on('close', (code) => {
            console.log(`Java process exited with code ${code}`);
            resolve(output);
        });

        javaProcess.on('error', (err) => {
            console.error('Failed to start Java process:', err);
            reject(err);
        });
    });
};

module.exports = {
    executeJava
};
