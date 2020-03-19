import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import http from 'http';
import io from 'socket.io';
import { dico } from "./helpers/dico";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const server = http.createServer();

polka({ server }) // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

// GAME STUF
let numUsers = 0;
let game = [];

const newGame = () => {
	//prettier-ignore
	let colors = ['red','red','red','red','red','red','red','red','blue','blue','blue','blue','blue','blue','blue','blue','white','white','white','white','white','white','white','black']

	let arr = [];
	let mots = [];
	let commence;
	let newgame = [];

	if (Math.random() > 0.5) {
		colors.push("red");
		commence = "red";
	} else {
		colors.push("blue");
		commence = "blue";
	}

	arr = colors.sort((a, b) => 0.5 - Math.random());
	mots = dico.sort((a, b) => 0.5 - Math.random());

	for (let i = 0; i < colors.length; i++) {
		newgame.push({
			mot: mots[i],
			color: colors[i],
			decouvert: false,
		});
	}

	game = {
		plateau : newgame,
		start: commence 
	}

}


if(numUsers >= 0) {
	numUsers = 0;
	newGame();
	console.log('game : ', game)
}

// SOCKET STUF
io(server).on('connection', function(socket) {
	numUsers++;
	socket.emit('user joined', { game, numUsers });
	socket.broadcast.emit('user joined', { game, numUsers });

	socket.on('user disconnect', function(name) {
		socket.broadcast.emit('message', `Server: ${name} has left the chat.`)
	})
	
	socket.on('user connect', () => {
		let message = `Server: un nouveau confiné s'est connecté`;
		console.log(' : new user' )
		socket.broadcast.emit('user joined', { game, numUsers });
	})

	socket.on('message', function(msg) {
		socket.broadcast.emit('message', msg);
	})

	//new game
	socket.on('new game', () => {
		newGame();
		socket.broadcast.emit('load game', game);
	})
	
	//retourner une carte
	socket.on('retourner', function(i) {
		socket.broadcast.emit('deco', i);
		socket.emit('deco', i);
	})

	socket.on('disconnect', function() {
		numUsers--;
		socket.emit('user left', numUsers );
		socket.broadcast.emit('user left', numUsers);
	})

	
});
