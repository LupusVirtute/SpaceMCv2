<script>
	import './ListItem.sass'
	export let link = "";
	export let click = () => {};
	export let rel = ""
</script>
<a href="{link}" rel={rel} on:click="{click}">
	<li>
		<slot name="icon">

		</slot>
		<span>
			<slot/>
		</span>
	</li>
</a>