<script>
	import '$theme/login.sass'
	import { getToken } from '../Functions/auth'
	import { fly, fade } from 'svelte/transition'
	import Spinner from '$asset/Spin.svg'
	import { setCookie, eraseCookie, getCookie } from '$util/cookie';



	export let visible = true;

	export let logged = false;
	let captcha = false;
	let process = false;
	let result;
	let captchaKey;
	eraseCookie('token')
	localStorage.clear();
	if(logged) {
		logged = false
		visible = false
	}
	function verify(e) {
		captchaKey = e.key;
		captcha = true;
	}
	function error(e) {
		console.log('error event', { error: e.error });
	}

	let handling = false;
	async function handleSubmit(event) {
		if(handling)
			return;
		handling = true;
		if(!captchaKey) {
			captcha = false;
			return;
		}
		
		process = true;
		let target = event.target;
		let username = target.username.value;
		let password = target.password.value;
		result = getToken(username,password,captchaKey);

		let sessionResponse = JSON.parse((await result));
		if(sessionResponse){
			setCookie("token",sessionResponse.session)

			logged = true
			window.setTimeout(() => {
				close()
			}, 1000);
		}
	}
	function close() {
		visible = false;
	}
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/vanilla-hcaptcha"></script>
</svelte:head>


<section class="wrapper" transition:fade>
	<section class="background" on:click="{close}">
	</section>

	{#if !captcha}	

		<h-captcha id="captcha" on:error="{error}" on:verified="{verify}"
		site-key="{import.meta.env["VITE_CAPTCHA_KEY"]}"
		size="normal"
		theme="dark"
		tabindex="0"></h-captcha>

	{:else}
		{#if !process}

		<form in:fly={{ y: 1000, duration: 2000 }}  out:fly={{ y: -1000, duration: 2000 }} class="login-form" on:submit|preventDefault="{handleSubmit}">
			<section class="info">
				<i class="fa fa-rocket"></i>
				<h1>
					Witaj z powrotem!
				</h1>
				<h2>
					Zaloguj sie do systemu
				</h2>
			</section>
			<label for="username">Nick</label>
			<input type="text" name="username"/>
			<label for="password">Haslo</label>
			<input type="password" name="password"/>

			
			<button class="login">
				LOGIN
			</button>
		</form>

		{:else}
			{#await result}
				<section class="loading">
					<img src={Spinner} alt="loading"/>
				</section>
			{:then}
				<section class="logged-on">
					Zalogowano pomyślnie!	
				</section>
			{/await}
		{/if}
	{/if}
</section>
