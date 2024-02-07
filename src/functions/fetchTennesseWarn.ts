import cheerio from 'cheerio';
import axios from 'axios';
import { table } from 'console';

type parsedItems = {
        datePosted: String | Date,
        companyName: String,
        place: String,
        workersAffected: Number,
        layoffDate: String | Date
} | Array<any>;

async function fetchPageTenesseWarn(url:string){
    let parsedData:any;
    let convertedData:any = [];
    let parsedDataNew:any = [];
    try {
        const { data } = await axios.get(url);

        const $ = cheerio.load(await data.toString());

        parsedDataNew = $("#main > div > div.col-lg-8.col-md-8.col-sm-8.col-xs-12.content > article > div:nth-child(2) > div.tn-panel > div");
        parsedDataNew.find('tr').each((index:number, tableRow:cheerio.Cheerio) => {
        let tableCells = $(tableRow).find('td');
        let parsedItem:parsedItems = [];
            const datePosted = $(tableCells[0]).text();
            const companyName = $(tableCells[1]).text();
            const place = $(tableCells[2]).text();
            const workersAffected = Number($(tableCells[3]).text());
            const layoffDate = $(tableCells[4]).text();
            if(layoffDate) {
                parsedItem = {
                    datePosted: datePosted,
                    companyName: companyName,
                    place: `${place}, Tennessee`,
                    workersAffected:workersAffected,
                    layoffDate: layoffDate
                }
                console.log("item", layoffDate);
                convertedData.push(parsedItem);
            }
        })

        parsedData = $("#main > div > div.col-lg-8.col-md-8.col-sm-8.col-xs-12.content > article > div:nth-child(2) > div:nth-child(4)");

        parsedData.find('p').each((i:number, item:cheerio.Cheerio) => {
            let parsedItems:parsedItems = $(item).text().split("|");
            parsedItems = parsedItems.map((parsedItem:any) => {
                parsedItem = parsedItem.trim();
                parsedItem = parsedItem.split(':');
                parsedItem = parsedItem.map((text:string) => text.trim())
                return parsedItem;
            })

            parsedItems = {
                datePosted: parsedItems[0][1],
                companyName: parsedItems[1][1],
                place: `${parsedItems[2][1]}, Tennessee`,
                workersAffected: parsedItems[3][1],
                layoffDate: parsedItems[4][1]
            }
            convertedData.push(parsedItems);  
        })


    } catch(error) {
        console.error(error)
    }

    return {parsedData, convertedData};
}


export { fetchPageTenesseWarn };