import { createClient } from "@supabase/supabase-js"
import dotenv from 'dotenv';

dotenv.config()

const supabaseUrl:string = `https://rmbegvjfeydzvfaqwhow.supabase.co`
const apiKey:any = process.env.API_KEY;

const supabase:any = createClient(supabaseUrl, apiKey);

const fetchDatabase = async() => {
    
    let { data, error } = await supabase
    .from('Warn-notices-consolidated')
    .select('*')
    
    if (error) {
      console.log(error)
      return
    }
      return data
  }

  export { fetchDatabase };