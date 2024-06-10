const fs = require('fs');

const directory = process.argv[2];
const extension = process.argv[3];

fs.readdir(directory, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    const filteredFiles = files.filter(file => file.endsWith(`.${extension}`));

    filteredFiles.forEach(file => {
        console.log(file);
    });
});