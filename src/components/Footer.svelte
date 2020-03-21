<script>
	import { numUsers, starter, spy } from "../codeStore";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	const newGame = () => dispatch("new");
	const please = () => dispatch("aligner");
</script>

<style lang="scss">
	@import "../style/_var";

	footer {
		position: fixed;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		height: 7.5vh;
		width: 100%;
		bottom: 0;
		font-weight: bold;
		font-size: 0.7rem;
		padding: 15px;

		color: white;

		button {
			font-weight: bold;
			color: white;
			border: 2px solid white;
			border-radius: 3px;
			margin-left: 5vw;
		}
	}

	.red {
		background-color: $red;
	}

	.blue {
		background-color: $blue;
	}
</style>

<footer class={$starter}>

	<p>Nombre de confiné(s) : {$numUsers}</p>

	<div>

		{#if $spy}
			<button on:click={() => ($spy = false)}>BOARD 📝</button>
		{:else}
			<button on:click={() => ($spy = true)}>SPY 🕵️</button>
		{/if}
		<button on:click={please}>ALIGNER 👌</button>
		<button on:click={newGame}>NEW GAME 🎬</button>
	</div>
</footer>
