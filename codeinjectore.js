const path=require('path');
"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var codeinjector = /** @class */ (function () {
    function codeinjector() {
    }
    codeinjector.prototype.main = function (filename, filedirectorypath, className, CodeToChange, CodeToIdentifie,new_File_Create) {
        var filePath =path.join(filedirectorypath,filename);
       
        var className=className;
        var CodeToChange=CodeToChange;
        var CodeToIdentifie=CodeToIdentifie;
        console.log(filePath);
        var stringToAdd = "" + CodeToChange;
        fs_1.openSync(filePath,'a');
        //File Read Will Start From here 
        var data=fs_1.readFileSync(filePath, { encoding: 'utf-8' },'a');
           // console.log(data);
            var arrayOfLines_1 = data.split('\n');
            var stringEndOFFile_1 = "" + CodeToIdentifie;
            var indexWhereLineBreak = 0;
           // fs_1.writeFileSync(writefilePath, arrayOfLines_1.join('\n'));
            arrayOfLines_1.map(function (val, index) {
                if (arrayOfLines_1[index].trim() == stringEndOFFile_1.trim()) {
                    indexWhereLineBreak = index;
                    arrayOfLines_1[index] = ("\n        " +replaceSpecificCharcter("LowerCase"
                    ,replaceSpecificCharcter("className",stringToAdd,className)
                    ,className.toLowerCase())
                     + "\n         " 
                     + stringEndOFFile_1 
                     + "\n         ");
                }
            });
            fs_1.writeFileSync(filePath, arrayOfLines_1.join('\n'));
          //  console.log(indexWhereLineBreak);
        
    };
    return codeinjector;
}());



function replaceSpecificCharcter(symbol, string, changeelement) {

    var tempString = string;
    if (tempString.indexOf(symbol) > -1) {

        tempString = replaceSpecificCharcter(symbol, string.replace(symbol, changeelement), changeelement);

    }
    return tempString;
}
exports.codeinjector = codeinjector;
