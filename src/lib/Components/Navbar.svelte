<script>
	import '$theme/navbar.sass';
	import { isUserLoggedIn } from '$lib/Functions/auth'
	import ListItem from './NavBar/ListItem.svelte';
	import LoginModal from './LoginModal.svelte';
	import { onMount } from 'svelte'
	import PlayerLogged from './PlayerLogged.svelte';
	import { isSessionActive } from '$lib/Functions/LocalUser';
	import { eraseCookie } from '$util/cookie';
import site from '$config/site';

	$: visibleModal = false;
	$: loggedIn = false;
	function login() {
		visibleModal = true;
	}
	async function checkSession() {
		if(!(await isUserLoggedIn())) {
			loggedIn = false;
			eraseCookie('token')
			localStorage.clear();
			return;
		}
		if(!(await isSessionActive())) {
			loggedIn = false;
			eraseCookie('token')
			localStorage.clear();
			login();
		}
		loggedIn = true;
	}
	onMount(()=>{
		isUserLoggedIn().then((data)=>{
			loggedIn = data;
		})
		setInterval(checkSession,10000)
	})
	let inPanel = false;
</script>
<header>
	<h1>
		<i class="fa fa-rocket"/>
		<span>
			SpaceMC
		</span>
	</h1>
	<nav>
		<ListItem link="{site.url}">
			<i class="fa fa-home" slot="icon"/>
			HOME
		</ListItem>
		<ListItem rel="external" link="https://spacemc.eu/sklep">
			<i class="fa fa-shopping-cart" slot="icon"/>
			SKLEP
		</ListItem>
		<ListItem click="{()=>login()}">
			<i class="fa fa-key" slot="icon"/>
			{#if !loggedIn}
			LOGIN
			{:else}
			WYLOGUJ
			{/if}
		</ListItem>
		<ListItem rel="external" link="/regulamin">
			<i class="fa fa-clipboard-list" slot="icon"/>
			REGULAMIN
		</ListItem>
		<ListItem link='/top'>
			<i class="fa fa-trophy" slot="icon"/>
			TOPKI
		</ListItem>
		{#if loggedIn}
		<ListItem link="/panel">
			<i class="fa fa-columns" slot="icon"/>
			PANEL
		</ListItem>
		{/if}
	</nav>
</header>

{#if visibleModal}
	<LoginModal bind:visible={visibleModal} bind:logged={loggedIn}/>
{/if}
{#if loggedIn}
	<PlayerLogged bind:loggedIn={loggedIn}/>
{/if}