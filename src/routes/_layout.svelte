<script>
	import { onMount } from "svelte";
	import Nav from "../components/Nav.svelte";
	import { mobile } from "../store";

	onMount(() => {
		mobile.set(window.matchMedia("(max-width: 700px)").matches);
	});
</script>

<style lang="scss" global>
	@import "./style/global.scss";
</style>

<main>
	<slot />
</main>
