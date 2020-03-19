<script>
	import { numUsers, starter, spy } from "../codeStore";
	import { onMount } from "svelte";
	import io from "socket.io-client";
	let socket;
	let newGame;

	onMount(() => {
		socket = io();
		newGame = () => socket.emit("new game");
	});
</script>

<style lang="scss">
	@import "../style/_var";

	footer {
		position: fixed;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-direction: row;
		height: 5vh;
		width: 100%;
		bottom: 0;
		font-weight: bold;

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
	<p>Nombre de connexion : {$numUsers}</p>
	<button on:click={newGame}>NEW GAME 🎬</button>
	{#if $spy}
		<button on:click={() => ($spy = false)}>BOARD 📝</button>
	{:else}
		<button on:click={() => ($spy = true)}>SPY 🕵️</button>
	{/if}
</footer>
