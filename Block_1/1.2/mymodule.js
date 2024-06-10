const fs = require('fs');
const path = require('path');

module.exports = function(dir, extension, callback) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            callback(err);
            return;
        }

        const filteredFiles = files.filter(file => path.extname(file) === `.${extension}`);

        callback(null, filteredFiles);
    });
}