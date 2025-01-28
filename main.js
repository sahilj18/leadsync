import {readFileSync , writeFileSync} from "fs";
import papa from "papaparse";
import {isEmail} from "./lib"


const fs = require("fs");
const Papa = require("papaparse");

// const { parse } = require("csv-parse/sync");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const inputFile = argv.input;
const outputFile = argv.clean;
const reportFile = argv.report;





function readCsv(file) {
  const fileContent = fs.readFileSync(inputFile, "utf8");
  const records = Papa.parse(fileContent,{
    header: true,
  });
  const headers= records.meta.fields;
  const body = records.data;
  return {headers,body};
}

function writeCsv(path,data) {
    const first =data[0];
    first ["Errors"]="No such errror"
    data[0]=first;
    const stringify=Papa.unparse(data);
  fs.writeFileSync(path, stringify);
}
writeCsv(outputFile,readCsv(inputFile).body);