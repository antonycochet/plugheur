import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';

type headerCsv = {
    serial: string,
    readingDateTimeUtc: string,
    WH: number,
    VARH: number
};

const readCsv = async (serialValue:string|any) => {

    const csvFilePath = path.resolve('src/core/data/metering_data.csv');

    const headers = ['serial', 'readingDateTimeUtc', 'WH', 'VARH'];

    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    return new Promise(function(resolve, reject) {
        parse(fileContent, {
          delimiter: ',',
          columns: headers,
        }, (error, parsing: headerCsv[]) => {
          if (error) {
            reject(error);
          }else{
            const filter = filterBySerialValue(parsing, serialValue)
            const result = toObject(filter, serialValue)
            console.log(result)
            resolve(result)
          }
      });
    });

}

function filterBySerialValue(result: headerCsv[], serialValue: string){
  return result.filter(result => result.serial === serialValue)
}

function toObject(result: headerCsv[], serialValue: string){

interface MyObjLayout {
  title: string;
  dateTime: string[],
  wh: number[],
  varh: number[],
}

var object: MyObjLayout = { 
  title : serialValue, 
  dateTime: [],
  wh: [],
  varh: [],
};

  result.forEach(element => {
    object.dateTime.push(element.readingDateTimeUtc);
    object.wh.push(element.WH);
    object.varh.push(element.VARH);
  });

  return object;
}

export default readCsv