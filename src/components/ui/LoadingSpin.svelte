<style lang="scss">
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 5%;
	}
	.lds-ripple {
		display: inline-block;
		position: relative;
		width: 1%;
		height: 1%;
	}
	.lds-ripple div {
		position: absolute;
		border: 2px solid black;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}

	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
</style>

<div class="loading">
	<div class="lds-ripple">
		<div />
		<div />
	</div>
</div>
