<script lang="ts">
 let possession = '';

 export async function getWillContent() {
    let url = '/api/wills/assets?' + new URLSearchParams({asset: possession});
    return await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            return `
                ARTICLE
                PAYMENT OF DEBTS AND EXPENSES

                I direct that my just debts, funeral expenses and expenses of last
                illness be first paid from my estate.

                ARTICLE
                DISPOSITION OF PROPERTY

                ${data.result}
            `
        });
 }


 /*
 export async function getWillContent() {
    console.log(possession);
    let response = await fetch('/api/wills/assets?' + new URLSearchParams({
        'asset': possession
    }).toString());
    console.log(response);

    if (response.ok) {
        let result = await response.json();
        return `
            ARTICLE
            PAYMENT OF DEBTS AND EXPENSES

            I direct that my just debts, funeral expenses and expenses of last
            illness be first paid from my estate.

            ARTICLE
            DISPOSITION OF PROPERTY

            ${result.result}
        `
    }
 }
 */

</script>

<div>
    <label for="possession-1">Enter a valuable possession you want to leave:</label>
    <input id="possession-1" class="w-80" bind:value={ possession } type="text">

    <p><a class="text-blue-500" href="/not-implemented">Add Another</a></p>
</div>
