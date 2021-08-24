<script>
	import Modal from '../Modal.svelte';
	import { getCookie } from '$util/cookie';
	import site from '$config/site';
	import BigBlackSpinner from '../BigBlackSpinner.svelte';
	import Message from '$lib/Functions/Message'

	export let visible;
	let msg = "ERROR";
	async function verifyVote() {
		const options = {
			method: 'POST',
			headers: {
				authorization: 'Bearer ' + getCookie('token')
			}
		};
		const response = await fetch(`${site.server_vote}`, options);
		const data = await response.text();
		const responseCode = await response.status;
		msg = Message[data]
	}
	let votePromise = verifyVote();
</script>
<Modal bind:visible>
{#await votePromise}
<BigBlackSpinner/>
{:then}
<h1>
	{msg}
</h1>
{/await}
</Modal>
<style lang="sass">
h1
	font-size: 2em

</style>