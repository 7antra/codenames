<script>
	import { onMount, createEventDispatcher } from "svelte";
	import { fly } from "svelte/transition";
	import { codeName, spy, loading } from "../codeStore";
	const dispatch = createEventDispatcher();
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	export let i;

	let timer;
	let touched = false;

	const progress = tweened(0, {
		duration: 1100,
		easing: cubicOut,
	});

	function touch(e) {
		touched = true;
		progress.set(1);
		$loading = true;
		timer = setTimeout(() => {
			touched = false;
			dispatch("retourner", i);
			$loading = false;
		}, 1000);
	}

	function rotate(n) {
		dispatch("rotate", { i, n });
	}

	function unTouch(e) {
		clearTimeout(timer);
		progress.set(0);
		touched = false;
		$loading = false;
	}

	$: console.log("timer : ", timer);
</script>

<style lang="scss">
	@import "../style/_var";

	div {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 3px solid black;
		transition: all 1s;
		background-color: white;

		p {
			text-transform: uppercase;
			letter-spacing: 0.3rem;
			font-size: 1rem;
			font-weight: bold;
		}
		.fleche {
			margin-left: 2px;
			transition: all 0.4s;
			user-select: none;
			opacity: 0;

			&:focus {
				opacity: 1;
			}
		}

		&:hover {
			cursor: pointer;

			.fleche {
				opacity: 0.3;
			}
		}

		&.touched {
			transition: all 0s;
		}
	}

	.red {
		border: 3px solid $red;
		background-color: $red;

		.spy {
			color: white;
		}
	}
	.blue {
		border: 3px solid $blue;
		background-color: $blue;

		.spy {
			color: white;
		}
	}
	.black {
		border: 3px solid black;
		background-color: rgb(53, 53, 53);

		.spy {
			color: white;
		}
	}
	.white {
		border: 3px solid grey;
		background-color: rgba(168, 168, 168, 0.582);

		.spy {
			color: black;
		}
	}

	.red,
	.blue,
	.white,
	.black {
		p {
			color: transparent;
			transition: all 0.3s;
			&.useless {
				opacity: 0.1;
			}
		}
	}
</style>

<div
	in:fly={{ x: -200, delay: 100 * i }}
	class:touched
	class={$codeName[i].decouvert || $spy ? $codeName[i].color : ''}
	on:mousedown={touch}
	on:touchstart={touch}
	on:touchend={unTouch}
	on:mouseup={unTouch}
	style="transform: rotate({$codeName[i].rotate}deg);">
	<p class="fleche" on:click={() => rotate(-1)}>↶</p>
	<p class={$spy ? 'spy' : ''} class:useless={$codeName[i].decouvert && $spy}>
		{$codeName[i].mot}
	</p>
	<p class="fleche" on:click={() => rotate(1)}>↷</p>

</div>
