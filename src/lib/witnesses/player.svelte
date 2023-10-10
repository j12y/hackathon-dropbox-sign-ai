<script lang="ts">

    export let isWitnessesActive = false;

    export function toggle() {
        isWitnessesActive = !isWitnessesActive;
        return isWitnessesActive;
    }

    export function show() {
        isWitnessesActive = true;
        return isWitnessesActive;
    }

    export function hide() {
        isWitnessesActive = false;
        return isWitnessesActive;
    }

</script>

{#if isWitnessesActive}

<div class="flex border-solid border-2 rounded-lg shadow-lg shadow-slate-500 border-slate-300 px-8 py-8 my-8 bg-white w-3/6">
    <div class="grid mx-2 my-2 px-2 py-2 flex-grow">
        <h3>Witness Viewer</h3>
        <iframe src="https://viewer.millicast.com?streamId=MdcwtE/witness-signing&multisource=true" allowfullscreen width="640" height="480"></iframe>
    </div>
</div>
{/if}

