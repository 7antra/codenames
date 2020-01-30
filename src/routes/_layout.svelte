<script>
	import { onMount } from "svelte";
	import Nav from "../components/Nav.svelte";
	import { mobile } from "../store";
	export let segment;

	onMount(() => {
		mobile.set(window.matchMedia("(max-width: 700px)").matches);
	});
</script>

<style lang="scss" global>
	@import "./style/global.scss";
</style>

<Nav {segment} />

<main>
	<slot />
</main>
