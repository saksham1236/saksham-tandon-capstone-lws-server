import cheerio from 'cheerio';
import axios from 'axios';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';



async function fetchPageTenesseWarn(url:string){
    let parsedData:any;
    let convertedData:any = [];
    try {
        const { data } = await axios.get(url);

        const $ = cheerio.load(await data.toString());

        parsedData = $("#main > div > div.col-lg-8.col-md-8.col-sm-8.col-xs-12.content > article > div:nth-child(2) > div:nth-child(4)");

        parsedData.find('p').each((i:number, item:HTMLAllCollection) => {
            let parsedItems:any = $(item).text().split("|");
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