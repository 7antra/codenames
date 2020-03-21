<script>
	import { onMount, createEventDispatcher } from "svelte";
	import { fly } from "svelte/transition";
	import { codeName, spy } from "../codeStore";
	const dispatch = createEventDispatcher();

	export let i;
</script>

<style lang="scss">
	@import "../style/_var";

	div {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
		transition: all 1s;
		cursor: pointer;

		p {
			text-transform: uppercase;
			letter-spacing: 0.3rem;
			font-size: 1rem;
		}
	}

	.red {
		border: 1px solid $red;
		background-color: $red;

		p {
			color: transparent;
		}
	}
	.blue {
		border: 1px solid $blue;
		background-color: $blue;

		p {
			color: transparent;
		}
	}
	.black {
		border: 1px solid black;
		background-color: rgb(53, 53, 53);

		p {
			color: transparent;
		}
	}
	.white {
		border: 1px solid grey;
		background-color: rgba(168, 168, 168, 0.212);

		p {
			color: transparent;
		}
	}
</style>

<div
	in:fly={{ x: -200, delay: 100 * i }}
	class={$codeName[i].decouvert || $spy ? $codeName[i].color : ''}
	on:click={() => dispatch('retourner', i)}>
	<p>{$codeName[i].mot}</p>
</div>
