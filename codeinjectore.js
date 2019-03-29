const path = require("path");
("use strict");
exports.__esModule = true;
var fs_1 = require("fs");

var codeinjector = /** @class */ (function() {
  function codeinjector() {}
  codeinjector.prototype.main = function(
    filename,
    filedirectorypath,
    className,
    CodeToChange,
    CodeToIdentifie,
    new_File_Create
  ) {
    var filePath = path.join(filedirectorypath, filename);

    var className = className;
    var CodeToChange = CodeToChange;
    var CodeToIdentifie = CodeToIdentifie;
    
    var stringToAdd = "" + CodeToChange;
    fs_1.openSync(filePath, "a");
    //File Read Will Start From here
    var data = fs_1.readFileSync(filePath, { encoding: "utf-8" }, "a");
    // console.log(data);
    var arrayOfLines_1 = data.split("\n");
    var stringEndOFFile_1 = "" + CodeToIdentifie;
    var indexWhereLineBreak = 0;
    // fs_1.writeFileSync(writefilePath, arrayOfLines_1.join('\n'));
    arrayOfLines_1.map(function(val, index) {
      if (arrayOfLines_1[index].trim() == stringEndOFFile_1.trim()) {
        indexWhereLineBreak = index;
        let strinToBeAdded=replaceSpecificCharcter(
            "LowerCase",
            replaceSpecificCharcter(
              "className",
              stringToAdd,
              className
            ),
            className.toLowerCase()
          );
        arrayOfLines_1[index] = `${arrayOfLines_1[index-1]=="//>>>>CODE_ADDED:CODE_Injector Impacted."?"":"//>>>>CODE_ADDED:CODE_Injector Impacted."}
                    ${strinToBeAdded}
                    ${stringEndOFFile_1}
                    `;
                    console.log(`File Changed:- 
                    ${filePath}
                    Line changed:-
                    ${index}
                    String will be replaced:-
                    ${stringEndOFFile_1}
                    String To Be added:-
                    ${strinToBeAdded}
                   
                    `);

        // ("\n" +
        //  + stringEndOFFile_1
        //  + "\n");
      }
    });
    arrayOfLines_1 = arrayOfLines_1.map(element => {
      element = element.trimLeft(" ");
      return element;
    });
    fs_1.writeFileSync(filePath, arrayOfLines_1.join("\n"));
    //  console.log(indexWhereLineBreak);
  };
  return codeinjector;
})();

function replaceSpecificCharcter(symbol, string, changeelement) {
  var tempString = string;
  if (tempString.indexOf(symbol) > -1) {
    tempString = replaceSpecificCharcter(
      symbol,
      string.replace(symbol, changeelement),
      changeelement
    );
  }
  return tempString;
}
exports.codeinjector = codeinjector;
