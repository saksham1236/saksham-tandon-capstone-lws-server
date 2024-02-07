import { createClient } from "@supabase/supabase-js"
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import dotenv from 'dotenv';

dotenv.config()

const supabaseUrl:string = `https://rmbegvjfeydzvfaqwhow.supabase.co`
const apiKey:string = process.env.API_KEY || "";

const supabase = createClient(supabaseUrl, apiKey);

const searchDatabase = async(query:string) => {
    
    let { data, error } = await supabase
    .from('Warn-notices-consolidated')
    .select()
    .textSearch('companyName', query)
    
    if (error) {
      console.log(error)
      return
    }
      console.log(data);
      return data
  }

  export { searchDatabase };