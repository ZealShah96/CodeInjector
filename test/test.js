const fs = require("fs");
const resolvePath = require("path").resolve;
let assert = require("assert");
let expect = require("chai").expect;
var injectCode = require("./../readJson").injectCodeForTestPurpose;
process.NODE_ENV = "testing";

describe("Checking external file code injector", function() {
  describe("Checking 1 level value fetched.", function() {
    it("file will be creat check and adding proper file",function(done) {
      injectCode(true);
      fileMatch(
        resolvePath("./example.js"),
        resolvePath("./test_check_file.js")
      ).then((value)=>{
        expect(value).to.equal(true);
        done();
      }).catch(err=>{
        done(err);
      });
    });

    it("file will be creat check and adding proper file but work from original file",function(done) {
      injectCode(false);
      fileMatch(
        resolvePath("./example.js"),
        resolvePath("./test_check_file.js")
      ).then((value)=>{
        expect(value).to.equal(true);
        done();
      }).catch(err=>{
        done(err);
      });
    });
  });
});

describe("Checking package json code injector", function() {
  describe("Checking 1 level value fetched.", function() {
    it("main value checking should return index.js", function() {
      //let value=main.findValueFromJson('main');
      expect(true).to.equal("index.js");
    });
  });
});

let fileMatch = (originalFilePath, toBeMatchingFilePath) => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(originalFilePath,'utf-8',(err, data) => {
        fs.readFile(toBeMatchingFilePath,'utf-8',(err, data1) => {
          if (data.trim()==data1.trim()) {
             resolve(true);
          } else {
             reject(false);
          }
        });
      });
    } catch (e) {
      console.log(e);
       reject(false);
    }
  });
};
