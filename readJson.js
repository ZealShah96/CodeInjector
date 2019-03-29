"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var codeinjectore_1 = require("./codeinjectore");
const path = require("path");
const readPackageJsonKey = require("packagejsonkeyfetch").findValueFromJson;

let properpath = path.resolve("./package.json");
//console.log(properpath);
let readFromSeperateFile = readPackageJsonKey(
  "code_injector_configs.fetch_data_seperate_file"
);
let config = readPackageJsonKey("code_injector_configs.dynamic_config_file");

let executeFromDifferentFile = config => {
  try {
    fs_1.readFile(config, { encoding: "utf-8" }, function(err, data) {
      if (err) {
        console.log(
          `External file is not avaiable please check this folder:-${require("path").resolve()}`
        );
      } else {
        var json = JSON.parse(data);
        mainExceutionLogic(json);
      }
    });
  } catch (e) {
    console.log(
      `External file is not avaiable please check this path:-${require("path").resolve()}`
    );
  }
};

let mainExceutionLogic = json => {
  var ci = new codeinjectore_1.codeinjector();
  // console.log(data);

  // console.log(json);
  Object.entries(json).forEach(function(_a) {
    var key = _a[0],
      value = _a[1];
    var filedirectorypath = value["filedirectorypath"];
    var filename = value["filename"];
    var className = value["phrase"];
    let new_File_Create = value["new_File_Create"];
    if (new_File_Create) {
      var writefilePath = path.join(
        filedirectorypath,
        new_File_Create ? "old_" + filename : filename
      );
      var filePath = path.join(filedirectorypath, filename);
      fs_1.openSync(filePath, "a");
      //File Read Will Start From here
      var data = fs_1.readFileSync(filePath, { encoding: "utf-8" }, "a");
      fs_1.writeFileSync(writefilePath, data);
    }

    Object.entries(value).forEach(function(_a) {
      var key = _a[0],
        value = _a[1];
      // console.log(value);
      if (typeof value == "object") {
        className.forEach(element => {
          ci.main(
            filename,
            filedirectorypath,
            element,
            value["CodeToChange"],
            value["CodeToIdentifie"],
            new_File_Create
          );
        });
      }
    });
  });
};


exports.injectCode=()=>{
  if (readFromSeperateFile) {
    executeFromDifferentFile(config);
  } else {
    let data = readPackageJsonKey(
      "code_injector_configs.code_injector_config_file"
    );
    mainExceutionLogic(data);
  }
}

exports.injectCodeForTestPurpose=(readFromSeperateFile)=>{
  if (readFromSeperateFile) {
    executeFromDifferentFile(config);
  } else {
    let data = readPackageJsonKey(
      "code_injector_configs.code_injector_config_file"
    );
    mainExceutionLogic(data);
  }
}


  // if (readFromSeperateFile) {
  //   executeFromDifferentFile(config);
  // } else {
  //   let data = readPackageJsonKey(
  //     "code_injector_configs.code_injector_config_file"
  //   );
  //   mainExceutionLogic(data);
  // }
