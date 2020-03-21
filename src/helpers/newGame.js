import { dico } from "./dico";

const newGame = () => {
	
	//prettier-ignore
	let colors = ['red','red','red','red','red','red','red','red','blue','blue','blue','blue','blue','blue','blue','blue','white','white','white','white','white','white','white','black']

	let arr = [];
	let mots = [];
	let start;
	let plateau = [];

	if (Math.random() > 0.5) {
		colors.push("red");
		start = "red";
	} else {
		colors.push("blue");
		start = "blue";
	}

	arr = colors.sort((a, b) => 0.5 - Math.random());
	mots = dico.sort((a, b) => 0.5 - Math.random());

	for (let i = 0; i < colors.length; i++) {
		plateau.push({
			mot: mots[i],
			color: colors[i],
			decouvert: false,
		});
	}

	return { plateau, start }

}

export {newGame}