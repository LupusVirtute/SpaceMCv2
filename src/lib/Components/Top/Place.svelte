<script>
	import { getUserInfo } from "$lib/Functions/UserData";
	import { onMount } from "svelte";
	import firstPlace from '$asset/first-place.png';
	import secondPlace from '$asset/second-place.png';
	import thirdplace from '$asset/third-place.png';
import { getUID } from "$lib/Functions/LocalUser";

	export let i;
	export let player;
	export let pos;
	export let score = '';

	function convertSeconds(seconds) {
		let days = Math.floor(seconds / 86400);
		let hours = Math.floor((seconds % 86400) / 3600);
		let minutes = Math.floor(((seconds % 86400) % 3600) / 60);
		let second = ((seconds % 86400) % 3600) % 60;
		return {
			days,
			hours,
			minutes,
			second
		};
	}
	let avatar;
	let betterScore = score;
	async function addAvatar(){
		let UID =  await getUID(player.nick);
		if(UID === 'Player not found !')
			UID = 'ae1241e0-62cc-44cd-aad4-2a5277705891'
		avatar =  "https://crafatar.com/avatars/" + UID +'?default=MHF_Steve&overlay'
	}
	function convertNumber(number)
	{
		if(number >= 1000000000)
			return number / 1000000000 + " mlrd";
		if(number >= 1000000)
			return number / 1000000 + " mln";
		if(number >= 1000)
			return number / 1000 + " k";
		return number;
	}
	if(i == 3) {
		betterScore = convertNumber(convertSeconds(parseInt(score)))
	}
	function getPosClass() {
		return pos == 0 ? 'first' : pos == 1 ? 'second' : pos == 2 ? 'third' : ''
	}
	onMount(async ()=>{
		await addAvatar();
	})
</script>
<div class="player {getPosClass()}">
	
	<h2>
		{#if pos == 0}
		<img src="{firstPlace}" alt="First Place"/> 
		{:else if pos == 1}
		<img src="{secondPlace}" alt="Second Place"/>
		{:else if pos == 2}
		<img src="{thirdplace}" alt="Third Place"/>
		{:else}
		{pos+1}.
		{/if}
		{player.nick}
		<img src="{avatar}" alt="" />
	</h2>
	<div class="score">
		{#if typeof betterScore === 'object'}
				{#if betterScore.days > 0}
				{betterScore.days}D 
				{/if}
				{#if betterScore.hours > 0}
				{betterScore.hours}H
				{/if}
				{#if betterScore.minutes > 0}
				{betterScore.minutes}M
				{/if}
				{betterScore.second}S	
			{:else}
			{convertNumber(betterScore)}
		{/if}

	</div>
</div>
<style lang="sass">
h2
	margin: 0
	font-size: 1.5em
	font-weight: 500
	font-family: 'Arial'
	img
		width: 1em
.first
	text-shadow: 0px 0px 10px #FFaa00, 0px 0px 10px #FFaa00, 0px 0px 10px #FFaa00, 0px 0px 10px #FFaa00
.second
	text-shadow: 0px 0px 10px #aaa, 0px 0px 10px #aaa, 0px 0px 10px #aaa, 0px 0px 10px #aaa
.third
	text-shadow: 0px 0px 10px #AA5A00, 0px 0px 10px #AA5A00, 0px 0px 10px #AA5A00, 0px 0px 10px #AA5A00
.score
	font-size: 1.5em
	font-weight: 500
	border: 0
.player
	padding: 1em
	overflow: auto
	white-space: nowrap
	display: flex
	justify-content: space-between
	
</style>