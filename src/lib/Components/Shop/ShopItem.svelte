<script>
	import '$theme/Shop/ShopItem.sass'
	import cash from '$asset/cash.svg?raw'
import ShopConfirmation from './ShopConfirmation.svelte'
	export let item
	let visible = false
	function buy() {
		gettinResult = 0
		visible = !visible
	}
	let gettinResult = 0
</script>
<ShopConfirmation bind:gettinResult={gettinResult} {item} visible={visible}/>
<div class="shop-card">
	<h1>{item.name}</h1>
	<div class="desc">
		{item.desc}
	</div>
	<button on:click={buy}>
		Odbierz za {item.price}
		<span class="tokeny">{@html cash}</span>
	</button>
</div>
