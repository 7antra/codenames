const redis = require('redis');
const redisClient = redis.createClient();

// REDIS
redisClient.on('connect', () => {
	console.log(' Redis connected ');
})

redisClient.on('error', err => {
    console.log('Something went wrong ' + err);
})


export function get(req, res, next) {
    const {id} = req.params;

    redisClient.get(id, async (error, result) => {
        if (error) {
            console.log(error);
            res.status(403)
        } else {
            if(result) {
                res.end(result)
            } else {
                res.end(404)
            }
        }
    });
    
}