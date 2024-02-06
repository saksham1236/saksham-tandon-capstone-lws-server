import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

 //Import Functions
import { fetchPageTenesseWarn, fetchPageTenesseWarn2024 } from './functions/fetchTennesseWarn'

//Import Utils
import { fetchDatabase } from './functions/utlis/fetchDatabase';
import { writeToDatabase } from './functions/utlis/writeDatabase'
import { searchDatabase } from './functions/utlis/searchDatabase';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const url = `https://www.tn.gov/workforce/general-resources/major-publications0/major-publications-redirect/reports.html`

let tenesseData:any = [];

app.use(cors());

app.get('/', (req:any, res:any):void => {
    res.send(`<h1>Welcome to my Express App </h1>`)
});

function refreshDatabase() {
  fetchPageTenesseWarn(url).then((data) => {
    tenesseData = data.convertedData;
    writeToDatabase(tenesseData)
  })
}

refreshDatabase();
fetchPageTenesseWarn2024(url);
setInterval(refreshDatabase, 900000);

app.get(`/list`, async (req:any, res:any):Promise<void> => {
  fetchDatabase()
  .then((data:any) => {
    res.status(200).json(data);
    console.log(`data sent`)
  })
  .catch((error) => {
    res.status(500).json({error: `error occured: ${error}`})
    console.log(error)
  })
})

app.get('/tenesse', (req:any, res:any):void => {
  res.json(tenesseData);
})

app.get('/search/:query', (req:any, res: any) => {
  searchDatabase(req.params.query)
  .then((data: any) => {
    res.status(200).json(data);
    console.log(data);
  })
})

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})

