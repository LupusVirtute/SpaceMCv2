<script>
	export const prerender = false;
	export let loggedIn = false;
	import { onMount } from 'svelte';
	import { getInfo } from '$lib/Functions/LocalUser'
	import { page } from '$app/stores';
	import Spinner from '$asset/Spin.svg';
	let inPanel = false;
	page.subscribe((page) => {
		if(page.path.startsWith('/panel')) {
			inPanel = true;
		}
	});
    let user;
	let userIMG;
	onMount(()=>{
		checkLogin();
	})
	
	async function checkLogin() {
		if(loggedIn) {
			if(userIMG)
				return;
			let result = await getInfo();
			if(!result) {
				loggedIn = false;
				return;
			}
			user = result.user;
			userIMG = result.avatar;
			return;
		}
		window.setTimeout(()=>{
			checkLogin();
		},1000)
	}


</script>
{#if loggedIn && !inPanel}
<a class="logged-wrapper" href="/panel">
	<div class="logged">
				{#if user}
				<img src="{userIMG}" alt="Twój skin"/>
				<span>
					{user.nick}
				</span>
				{:else}
				<img src="{Spinner}" alt="Wait"/>
				{/if}
			</div>
		</a>
{/if}
<style lang="sass">
.logged
	z-index: 10
	transition: all 1s
	color: #fff
	&:hover
		cursor: pointer
		transform: translateY(-.01rem)
		background: #0070a0
	background: #0080f0
	position: absolute
	margin: 2rem
	padding: 1rem 2rem
	display: flex
	justify-content: right
	align-items: center
	border-radius: 10rem
	img
		margin-right: 1rem
		width: 2rem
		border-radius: 100%
.logged-wrapper
	position: absolute
	display: flex
	width: 100%
	justify-content: flex-end
</style>