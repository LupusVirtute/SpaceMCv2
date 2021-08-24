<script>
	import { fade } from 'svelte/transition'
	export let visible;
	function close() {
		visible = false;

	}
</script>
<section class="wrapper" transition:fade>
	<section class="background" on:click="{close}">
	</section>
	<slot/>
</section>
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
	margin-left: -10rem
.background
	width: 100%
	height: 100%
	position: absolute
	z-index: 4

</style>