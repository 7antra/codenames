<script>
	import { onMount } from "svelte";
	import { mobile } from "../store";
	import { numUsers, starter, codeName } from "../codeStore";

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
