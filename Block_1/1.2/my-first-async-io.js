const fs = require('fs');

fs.readFile(process.argv[2], function doneReading(err, fileContent){
    if(err != null){
        console.log(err);
    }
    else{
        const string = fileContent.toString();
        var contentArray = string.split("\n")
        console.log(contentArray.length - 1)
    }
});