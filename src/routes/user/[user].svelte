<script>
	import { getUID } from '$lib/Functions/LocalUser';
	import Spinner from '$asset/Spin.svg';
	import { getUserInfo } from '$lib/Functions/UserData'
	import { onMount } from 'svelte';
	export let userNick;
	import ore from '$asset/ore.svg?raw'
	import sword from '$asset/sword.svg?raw'
	$: user = {};
	
	onMount(()=>{
		getInfo();
	})
	async function getInfo() {
		getUserInfo(userNick).then((data)=>{
			user = data;
			if(!user)
				return;
			if(user.message) {
				user = {};
				setTimeout(()=>{
					getInfo();
				},10000)
				return;
			}
			addAvatar();
		})
	}
	let time = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};
	
	async function addAvatar(){
		user.avatar =  "https://crafatar.com/avatars/" + await getUID(user.nick)+'?default=MHF_Steve&overlay=true'
		time = convertSeconds(user.time);
	}
	// Convert seconds to days hours and minutes and seconds
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
	function getRegisterDate(unixTime) {
		let time = parseInt(unixTime)
		return new Date(time).toLocaleDateString();
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
</script>
<script context="module">
	export async function load( { page }) {
		return {
			props: {
				userNick: page.params.user
			}
		}
	}
</script>
<svelte:head>
	<title>SpaceMC | {user.nick}</title>
</svelte:head>
{#if user.nick != undefined}

	<div class="info" >
		<div class="img-wrapper">
			<img src="{user.avatar}" alt="Avatar użytkownika"/>
		</div>
		<div class="user">
			<span>
				<i class="fas fa-user" /> Nick : {user.nick}
			</span>
			<span>
				<i class="fas fa-calendar" /> Zarejestrowany: {getRegisterDate(user.registerDate)}
			</span>
			<span>
				<i class="fas fa-clock" />Czas na serwerze: 
				{#if time.days > 0}
				{time.days} D 
				{/if}
				{#if time.hours > 0}
				{time.hours} H
				{/if}
				{#if time.minutes > 0}
				{time.minutes} M
				{/if}
				{time.second} S
			</span>
			<span>
				{@html ore} Ilość wykopanych rud: {convertNumber(user.ore)}
			</span>
			<span>
				<i class="fas fa-skull" /> Ilość śmierci: {convertNumber(user.deaths)}
			</span>
			<span>
				{@html sword}  Ilość Zabójstw: {convertNumber(user.kills)}
			</span>
			<span>
				<i class="fas fa-envelope"></i>Ilość zaproszeń: {convertNumber(user.inviteAmount)}
			</span>
		</div>

	</div>
{:else}
<div class="BigBlackSpinner">
	<img src="{Spinner}" alt="loading" />
</div>
{/if}

<style lang="sass">
.BigBlackSpinner
	display: flex
	align-items: center
	justify-content: center
	padding-left: 5rem
	width: calc(100% + 10rem)
	height: 100%
	margin-left: -10rem
	background-color: rgba(0,0,0,0.5)
$c: #000
i
	margin-right: .5rem
.info
	background: rgba(0,0,0,0.3)
	width: 60rem
	padding: 2rem
	overflow: auto
	margin: 0 auto
	margin-top: 20vh
	display: flex
	align-items: center
	flex-direction: column
	justify-content: space-between
	border-radius: 2rem
	margin-bottom: 10rem

	.img-wrapper
		// background: url('$asset/border.png') no-repeat
		// background-size: contain
		// background-position: center
		z-index: 3
		img
			image-rendering: crisp-edges
			width: 16rem
			border-radius: .8rem
		display: flex
		flex-direction: column
		align-items: center
		justify-content: center
		padding: 2rem
		cursor: pointer
	.user
		width: 100%
		font-size: 1.8rem
		margin-left: 2rem
		:global(svg)
			fill: #fff
			width: 1em
			height: 1em
		span
			display: block
			width: 90%
			margin: 0 auto
			&:first-child
				border-radius: 1rem 1rem 0 0
			&:last-child
				border-radius: 0 0 1rem 1rem
			white-space: nowrap
			padding: 1.5rem 2rem
			background: rgba(0, 64, 160, 0.3)
:global(body)
	background: #003090 no-repeat
	background-size: cover
	background-attachment: scroll
</style>