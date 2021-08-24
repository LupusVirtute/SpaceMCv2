<script>
	import Modal from '../Modal.svelte';
	import { getCookie } from '$util/cookie';
	import site from '$config/site';
	import BigBlackSpinner from '../BigBlackSpinner.svelte';
	import Message from '$lib/Functions/Message'

	export let visible;
	let msg = "ERROR";
	let nick;
	async function verifyAnswer() {
		const reqData = {
			"nick": nick
		}
		const options = {
			method: 'POST',
			headers: {
				authorization: 'Bearer ' + getCookie('token'),
				"Content-Type": "application/json"

			},
			body: JSON.stringify(reqData)
		};
		const response = await fetch(`${site.server_invite}`, options);
		const data = await response.text();
		msg = Message[data]
	}
	let answerPromise;
</script>
<Modal bind:visible>
	{#if !answerPromise}
	<div class="inputWrapper">
		<h1>Podaj nick gracza ktory cie zaprosil.</h1>
		<input type="text" bind:value={nick} placeholder="Nick Gracza"/>
		<button on:click={()=> answerPromise = verifyAnswer()}>
			Akceptuj
		</button>
	</div>
	{:else}
		{#await answerPromise}
		<BigBlackSpinner/>
		{:then}
		<h1 class="Spiderman">
			{@html msg}
		</h1>
	{/await}
	{/if}
</Modal>
<style lang="sass">
:global(.Spiderman)
	display: flex
	flex-direction: column
	align-items: center
	:global(img)
		margin-top: 10rem
h1
	font-size: 2em
	font-family: 'Orbitron'
.inputWrapper
	display: flex
	flex-direction: column
	z-index: 10
	input
		width: 95%
</style>