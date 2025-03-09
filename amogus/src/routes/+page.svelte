<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<script lang="ts">
    import { onMount } from 'svelte';
    let emails = '';
    let keywords = '';
    let statusMessage = '';

    const startRound = async () => {
        statusMessage = 'Sending emails...';
        try {
            const response = await fetch('/api/start-round', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emails: emails.split(',').map(email => email.trim()),
                    keywords: keywords
                })
            });

            const data = await response.json();
            statusMessage = data.message || 'Unknown error';
        } catch (error) {
            statusMessage = 'Failed to send emails!';
        }
    };
</script>

<div class="p-4 max-w-md mx-auto">
    <h1 class="text-2xl mb-4">Imposter Email Game</h1>
    <textarea bind:value={emails} placeholder="Enter emails separated by commas" class="w-full mb-2 p-2 border"></textarea>
    <textarea bind:value={keywords} placeholder="Enter keywords" class="w-full mb-2 p-2 border"></textarea>
    <button on:click={startRound} class="px-4 py-2 bg-blue-500 text-white rounded">Start Round</button>
    {#if statusMessage}
        <p class="mt-2">{statusMessage}</p>
    {/if}
</div>
