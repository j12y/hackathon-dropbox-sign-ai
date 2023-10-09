<script lang="ts">
    import Decedent from './prompts/decedent.svelte'
    import Beneficiaries from './prompts/beneficiary.svelte'
    import Assets from './prompts/assets.svelte'

    export let isWillComplete = false;
    export let isWillGeneratorActive = false;
    export let will = '';

    let step = 1;
    let totalSteps = 4;

    let prompts = [];

    export function toggle() {
        isWillGeneratorActive = !isWillGeneratorActive;
        return isWillGeneratorActive;
    }

    export function show() {
        isWillGeneratorActive = true;
        return isWillGeneratorActive;
    }

    export function hide() {
        isWillGeneratorActive = false;
        return isWillGeneratorActive;
    }

    export function isComplete() {
        return isWillComplete;
    }

    function handleNextStep() {
        try {
            will += prompts[step].getWillContent();
        } catch {
            console.log("Invalid Step");
        }

        step = step + 1;
        if (step == totalSteps) {
            isWillComplete = true;
        }
    }

    function handleReset() {
        will = '';
        step = 1;
    }


</script>

{#if isWillGeneratorActive}
<div class="flex border-solid border-2 rounded-lg shadow-lg shadow-slate-500 border-slate-300 px-8 py-8 my-8 bg-white w-5/6">
    <div class="grid mx-2 my-2 px-2 py-2 flex-grow">
        <div class="row-start-1">
            <h2>Create Your Will</h2>
            <p>Answer questions that provide prompts to automatically create your legal document.</p>
        </div>
        <div class="row-start-2">
            <div class="grid grid-cols-2">
                <div>
                    <h3>Prompt</h3>
                    
                    {#if step == 1}
                    <Decedent bind:this={ prompts[1] } />
                    {/if}

                    {#if step == 2}
                    <Beneficiaries bind:this={ prompts[2] } />
                    {/if}

                    {#if step == 3}
                    <Assets bind:this={ prompts[3] } />
                    {/if}

                    {#if step < totalSteps}
                    <button on:click={ handleNextStep }>Next</button>
                    {/if}

                    {#if step == totalSteps}
                    <p>That's it, all done. You are ready to send your document for signatures.</p>
                    {/if}

                    {#if step > 1}
                    <button class="bg-red-300 hover:bg-red-500" on:click={ handleReset }>Reset</button>
                    {/if}

                    <p><b>Step</b>: { step } of { totalSteps }</p>
                </div>
                <div>
                    <h3>Legal Document</h3>
                    <textarea class="block border-2 w-full text-sm border-slate-400 height-300 text-gray-900 bg-gray-50 p-2.5"
                        bind:value={ will } 
                        rows="15"
                        placeholder="Your generated Will appears here..."
                        />
                </div>
            </div>
        </div>
    </div>
</div>
{/if}

