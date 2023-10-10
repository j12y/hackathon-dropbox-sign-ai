import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import * as DropboxSign from "@dropbox/sign";


const signatureRequestApi = new DropboxSign.SignatureRequestApi();
signatureRequestApi.username = env.DROPBOX_API_KEY;

export async function POST({ request }) {
    let params = await request.json();
    console.log(params);

    const signer1: DropboxSign.SubSignatureRequestSigner = {
        emailAddress: params.testatorEmail,
        name: params.testatorName,
        order: 0,
    };

    const signer2: DropboxSign.SubSignatureRequestSigner = {
        emailAddress: params.witnessEmail,
        name: params.witnessName,
        order: 1,
    };
    
    const signingOptions: DropboxSign.SubSigningOptions = {
        draw: true,
        type: true,
        upload: true,
        phone: false,
        defaultType: DropboxSign.SubSigningOptions.DefaultTypeEnum.Draw,
    };

    const fieldOptions: DropboxSign.SubFieldOptions = {
        dateFormat: DropboxSign.SubFieldOptions.DateFormatEnum.DD_MM_YYYY,
    };

    const fileBufferAlt: DropboxSign.RequestDetailedFile = {
        value: Buffer.from(params.willContent),
        options: {
            filename: "my-will.txt",
            contentType: "text/plain",
        },
    };

    const data: DropboxSign.SignatureRequestSendRequest = {
        title: "Your e-Will from Death by LLM",
        subject: "Your e-Will from Death by LLM",
        message: "Please sign this document to attest to its authenticity. Let me know if you have any questions.",
        signers: [ signer1, signer2 ],
        ccEmailAddresses: [ ],
        files: [ fileBufferAlt ],
        metadata: {
            "custom_id": 42
         },
        signingOptions,
        fieldOptions,
        testMode: true,
    };

    const response = await signatureRequestApi.signatureRequestSend(data);
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
