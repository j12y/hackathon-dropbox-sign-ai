import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import * as DropboxSign from "@dropbox/sign";





const signatureRequestApi = new DropboxSign.SignatureRequestApi();
signatureRequestApi.username = env.DROPBOX_API_KEY;

export async function POST({ request }) {
    let params = await request.json();
    console.log(params);

    const signatureRequestId = params.signatureRequestId;

    const response = signatureRequestApi.signatureRequestGet(signatureRequestId);
    const result = await response.body;
    
    console.log(result);
    return json(result);
}




/*
const accountApi = new DropboxSign.AccountApi();
accountApi.username = env.DROPBOX_API_KEY;
export async function GET({ url }) {
    const response = await accountApi.accountGet(undefined, "dx@developerxp.com");
    const result = await response.body;
    console.log(result);
    
    return json(result);
}
*/

/*
const file = fs.createReadStream("example_signature_request.pdf");
const fileBuffer: DropboxSign.RequestDetailedFile = {
  value: fs.readFileSync("example_signature_request.pdf"),
  options: {
    filename: "example_signature_request.pdf",
    contentType: "application/pdf",
  },
};
*/
