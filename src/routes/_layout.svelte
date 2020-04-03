<script>
	import { onMount } from "svelte";
	import { mobile } from "../store";
	import { numUsers, starter, codeName } from "../codeStore";
	import Circle from "../components/ui/circleTouch.svelte";

	onMount(() => {
		mobile.set(window.matchMedia("(max-width: 1000px)").matches);
	});

	let spot = {
		x: 100,
		y: 100,
	};

	const move = e => {
		if (!$mobile) {
			spot.x = e.clientX;
			spot.y = e.clientY;
		}
	};
</script>

<style lang="scss" global>
	@import "./style/global.scss";

	#mouse {
		position: fixed;
		top: calc(50% - 50px);
		left: calc(50% - 50px);
		z-index: 10000;
		pointer-events: none;
	}
</style>

<div id="mouse" style="top: {spot.y - 50}px; left: {spot.x - 50}px;">
	<Circle />
</div>

<main on:mousemove={move}>
	<slot />
</main>
