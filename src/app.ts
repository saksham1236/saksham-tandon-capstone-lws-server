import express from 'express';
import dotenv from 'dotenv';
import cheerio from 'cheerio';
import pretty from 'pretty';
import axios from 'axios';
 //Import Functions
import { fetchPageTenesseWarn } from './functions/fetchTennesseWarn'

import { writeToDatabase } from './functions/utlis/writeDatabase'
const app = express();
const PORT = process.env.PORT || 8080;

const url = `https://www.tn.gov/workforce/general-resources/major-publications0/major-publications-redirect/reports.html`

let tenesseData:any = [];

app.get('/', (req:any, res:any):void => {
    res.send(`<h1>Welcome to my Express App </h1>`)
});


// async function scrapeData() {
//   axios
//   .get(url)
//   .then((res) => {
//     const { data } = res;
//     const $ = cheerio.load(data);
//     const list = $("#main > div > div.col-lg-8.col-md-8.col-sm-8.col-xs-12.content > article > div:nth-child(2) > div:nth-child(4)");
//     console.log(list);
//   })
//   .catch((err) => {
//     console.log(`fetching failed: ${err}`);
//   })
// }

fetchPageTenesseWarn(url).then((data) => {
  tenesseData = data.convertedData;
  writeToDatabase(tenesseData)
}).then;


app.get('/tenesse', (req:any, res:any):void => {
  res.json(tenesseData);
})

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})

