<script lang="ts">
    let beneficiaries = [];

    let name = '';
    let email = '';
    let relationship = '';

    export function getWillContent() {
        return `
            ARTICLE
            IDENTIFICATION OF BENEFICIARIES 



            
        `
    }


</script>

<div>
    <label for="full-name">Enter the name of your Beneficiary:</label>
    <input id="full-name" bind:value={ name } type="text">
    <label for="email-address">Enter their email:</label>
    <input id="email-address" bind:value={ email } type="text">
    <label for="relationship">Select Relationship:</label>
    <select bind:value={relationship} id="relationship">
        <option value="spouse">Spouse</option>
        <option value="child">Child</option>
        <option value="parent">Parent</option>
        <option value="other">Other</option>
    </select>

    <p><a class="text-blue-500" href="/not-implemented">Add Another</a></p>

</div>
