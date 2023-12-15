import { createClient } from "@supabase/supabase-js"
import dotenv from 'dotenv';

type scrappedData = [{
  datePosted: string,
  companyName: string,
  place: string,
  workersAffected: number,
  layoffDate: string
}]

dotenv.config()
const supabaseUrl:string = `https://rmbegvjfeydzvfaqwhow.supabase.co`
const apiKey:any = process.env.API_KEY;

const supabase:any = createClient(supabaseUrl, apiKey);

const writeToDatabase = async(scrappedData:scrappedData) => {

    scrappedData.forEach(async(element) => {
      const datePostedDB  = new Date(element.datePosted);
      console.log(datePostedDB)
      const layoffDateDB = new Date(element.layoffDate);
      console.log(layoffDateDB)
      const dateCreated = Date.now();
      // const { data, error} = await supabase
      // .from('Warn-notices-consolidated')
      // .insert([
      //   {
      //     created_at: dateCreated,
      //     datePosted: datePostedDB,
      //     companyName: element.companyName,
      //     location: element.place,
      //     workersAffected: element.workersAffected,
      //     layoffDate: layoffDateDB
      //   }
      // ])

      // if (error) {
      //   console.log(error)
      //   return
      // }
    });
  }

  export { writeToDatabase };