import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import http from 'http';
import io from 'socket.io';

//helpers
import {newGame} from "./helpers/newGame";


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const server = http.createServer();

const redis = require('redis');
const redisClient = redis.createClient();


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


if(numUsers >= 0) {
	numUsers = 0;
	game = newGame();
	console.log('game : ', game)
}

// REDIS
redisClient.on('connect', () => {
	console.log(' Redis connected ');
})

redisClient.on('error', err => {
    console.log('Something went wrong ' + err);
})

// SOCKET STUF
io(server).on('connection', function(socket) {
	numUsers++;
	socket.emit('user joined', { game, numUsers });
	socket.broadcast.emit('user joined', { game, numUsers });
	
	socket.on('user connect', () => {
		let message = `Server: un nouveau confiné s'est connecté`;
		socket.broadcast.emit('user joined', { game, numUsers });
	})

	socket.on('message', function(msg) {
		socket.broadcast.emit('message', msg);
	})

	//new game
	socket.on('new game', () => {
		//create ID : 
		let id = 'pantoufle';
		socket.join(id);
		game = newGame();
		redisClient.set(id, JSON.stringify({id,game}))
		//socket.broadcast.emit('load game', game);
		socket.emit('new id', id);
	})
	
	//retourner une carte
	socket.on('retourner', data => {
		let edited = game;
		let id = data.id
		let i = data.i

		edited.plateau[i].decouvert = true;
		redisClient.set(id, JSON.stringify({id,edited}))

		socket.broadcast.emit('deco', i);
		socket.emit('deco', i);
	})

	socket.on('disconnect', function() {
		numUsers--;
		socket.emit('user left', numUsers );
		socket.broadcast.emit('user left', numUsers);
	})

	
});
