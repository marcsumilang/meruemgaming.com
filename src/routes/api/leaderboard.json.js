import { supabase } from '$lib/supabase/supabaseClient';
// prettier-ignore
export async function get() {
	const response = await supabase.from('leaderboard').select()
		.order('id', { ascending: false }).limit(1).single();

	const response2 = await supabase.from('leaderboard').select().eq('id', response.data.id - 1).limit(1).single();



  if (response) {
    return {
      status: 200,
      body: {
        "data": response.data,
        "dataPrev": response2.data,
      }
    }
  }

  return {
    status: 500,
    body: new Error('Internal Server Error')
  }
}
