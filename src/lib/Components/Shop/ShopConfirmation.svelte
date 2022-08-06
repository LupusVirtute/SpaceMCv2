<script>
import Modal from "../Modal.svelte";
import '$theme/Shop/ShopConfi.sass'
import BigBlackSpinner from "../BigBlackSpinner.svelte";
import site from "$config/site";
import { getCookie } from "$util/cookie";
import { fetchText, points } from "$lib/Functions/util";
import Message from "$lib/Functions/Message";
import { addUserInfo } from "$lib/Functions/LocalUser";
export let visible = true
export let item
let message = ""
export let gettinResult = 0
async function yes() {
	gettinResult = 1
	const token = getCookie("token")
	let res = await fetchText(site.server_buy, {
		method: "POST",
		body: JSON.stringify({
			service: item.id
		}),
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+token
		}
	})
	gettinResult = 2
	message = Message[res]
	if(res == "INVESTED")
		points.update(val => val-item.price)
}
function no() {
	visible = false
}
</script>

<Modal bind:visible={visible}>
	{#if gettinResult == 0}
	<div class="confirmation">
		<h1>Odbierasz {item.name}</h1>
		<p>Czy na pewno chcesz odebrać ten przedmiot?</p>
		<div class="choice">
			<button on:click={yes}>Tak</button>
			<button on:click={no}>Nie</button>
		</div>
	</div>
	{:else if gettinResult == 1}
	<BigBlackSpinner/>
	{:else if gettinResult == 2}
	<h2>
		{@html message}
	</h2>
	{/if}
</Modal>
