<script>
	import site from '$config/site'
import { onMount } from 'svelte';
import Place from './Place.svelte';
	let url = site.server_top

	async function getTop(top) {
		return await (await fetch(url + '/' + top)).json() 
	}
	let registeredTops = [
		'kills',
		'deaths',
		'ore',
		'time',
		'invite',
		'votes'
	]
	let namedTops = [
		'Zabójstwa',
		'Smierci',
		'Wykopana Ruda',
		'Czas',
		'Zaproszenia',
		'Głosy'
	]
	$: tops = []
onMount(async ()=> {
	for(let top of registeredTops) {
		tops.push(await getTop(top))
		tops = tops
	}
})
</script>
<svelte:head>
	<title>Top SpaceMC</title>
</svelte:head>


<div class="tops">
	{#if tops != []}
		{#each tops as top, i}
		<div class="top">

			<h1>
				{namedTops[i]}
			</h1>
			<hr/>
			{#each top as player, pos}
			<Place {i} {player} {pos} score="{i != 4 ? player[registeredTops[i]]+'' : player['inviteAmount']+''}"/>
			{/each}
		</div>
		{/each}
	{/if}
</div>
<style lang="sass">
h1
	font-size: 2em
	font-weight: 800
	font-family: 'Orbitron'
	margin: 0
.tops
	display: flex
	flex-direction: column
	align-items: center
	font-size: calc(5px + .5vw)
:global(.top)
	:global(div)
		border-bottom: 2px solid #0080F0
		&:last-child
			border: 0
	background: #333
	width: 40%
	border-radius: 2em
	text-align: center
	padding: 1em
	margin-top: 5em
	margin-bottom: 5em
	border: 10px solid #0080F0
hr
	border: 1px solid #0080F0
</style>