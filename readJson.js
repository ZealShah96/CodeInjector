"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var codeinjectore_1 = require("./codeinjectore");


fs_1.readFile('./DynamicConfigFileExample.json', { encoding: 'utf-8' }, function (err, data) {
    var ci = new codeinjectore_1.codeinjector();
    if (!err) {
       // console.log(data);
        var json = JSON.parse(data);
       // console.log(json);
        Object.entries(json).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            var filedirectorypath = value["filedirectorypath"];
            var filename = value["filename"];
            var className = value["className"];
            Object.entries(value).forEach(function (_a) {
                var key = _a[0], value = _a[1];
               // console.log(value);
                if(typeof(value)=="object"){
                    className.forEach(element=>{
                        ci.main(filename, filedirectorypath, element, value["CodeToChange"], value["CodeToIdentifie"]);
                    });
                
            }
            });
        });
        // json.forEach(element => {
        //     console.log(element);
        // });
        //console.log("filedirectorypath"+json)
        //     let arrayOfLines=data.split('\n');
        //     let stringEndOFFile="//#endregion code region end by zeal";
        //     var indexWhereLineBreak=0;
        //     arrayOfLines.map((val,index)=>{
        // if(arrayOfLines[index].trim()==stringEndOFFile.trim()){
        //     indexWhereLineBreak=index;
        //     arrayOfLines[index]=(`
        //     ${stringToAdd} 
        //      ${stringEndOFFile}
        //      `);
    }
});
