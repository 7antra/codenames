<script>
	import { send, receive } from "../helpers/crossfade.js";
	import { fly } from "svelte/transition";
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div out:fly={{ x: 1500 }} in:fly={{ x: -500, delay: 400 }}>
	<h1>About this site</h1>

	<p>This is the 'about' page. There's not much here.</p>
</div>
