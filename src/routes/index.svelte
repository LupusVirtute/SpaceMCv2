<script>
	import wave from '$asset/wave.svg'
	import '$theme/home.sass'
	import logo from '$asset/drawing.svg'
	import discord from '$asset/discord.svg'
</script>
<svelte:head>
    <title>Space MC</title>
</svelte:head>


<section class="Welcomer"> 
	<h1>Space MC</h1>
	<img src="{logo}" alt="Logo"/>
	<h2>
		KOSMICZNA ROZGRYWKA
	</h2>
</section>
<section>
	<img src={wave} alt="wave" class="wave">
</section>
<section class="about">
	<h1>
		O nas
	</h1>
	<section>
		Projekt SpaceMC powstał z myślą o stworzeniu idealnego serwera Minecraft, który zapewniłby niejednemu graczowi kilkadziesiąt godzin przyjemnej rozgrywki.<br/><br/>
		
		Aby to osiągnąć, zebraliśmy ekipę, w której posiadamy m.in. wybitnych programistów, umiejących posługiwać się różnorodnymi technologiami i znających mechanikę gry Minecraft, budowniczych, którzy zawsze mają wiele kreatywnych pomysłów na rozbudowę serwera oraz doświadczoną administrację, która potrafi rozwiązać każdy problem i zawsze jest chętna do pomocy.<br/><br/>
	</section>
		
	<h1>
		Dlaczego my?
	</h1>
	<section>

		Również pomimo tego, że SpaceMC jest nowym serwerem, postanowiliśmy głównie uderzać w autorskie prace.<br/><br/>
		
		Większość pluginów, z których korzystamy, napisane zostały przez nasz zespół developerski, który prowadzony jest przez doświadczonego programistę — LupusVirtute, wymagającego od całej ekipy developerskiej zaangażowania i profesjonalności w środowiskach javy i różnorakich frameworków.<br/><br/>
		
		Jednak nie tylko pluginy są u nas autorskie, wszystkie budowle na serwerze wybudowane zostały przez zdolną ekipę budowniczych, zarządzaną przez Nateś, która tak samo, jak w zespole developerskim wymaga zaangażowania, ale też oryginalności i kreatywnych pomysłów.<br/><br/>
		
		Co więcej, autorskie prace to nie wszystko, co mamy do zaoferowania.<br/><br/>
		
		Cały nasz zespół administracyjny składa się z profesjonalnych ludzi, którzy nigdy nie zostawią gracza w potrzebie oraz sam serwer posiada wiele urozmaiceń, które ubarwiają całą rozgrywkę i wychodzą poza znany nam od kilku lat schemat gry Minecraft.<br/><br/>
	</section>
</section>

<section class="discord">

	<h1>
		Dołącz na nasz discord!
	</h1>
	<div>
		<img src="{discord}" alt="Discord logo">
		<section>
			Nasza przyjazna i pomocna społeczność sprawi że poczujesz się jak wśród rosnącej liczby przyjaciół chętnej do pomocy i umilania mile spędzonego czasu na serwerze razem żartując i siadając wspólnie do organizowanych eventów.
		</section>
	</div>
	<a rel="external" href="https://spacemc.eu/discord" class="dscBut">
		Dołącz na Discord SpaceMC
	</a>
</section>
<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap')
.dscBut
	&:hover
		background: #5865F2
		transform: translateY(-1rem)
		cursor: pointer
	transition: all .6s
	background: 0
	border: 1px solid #5865F2
	color: #fff
	width: auto
	height: 30%
	font-size: 1em
	margin: 0 auto
	margin-top: 2rem
	padding: 1rem 4rem
	border-radius: 20rem
.discord
	box-shadow: 0 -6px 10px #001748
	div
		display: flex
		justify-content: center
		img
			width: 8rem
			margin-right: 3rem
		section
			width: 60ch
			padding-right: 10rem
	display: flex
	flex-direction: column

	white-space: wrap
	font-size: 2rem
	h1
		text-align: center
		margin: 0
		margin-bottom: 3rem
		font-weight: 800
		font-family: 'Montserrat', sans-serif
	background: #001748
	padding-top: 10rem
	padding-bottom: 10rem

	padding-left: 10rem
	margin-left: -10rem
	margin-right: 10rem
.wave
	width: 120vw
	margin-left: -10rem
	margin-bottom: -1rem
.about
	margin-left: -10rem
	padding: 10rem 0
	padding-left: 4rem
	padding-right: 10rem
	font-size: 1.3rem
	display: flex
	justify-content: center
	align-items: center
	flex-direction: column
	background: #002788
	text-align: left
	section
		width: 60em
		font-size: 1.2em
	h1
		white-space: nowrap
		width: auto
		text-align: left
		margin: 0
		padding: 1rem 0
		font-size: 1.7em
.Welcomer
	margin-left: -5rem
	width: 100%
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	font-family: 'Orbitron'
	img
		width: 40rem
h1
	text-align: center
	font-size: 3rem

:global(body)
	background: url('$asset/background.jpg') no-repeat !important
	background-size: cover !important
	background-attachment: scroll
</style>