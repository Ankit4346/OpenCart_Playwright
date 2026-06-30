import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class DataProvider{

static getTestDataFromJson(filePath:string){

let jsonData:any=JSON.parse(fs.readFileSync(filePath,'utf8'));
return jsonData;

}

static getTestDataFromCsv(filePath:string){

let csvData:any=parse(fs.readFileSync(filePath),{columns:true,skip_empty_lines:true});
return csvData;

}



}