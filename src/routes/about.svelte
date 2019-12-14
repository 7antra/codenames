<script>
	import { onMount } from "svelte";
	import { send, receive } from "../helpers/crossfade.js";
	import { fly } from "svelte/transition";
	import marked from "marked";

	let texte = ``;
	let markdown;

	marked.setOptions({
		breaks: true,
	});

	$: markdown = marked(texte);
</script>

<style lang="scss">
	.flex {
		display: flex;
		flex-direction: row;
		textarea {
			width: 30%;
			height: 50vh;
		}

		.marked {
			width: 30%;
			height: 50vh;
			margin: 0 2%;
		}
	}
</style>

<svelte:head>
	<title>About</title>
</svelte:head>
<div out:fly={{ x: 1500 }} in:fly={{ x: -500, delay: 400 }}>
	<h1>About this site</h1>

	<p>This is the 'about' page. There's not much here.</p>

</div>
