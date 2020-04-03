<script>
	import { loading } from "../../codeStore";
	import { draw } from "svelte/transition";
</script>

<style lang="scss">
	svg {
		width: 100px;
		height: 100px;
		pointer-events: none;

		path {
			fill: transparent;
		}
	}
</style>

<svg
	viewBox="0 0 20 20"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	xml:space="preserve"
	xmlns:serif="http://www.serif.com/"
	style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">

	{#if $loading}
		<path
			in:draw={{ duration: 1000 }}
			d="M10,3C13.863,3 17,6.137 17,10C17,13.863 13.863,17 10,17C6.137,17
			3,13.863 3,10C3,6.137 6.137,3 10,3"
			style="stroke:black;stroke-width:2.59px;" />
	{/if}

</svg>
