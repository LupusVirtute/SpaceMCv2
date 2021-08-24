<script>
	import '$theme/footer.sass'
import { onMount } from 'svelte';
	import Discord from '$asset/discord.svg?raw'
	let tik = false
	let tak = '2px 2px 0 #f00, 3px 3px 0 #3EC7C3'
	let tok = '-2px -2px 0 #f00, -3px -3px 0 #3EC7C3'
	function tiktok() {
		window.setTimeout(()=> {
			tiktok()			
		},Math.random()*500)
		const tiktokSpan = document.querySelector('.tiktok i')
		tiktokSpan.style.textShadow = tik ? tak : tok
		tik = !tik
	}
	onMount(()=>{
		tiktok()
	})
</script>
<footer>
	<h1>
		Znajdziesz nas na:
	</h1>
	<hr/>
	<div class="socials">
		<a href='https://www.tiktok.com/@space.mc' id="tiktok" class="social tiktok">
			<i class="fab fa-tiktok" /> Tiktok
		</a>
		<a href='https://www.facebook.com/spacemceuminecraft' class="social fb">
			<i class="fab fa-facebook" /> Facebook
		</a>
		<a href="https://www.instagram.com/spacemc.eu/" class="social inst">
			<i class="fab fa-instagram" /> Instagram
		</a>
		<a rel="external" href='https://spacemc.eu/discord' class="social dsc">
			<i class="fab fa-discord"/> Discord
		</a>
	</div>
</footer>