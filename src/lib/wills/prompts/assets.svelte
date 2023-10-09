<script lang="ts">
 let name = '';
 let residence = '';
 let email = '';

 export function getWillContent() {
    return `
        ARTICLE
        PAYMENT OF DEBTS AND EXPENSES

        I direct that my just debts, funeral expenses and expenses of last
        illness be first paid from my estate.

        ARTICLE
        DISPOSITION OF PROPERTY

    `
 }

</script>

<div>
    <label for="possession-1">Enter one of your most valuable possessions:</label>
    <input id="possession-1" class="w-80" bind:value={ name } type="text">

    <p><a class="text-blue-500" href="/not-implemented">Add Another</a></p>
</div>
