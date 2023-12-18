import { createClient } from "@supabase/supabase-js"
import dotenv from 'dotenv';
import createHash from "./createHash";

type scrappedData = [{
  datePosted: string,
  companyName: string,
  place: string,
  workersAffected: number,
  layoffDate: string
}]

type loggedData = {
  created_at: string | Date,
  datePosted: string | Date,
  companyName: string,
  location: string,
  workersAffected: number,
  layoffDate: string | Date,
  hash: string
}

dotenv.config()


const supabaseUrl:string = `https://rmbegvjfeydzvfaqwhow.supabase.co`
const apiKey:any = process.env.API_KEY;

const supabase:any = createClient(supabaseUrl, apiKey);

const writeToDatabase = async(scrappedData:scrappedData) => {

    const insertDataList:Array<loggedData> = [];
    scrappedData.forEach(async(element) => {
      const datePostedDB  = new Date(element.datePosted).toLocaleString("en-US", {timeZone: "America/Chicago"});
      const dateCreated = new Date(Date.now()).toLocaleString("en-US", {timeZone: "America/Toronto"});
      const createdHash = createHash(element);
      const entry:loggedData = {
        created_at: dateCreated,
        datePosted: datePostedDB,
        companyName: element.companyName,
        location: element.place,
        workersAffected: element.workersAffected,
        layoffDate: element.layoffDate,
        hash: createdHash
      }
      insertDataList.push(entry);
    });

    const { data, error} = await supabase
    .from('Warn-notices-consolidated')
    .insert(insertDataList);

    if (error) {
      console.log(error)
      return
    }

  }

  export { writeToDatabase };