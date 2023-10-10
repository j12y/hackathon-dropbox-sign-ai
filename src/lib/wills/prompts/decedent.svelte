<script lang="ts">
 let name = '';
 let residence = '';
 let email = '';

 export function getWillContent() {
    return `
        LAST WILL AND TESTAMENT
             OF

        I, ${name}, of ${residence}, revoke my former Wills and Codicils 
        and declare this to be my Last Will and Testament.
    `
 }

</script>

<div>
    <label for="full-name">Enter your Full Name:</label>
    <input id="full-name" bind:value={ name } type="text">

    <label for="full-residence">Enter your place of residence:</label>
    <input id="full-residence" bind:value={ residence } type="text">

    <label for="id">Enter your Email:</label>
    <input id="email" bind:value={ email } type="text">
</div>
