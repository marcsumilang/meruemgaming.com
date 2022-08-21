import {client} from '$lib/sanityClient'
// Fetch all valid posts & authors to display in the homepage
// prettier-ignore
export async function sendPageView(id) {
   if (id == '') {
    return 
  } 

  try {
    await client
      .patch(id).
      inc({views: 1}).commit()
      .then((res) => {
        //console.log(`Page View was updated, document ID is ${res._id}`);
        //console.log(`document `, res);
      });
      
  } catch (err) {
    console.error(err);
  }
}
