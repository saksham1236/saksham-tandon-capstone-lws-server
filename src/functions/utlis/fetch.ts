import cheerio from 'cheerio';
import axios from 'axios';

async function fetchPageTenesseWarn(url:string){
    let parsedData:any;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(await data.toString());
        parsedData = $("#main > div > div.col-lg-8.col-md-8.col-sm-8.col-xs-12.content > article > div:nth-child(2) > div:nth-child(4)").children('p');
    } catch(error) {
        console.error(error)
    }
    return parsedData;
}

export { fetchPageTenesseWarn };