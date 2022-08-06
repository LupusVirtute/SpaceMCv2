<script>
	import ShopItem from "$component/Shop/ShopItem.svelte";
	import ShopConfirmation from "$component/Shop/ShopConfirmation.svelte";
	import '$theme/Shop/Shop.sass'
	import cash from '$asset/cash.svg'
	import { getUserInfo } from "$lib/Functions/LocalUser";
	import { onMount } from "svelte";
	import { fetchJSON, points } from "$lib/Functions/util";
	import site from "$config/site";
	import { getCookie } from "$util/cookie";
	const shopItems = [
		{
			id: "infinity",
			name:"Skrzynka Infinity",
			desc:"Skrzynia na serwerze spacemc.eu podobna do skrzynek z cs:go kup je teraz. Posiada najlepsze itemy możliwe",
			price:10
		},
		{
			id: "cursed",
			name:"Skrzynia Cursed",
			desc:"Skrzynia na serwerze spacemc.eu podobna do skrzynek z cs:go kup je teraz. Posiada najbardziej przeklęte itemy na serwerze",
			price:10
		},
		{
			id: "void",
			name:"Skrzynka Void",
			desc:"Skrzynia na serwerze spacemc.eu podobna do skrzynek z cs:go kup je teraz. Posiada najbardziej dziwne itemy z czerni",
			price:10
		},
		{
			id: "unban",
			name:"Unban",
			desc:"Dostałeś bana? Zgromadź 200 punktów a przemyslimy to",
			price:200
		},
	];
	onMount(async () => {
		const token = await getCookie('token')
		const res = await fetchJSON(site.server_buy+"/points", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			}
		})
		points.set(res.points)
	})
	let point
	const unsubscribe = points.subscribe(value => {
		point = value;
	});
</script>
<svelte:head>
	<title>Sklep tokenów</title>
</svelte:head>
<div class="shop">
	<h1>Sklep Tokenów SpaceMC.eu</h1>
	<div class="points">
		<img class="cash-icon" src="{cash}" alt="Ikonka tokenów"> {point}
	</div>
	<div class="shop-items">
		{#each shopItems as item}
			<ShopItem {item}></ShopItem>
		{/each}
	</div>
</div>