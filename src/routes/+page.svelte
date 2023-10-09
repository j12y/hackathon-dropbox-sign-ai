<script lang="ts">
    import WillGenerator from "$lib/wills/generator.svelte";


    let isWillComplete = false;

    let generator;
    let isWillGeneratorActive = false;
    let generatorButtonText = 'Get Started';

    function handleWillClick(evt) {
        isWillGeneratorActive = generator.toggle();
        generatorButtonText = 'Edit Will';
    }

    function handleRemoteClick(evt) {
        generator.hide();
    }

    function handleSignaturesClick(evt) {
        generator.hide();
    }

</script>

<svelte:head>
    <title>Death by LLM</title>
</svelte:head>

<!-- Copyright 2023: Jayson DeLancey -->

<div class="flex flex-col h-screen">
    <div class="flex items-center justify-center">
        <div class="flex-row">
            <h1>Death <span class="text-4xl">b</span>y <span class="text-4xl">LLM</span></h1>
        </div>
    </div>
    <div class="flex items-center justify-center">
        <p>Prepare for the unexpected, create an e-will for your loved ones today.</p>
    </div>
    <div class="flex items-center justify-center">
        <p>Have a happy and safe Halloween.</p>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-8">
        <div>
            <h2>Generate a Will</h2>
            <p>Our artifici-will intelligent tool helps generate a custom document to reflect your wishes.</p>
            <div class="object-center">
                <button on:click={ handleWillClick }>
                {#if isWillGeneratorActive }
                Close
                {:else}
                    {generatorButtonText}
                {/if}
                </button>
                {#if isWillComplete}
                ✅ Will is prepared
                {/if}
            </div>
        </div>

        <div>
            <h2>Schedule Remote Witnesses</h2>
            <p>Invite two witnesses to view the real-time signing that can attest to the authenticity with e-signatures.</p>
            <div class="justify-items-center">
                <button on:click={ handleRemoteClick } disabled={!isWillComplete}>Begin Remote Witness Session</button>
                <button on:click={ handleSignaturesClick } disabled={!isWillComplete}>Send for Signatures</button>
            </div>
        </div>
    </div>

    <div class="flex h-4/6 w-screen">
        <WillGenerator bind:this={ generator } bind:isWillComplete bind:isWillGeneratorActive/>
    </div>

    <footer class="absolute bottom-0 inset-x-0 h-16 text-center">
        <hr class="w-72 h-px mx-auto bg-gray-400 border-0 rounded dark:bg-gray-700 mb-3"/>
        <p><i>This is a demo application and does not substitute for professional legal advice. Please consult with an attorney.</i></p>
    </footer>

</div>
