<script>
	import { onMount } from "svelte";
	import { mobile } from "../store";
	import { numUsers, starter, codeName } from "../codeStore";
	import Circle from "../components/ui/circleTouch.svelte";

	onMount(() => {
		mobile.set(window.matchMedia("(max-width: 700px)").matches);
	});

	let spot = {
		x: 0,
		y: 0,
	};

	const move = e => {
		console.log("e : ", e);

		spot.x = e.clientX;
		spot.y = e.clientY;
	};
</script>

<style lang="scss" global>
	@import "./style/global.scss";

	#mouse {
		position: fixed;
		z-index: 10000;
		pointer-events: none;
	}
</style>

<div id="mouse" style="top: {spot.y - 10}px; left: {spot.x - 10}px;">
	<Circle />
</div>

<main on:mousemove={move}>
	<slot />
</main>
