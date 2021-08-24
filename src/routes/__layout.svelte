<script lang="ts">
	import PageTransition from "$lib/Components/PageTransition/index.svelte";
	import Footer from "$component/Footer.svelte";
	import Navbar from "$component/Navbar.svelte";
	import Head from '$component/Head.svelte';
	export let key
</script>
<script context="module">
	export async function load( { page }) {
		return {
			props: {
				key: page.path
			}
		}
	}
</script>
<Head/>
<section id="body">
	<Navbar/>
	<PageTransition refresh="{key}">
		<slot />
		<Footer/>
	</PageTransition>
</section>

