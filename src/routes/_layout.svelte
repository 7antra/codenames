<script>
	import { onMount } from "svelte";
	import { mobile } from "../store";
	import Nav from "../components/Nav.svelte";
	export let segment;

	onMount(() => mobile.set(window.matchMedia("(max-width: 700px)").matches));
</script>

<style lang="scss" global>
	@import "./style/global.scss";
</style>

<Nav {segment} />

<main>
	<slot />
</main>
