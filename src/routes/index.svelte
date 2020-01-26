<script>
	import { fly } from "svelte/transition";
</script>

<style lang="scss">
	@import "./style/var";
	h1 {
		color: $main-color;
	}
</style>

<svelte:head>
	<title>TODO</title>
	<meta name="description" content="TODO" />
	<!-- Facebook -->
	<meta property="og:title" content="TODO" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://www.TODO.com/" />
	<meta property="og:image" content="https://www.TODO.com/og/test.jpg" />
</svelte:head>

<div out:fly={{ x: 1500 }} in:fly={{ x: -500, delay: 400 }}>
	<h1>Riiiiiick!</h1>
	<img alt="rick" src="free-rick.jpg" />
</div>
