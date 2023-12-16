import express from 'express';
import dotenv from 'dotenv';
import cheerio from 'cheerio';
import pretty from 'pretty';
import axios from 'axios';
 //Import Functions
import { fetchPageTenesseWarn } from './functions/fetchTennesseWarn'
import { fetchDatabase } from './functions/utlis/fetchDatabase';
import { writeToDatabase } from './functions/utlis/writeDatabase'

const app = express();
const PORT = process.env.PORT || 8080;

const url = `https://www.tn.gov/workforce/general-resources/major-publications0/major-publications-redirect/reports.html`

let tenesseData:any = [];

app.get('/', (req:any, res:any):void => {
    res.send(`<h1>Welcome to my Express App </h1>`)
});

fetchPageTenesseWarn(url).then((data) => {
  tenesseData = data.convertedData;
  writeToDatabase(tenesseData)
}).then;

app.get(`/list`, async (req:any, res:any):Promise<void> => {
  fetchDatabase()
  .then((data:any) => {
    res.send(200).json(data);
  })
  .catch((error) => {
    res.send(500).json({error: `error occured: ${error}`})
  })
})

app.get('/tenesse', (req:any, res:any):void => {
  res.json(tenesseData);
})

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})

