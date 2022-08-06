<script>
	export const prerender = false;
	import { onMount } from "svelte";
	import { getInfo } from '$lib/Functions/LocalUser';
	import Spinner from '$asset/Spin.svg';
	import { loginUser } from '$lib/Functions/LocalUser'
	import { fade } from 'svelte/transition';
	import '$theme/panel.sass';
	import VoteVerifyModal from '$component/Panel/VoteVerifyModal.svelte';
	import Invited from '$component/Panel/Invited.svelte';
	import site from "$config/site";

	let userInfo;
	let user;
	onMount(()=>{
		userInfo = getInfo().then((data)=>{
			user = data;
			if(!data) {
				window.location.href = 'http://spacemc.eu';
				return;
			}
		})
	})
	let message = "";
	$: wait = 0;
	function sendLoginRequest() {
		wait = 1;
		message = "Zalogowano pomyslnie";
		loginUser().then(()=>{
			waitProceed();
		})
	}
	function waitProceed() {
		setTimeout(() => {
			wait = 2;
			setTimeout(()=>{
					wait = 0;
				},2000)
		}, 2000);
	}
	function stats() {
		let userNick = user.user.nick;
		window.location.href = site.url+'/user/'+userNick;
	}
	$: invited = false;


	function getInvitedBy() {
		invited = true;
	}
	$: voteVerify = false;
	
	function redirectToShop() {
		window.location.href = site.url+'/pointshop';
	}
</script>
{#if voteVerify}
	<VoteVerifyModal bind:visible={voteVerify}/>
{/if}
{#if invited}
	<Invited bind:visible={invited}/>
{/if}
<svelte:head>
<title>
	Panel Gracza
</title>

</svelte:head>
{#if user}
<div class="profile-card">
	<section class="desc">
				{#if wait == 1}
					<img class="popup" transition:fade src="{Spinner}" alt="loading" />
				{:else if wait == 2}
					<h1 class="popup" transition:fade>
						{message}
					</h1>
				{:else}
				<section transition:fade class="image">
					<img src="{user.avatar}" alt="Twoja głowa"/>
				</section>
				<section transition:fade class="info">
					<h1>Witaj {user.user.nick}!</h1>
					<h2>
						Poniżej masz dostępne opcje dla swojego profilu.
					</h2>
					<div class="options">
						<button on:click="{sendLoginRequest}">
							Zaloguj na serwerze
						</button>
						<button on:click={stats}>
							Statystyki
						</button>
						<button on:click={getInvitedBy}>
							Zaprosil mnie
						</button>
						<button class="shop-button" on:click={redirectToShop}>
							Sklep Tokenów
						</button>
					</div>
				</section>
				{/if}
			</section>
		</div>
{:else}
<div class="BigBlackSpinner">
	<img src="{Spinner}" alt="loading" />
</div>
{/if}
