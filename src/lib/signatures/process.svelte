<script lang="ts">

    export let isSigningActive = false;
    export let isSentForSigning = false;
    export let testatorEmail = '';
    export let testatorName = '';
    export let willContent = '';

    let witnessName = '';
    let witnessEmail = '';

    let isWitnessSigned = false;
    let isTestatorSigned = false;
    let signatureRequestId = '';

    export function toggle() {
        isSigningActive = !isSigningActive;
        return isSigningActive;
    }

    export function show() {
        isSigningActive = true;
        return isSigningActive;
    }

    export function hide() {
        isSigningActive = false;
        return isSigningActive;
    }

    async function handleSend() {
        console.log("Send for Signatures");
        let url = '/api/signatures';
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                testatorEmail: testatorEmail,
                testatorName: testatorName,
                witnessEmail: witnessEmail,
                witnessName: witnessName,
                willContent: willContent
            })
        });
        let result = await response.json();

        console.log(result);
        console.log(`ID: ${result.signatureRequestId}`)

        isSentForSigning = true;
        signatureRequestId = result.signatureRequestId;
    }

    async function handleProgressCheck() {
        console.log("Check for Progress");
        let url = '/api/signatures/status';
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                signatureRequestId: signatureRequestId
            })
        });
        let result = await response.json();

        console.log(result);

        // TODO: check if testator signed... then flip boolean
        // TODO: check if witness signed... then flip boolean

    }

</script>

{#if isSigningActive}

<div class="flex border-solid border-2 rounded-lg shadow-lg shadow-slate-500 border-slate-300 px-8 py-8 my-8 bg-white w-2/6">
    <div>
        <h3>Signature Process</h3>
        {#if !isSentForSigning }
        <div>
            <label for="testator-email">Testator:</label>
            <input id="testator-email" bind:value={ testatorName } type="text">
            <label for="testator-email">Email:</label>
            <input id="testator-email" bind:value={ testatorEmail } type="text">
        </div>
        <div>
            <label for="witness-name">Witness Name:</label>
            <input id="witness-name" bind:value={ witnessName } type="text">
            <label for="witness-name">Email:</label>
            <input id="witness-email" bind:value={ witnessEmail } type="text">
        </div>
        {/if}



        {#if isSentForSigning}
        <div>
        ✅ Will sent for signatures
        </div>
        {#if isTestatorSigned}
        <div>
        ✅ Testator has signed
        </div>
        {/if}
        {#if isWitnessSigned}
        <div>
        ✅ Witness has signed
        </div>
        {/if}
        <div>
            <button on:click={ handleProgressCheck }>Check Progress</button>
        </div>
        {:else}
        <div>
            <button on:click={ handleSend }>Send Request</button>
        </div>
        {/if}
    </div>
</div>
{/if}

