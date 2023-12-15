import { createClient } from "@supabase/supabase-js"
import dotenv from 'dotenv';

type scrappedData = {
  datePosted: string,
  companyName: string,
  place: string,
  workersAffected: number,
  layoffDate: string
}

dotenv.config()
const supabaseUrl:string = `https://rmbegvjfeydzvfaqwhow.supabase.co`
const apiKey:any = process.env.API_KEY;

const supabase:any = createClient(supabaseUrl, apiKey);

const fetchDatabase = async(scrappedData:scrappedData) => {
    const datePosted = new Date(scrappedData.datePosted)
    let { data, error } = await supabase
    .from('Warn-notices-consolidated')
    .insert([
      {created_at: Date.now()},
      {datePosted: datePosted}
      {companyName: scrappedData.companyName}
    ])
    
    if (error) {
      console.log(error)
      return
    }
    console.log(`supabase: `, data);
  }

  export { fetchDatabase };