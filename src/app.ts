import express from 'express';
import dotenv from 'dotenv';
import cheerio from 'cheerio';
import pretty from 'pretty';


const markup = `
<ul class="fruits">
  <li class="fruits__mango"> Mango </li>
  <li class="fruits__apple"> Apple </li>
</ul>
`;
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req:any, res:any):void => {
    res.send(`<h1>Welcome to my Express App </h1>`)
});

const $ = cheerio.load(markup);

console.log(pretty($.html()));

const mango = $(".fruits__mango");
console.log(mango.html());

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})