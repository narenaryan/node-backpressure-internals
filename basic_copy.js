const fs = require('fs');

let fileName = process.argv[2];
let destPath = process.argv[3];

fs.readFile(fileName, (err, data) => {
    if (err) throw err;

    fs.writeFile(destPath || 'output', data, (err) => {
        if (err) throw err;
    });
    
    console.log('New file has been created!');
});