<script context="module">
	export async function preload({ params }) {
		const slug = params.id;

		const resp = await this.fetch(`/api/` + slug);
		const data = await resp.json();
		if (resp.status === 500) {
			this.redirect("/");
		}
	}
</script>

<script>
	import { onMount } from "svelte";
	import { goto } from "@sapper/app";
	import Carte from "../../components/Carte.svelte";
	import Footer from "../../components/Footer.svelte";
	import { codeName, numUsers, starter, id } from "../../codeStore";
	import io from "socket.io-client";
	let socket;
	let decouvrir;

	onMount(() => {
		socket = io();

		socket.emit("user connect");

		socket.on("user joined", data => {
			$numUsers = data.numUsers;
			codeName.setStore(data.game.plateau);
			$starter = data.game.start;
		});

		socket.on("new id", async uid => {
			console.log("id : ", uid);
			$id = uid;
			await goto(`/games/${$id}`);
		});

		socket.on("load game", loadGame => {
			console.log("loadGame : ", loadGame);
			$starter = loadGame.start;
			codeName.setStore(loadGame.plateau);
		});

		socket.on("deco", i => {
			console.log("i dec: ", i);
			let carte = $codeName[i];
			carte.decouvert = true;
			codeName.edit(carte, i);
		});

		socket.on("user left", data => {
			$numUsers = data;
		});

		decouvrir = i => {
			let obj = { i: i.detail, id: $id };
			socket.emit("retourner", obj);
		};
	});
</script>

<style lang="scss">
	@import "../style/_var";

	article {
		width: 100%;
		height: 95vh;
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
			<Carte {i} on:retourner={decouvrir} />
		{/each}
	</div>
</article>

<Footer on:new={socket.emit('new game')} />
