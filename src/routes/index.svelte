<script>
	import { onMount } from "svelte";
	import { dico } from "../helpers/dico";
	import Carte from "../components/Carte.svelte";
	import Footer from "../components/Footer.svelte";
	import { codeName, numUsers, starter } from "../codeStore";
	import io from "socket.io-client";
	let socket;
	let decouvrir;
	let rotate;

	onMount(() => {
		socket = io();

		socket.emit("user connect");

		socket.on("user joined", data => {
			$numUsers = data.numUsers;
			codeName.setStore(data.game.plateau);
			$starter = data.game.start;
		});

		socket.on("load game", loadGame => {
			console.log("loadGame : ", loadGame);
			$starter = loadGame.start;
			codeName.setStore(loadGame.plateau);
		});

		socket.on("deco", i => {
			let carte = $codeName[i];
			carte.decouvert = true;
			codeName.edit(carte, i);
		});

		socket.on("alignement", game => {
			codeName.setStore(game.plateau);
		});

		socket.on("user left", data => {
			$numUsers = data;
		});

		socket.on("rotate", data => {
			console.log("data : ", data);
			let carte = $codeName[data.i];
			carte.rotate = Math.floor(carte.rotate + data.n);
			codeName.edit(carte, data.i);
		});

		decouvrir = i => {
			socket.emit("retourner", i.detail);
		};

		rotate = i => {
			socket.emit("rotate", i.detail);
		};
	});
</script>

<style lang="scss">
	@import "../style/_var";

	article {
		width: 100%;
		height: 92.5vh;
		display: flex;
		justify-content: center;
		align-items: center;

		.red {
			border: 5px solid $red;
		}

		.blue {
			border: 5px solid $blue;
		}

		#box {
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			grid-gap: 10px;
			width: 100%;
			height: 100%;
			padding: 10px;
			border-bottom: none;
		}
	}
</style>

<svelte:window on:unload={socket.emit('disconnect')} />

<svelte:head>
	<title>CodeNames</title>
	<meta name="description" content="TODO" />
	<!-- Facebook -->
	<meta property="og:title" content="CodeNames" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://www.TODO.com/" />
	<meta property="og:image" content="https://www.TODO.com/og/test.jpg" />
</svelte:head>

<article>
	<div id="box" class={$starter}>
		{#each $codeName as arr, i (arr.mot)}
			<Carte {i} on:retourner={decouvrir} on:rotate={rotate} />
		{/each}
	</div>
</article>

<Footer on:new={socket.emit('new game')} on:aligner={socket.emit('aligner')} />
