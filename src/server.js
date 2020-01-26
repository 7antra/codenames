import http from "http";
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express()

app.disable('x-powered-by')

app.use(
	bodyParser.urlencoded({
		extended: true
	}),
	bodyParser.json(),
	cookieParser()
)

if (NODE_ENV === 'production') {
	app.use(compression())
	app.use(cors())
	app.set('trust proxy', 1) // trust first proxy
}

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
	next()
})

  // static folder
app.use(express.static('static'))


app.use(
	sapper.middleware({
	  //inject store ?
	})
  )


  let server = http.createServer(app)

server.listen(PORT, err => {
  if (err) {
    console.error('Http server error', err)
  }
})
