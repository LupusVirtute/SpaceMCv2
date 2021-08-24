<script>
	import '$theme/global.sass';
    import favicon from '$asset/favicon.png?url';
</script>
<svelte:head>
	<script async
	data-cookie-notice='{{ "learnMoreLinkEnabled": true, "learnMoreLinkHref": "/privacy.html" }}'
	src="https://unpkg.com/cookie-notice@^1/dist/cookie.notice.min.js"
  ></script> 
	<script>
	if ('serviceWorker' in navigator) {
    	navigator.serviceWorker.register('./arc-sw.js');
    }
	</script>
	<script async src="https://arc.io/widget.min.js#sCmJhGm3"></script>
	<script data-ad-client="ca-pub-8428286204660521" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<link rel="icon" href="{favicon}"/>
	<script async src="https://kit.fontawesome.com/c0ff61a66a.js" crossorigin="anonymous"></script>

	<script async src="https://www.googletagmanager.com/gtag/js?id=G-ZN4F6TT8PG"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	
	  gtag('config', 'G-ZN4F6TT8PG');
	</script>




    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="LupusVirtute"/>
    <meta name="description" content="Strona najlepszego serwera Survival Minecraft jesteśmy tylko dla ciebie!"/>
    <meta name="keywords" content="Minecraft Serwer, Serwery Minecraft, "/>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name='twitter:title' content="Space MC EU"/>
    <meta name='twitter:description' content="Strona najlepszego serwera Survival Minecraft jesteśmy tylko dla ciebie!"/>
    <meta name='twitter:image' content=""/>
    <meta property="og:title" content="SpaceMC.eu"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="https://SpaceMC.eu"/>
    <meta property="og:locale" content="pl_PL"/>
    <meta property="og:description" content="Strona najlepszego serwera Survival Minecraft jesteśmy tylko dla ciebie!"/>
    <meta property="og:image" content="" />
    
    <meta property="og:image:alt" content="Space MC EU Server Logo"/>
    <meta property="og:image:type" content="image/png"/>
    <meta name="theme-color" content="#3F398F">
</svelte:head>