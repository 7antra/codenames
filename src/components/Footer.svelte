<script>
	import { numUsers, starter, spy, count } from "../codeStore";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	const newGame = () => dispatch("new");
	const please = () => dispatch("aligner");
</script>

<style lang="scss">
	@import "../style/_var";

	footer {
		position: fixed;

		display: grid;
		align-items: center;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 12px;
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

	<p>Nb de confiné{$numUsers > 1 ? 's' : ''} : {$numUsers}</p>
	<p>Bleu : {$count.blue}/{$starter === 'blue' ? 9 : 8}</p>
	<p>Rouge : {$count.red}/{$starter === 'red' ? 9 : 8}</p>
	<div>

		{#if $spy}
			<button on:click={() => ($spy = false)}>BOARD 📝</button>
		{:else}
			<button on:click={() => ($spy = true)}>SPY 🕵️</button>
		{/if}
		<!-- <button on:click={please}>👌</button> -->
	</div>
	<button on:click={newGame}>NEW GAME 🎲</button>
</footer>
