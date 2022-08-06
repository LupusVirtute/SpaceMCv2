<script>
	import { fade } from 'svelte/transition'
	export let visible;
	function close() {
		visible = false;

	}
</script>
{#if visible}
<section class="wrapper" transition:fade>
	<section class="background" on:click="{close}">
	</section>
	<div style="z-index: 4">
		<slot/>
	</div>
</section>
{/if}
<style lang="sass">
.wrapper
	display: flex
	justify-content: center
	align-items: center
	width: 100%
	height: 100%
	position: absolute
	z-index: 10
	background: rgba(0,0,0,0.9)
	top: 0
	left: 0
	margin-left: -1rem
.background
	width: 100%
	height: 100%
	position: absolute
	z-index: 4

</style>