<script>
	import { onMount } from "svelte";
	import { draw } from "svelte/transition";
	import { humanity, infected } from "../store";
	let h = 0;
	let w = 0;
	let tick = 0;
	let charts = [{ x1: 2, y1: 300, x2: 2, y2: 0 }];
	let numPeople = 100;

	onMount(() => {
		let population = [];
		// generate human
		for (let i = 0; i < numPeople; i++) {
			let newHuman = {
				id: Math.random(),
				cx: ~~(Math.random() * w),
				cy: ~~(Math.random() * h),
				vx: Math.random() + 1,
				vy: Math.random() + 1,
				sick: false,
				recovered: false,
				moving: true,
				ticked: 0,
			};

			if (i === 0) {
				newHuman.sick = true;
			}

			population.push(newHuman);
		}

		humanity.setPopulation(population);
	});

	setInterval(() => {
		tick++;
		deplacement();
		drawChart(tick);
	}, 25);

	function deplacement() {
		$humanity.forEach(human => {
			human.cx += human.vx;
			human.cy += human.vy;

			if (human.cx > w - 5 || human.cx < 5) {
				human.vx *= -1;
			}

			if (human.cy > h - 5 || human.cy < 5) {
				human.vy *= -1;
			}

			checkCollision(human);
		});
	}

	//collision :
	function checkCollision(human) {
		$humanity.forEach(other => {
			if (other.id !== human.id) {
				if (
					human.cx > other.cx - 10 &&
					human.cx < other.cx + 10 &&
					human.cy > other.cy - 10 &&
					human.cy < other.cy + 10
				) {
					if (human.sick) {
						other.sick = true;
						other.ticked = other.ticked === 0 ? tick : other.ticked;
					}

					if (other.sick) {
						human.sick = true;
						human.ticked = human.ticked === 0 ? tick : human.ticked;
					}
				}
			}

			humanity.edit(other);
			humanity.edit(human);
		});
	}

	function drawChart(tick) {
		const unite = h / numPeople;

		let newLine = {
			x1: tick,
			y2: h - unite * $infected,
			x2: tick,
			y1: h,
		};

		charts = [...charts, newLine];
	}
</script>

<style lang="scss">
	#canva {
		position: fixed;
		top: 0;
		left: 0;
		background-color: grey;
		width: 100vw;
		height: 100vh;

		svg {
			width: 100%;
			height: 100vh;

			circle {
				fill: white;
			}

			.sick {
				fill: red;
			}

			line {
				stroke: rgba(187, 187, 187, 0.582);
				stroke-width: 1px;
			}
		}

		#info {
			position: fixed;
			top: 10%;
			left: 10%;
			color: white;
		}
	}
</style>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />

<div id="canva">
	<svg>
		{#each charts as result}
			<line
				in:draw={{ duration: 500 }}
				x1={result.x1}
				x2={result.x2}
				y1={result.y1}
				y2={result.y2} />
		{/each}
		{#each $humanity as human}
			<circle cx={human.cx} cy={human.cy} r="5" class:sick={human.sick} />
		{/each}

	</svg>

	<div id="info">
		<p>infecté(s): {$infected}</p>
		<p>sain(s): {numPeople - $infected}</p>
	</div>
</div>
