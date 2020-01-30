<script>
	import { onMount } from "svelte";
	import Nav from "../components/Nav.svelte";
	export let mobile;
	export let segment;

	onMount(() => (mobile = window.matchMedia("(max-width: 700px)").matches));
</script>

<style lang="scss" global>
	@import "./style/global.scss";
</style>

<Nav {segment} />

<main>
	<slot />
</main>
