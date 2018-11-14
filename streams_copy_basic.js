/*
    A file copy with streams and events - Author: Naren Arya
*/

const stream = require('stream');
const fs = require('fs');

let fileName = process.argv[2];
let destPath = process.argv[3];

const readabale = fs.createReadStream(fileName);
const writeable = fs.createWriteStream(destPath || "output");

fs.stat(fileName, (err, stats) => {
    this.fileSize = stats.size;
    this.counter = 1;
    this.fileArray = fileName.split('.');
    
    try {
        this.duplicate = destPath + "/" + this.fileArray[0] + '_Copy.' + this.fileArray[1];
    } catch(e) {
        console.exception('File name is invalid! please pass the proper one');
    }
    
    process.stdout.write(`File: ${this.duplicate} is being created:`);
    
    readabale.on('data', (chunk)=> {
        let percentageCopied = ((chunk.length * this.counter) / this.fileSize) * 100;
        process.stdout.clearLine();  // clear current text
        process.stdout.cursorTo(0);
        process.stdout.write(`${Math.round(percentageCopied)}%`);
        writeable.write(chunk);
        this.counter += 1;
    });
    
    readabale.on('end', (e) => {
        process.stdout.clearLine();  // clear current text
        process.stdout.cursorTo(0);
        process.stdout.write("Successfully finished the operation");
        return;
    });
    
    readabale.on('error', (e) => {
        console.log("Some error occured: ", e);
    });
    
    writeable.on('finish', () => {
        console.log("Successfully created the file copy!");
    });
    
});