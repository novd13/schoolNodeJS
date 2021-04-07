import { pbkdf2 } from 'crypto';
import redis from 'redis';
import { promisify } from 'util';

const redisClient = redis.createClient({ host: "redis" });
const dbHset = promisify(redisClient.hset).bind(redisClient);
const dbHgetall = promisify(redisClient.hgetall).bind(redisClient);
const pbdfk2 = promisify(crypto.pbkdf2);
const randomBytes = promisify(crypto.randomBytes);

redisClient.hset("prokop", "name", "Prokop", "surname", "Dveře", "heslo", "ups", (err, numOfChanged) => {
    console.log("no. of changes: " + numOfChanged);
});

redisClient.hgetall("prokop", (err, dataObj) => {
    console.log(dataObj);
})

dbHset('tomas', 'surname', 'Jedno').then(() => { return dbHgetall('tomas') }).then(console.log);

if (!req.headers.authorization) {
    res.setHeader('WWW-Authenticate', 'Basic');
    res.statusCode = 401;
    res.end();
    return null
}
console.log(req.headers.authorization);

const authHeader = req.headers.authorization.split(' ');
if (authHeaderl[0] != 'Basic') {
    res.status = 403;
    res.end();
    console.log('Forbidden!');
    return
}
const [username, password] = Buffer.from(authHeader[1], 'base64').toString().split(':');
console.log(username);
console.log(password);

let user = await dbHgetall(username);
if (!user || !user.password) {
    const salt = ( await randomBytes(64)).toString('base64');
    const securedPassword = (await pbkdf2(password, salt, 10000, 64,'sha512')).toString('base64');
    await dbHset(username, "password", securedPassword, "salt", salt);
    console.log('Password set!');
    user = await dbHgetall(username);
}
else if (user.password != (await pbkdf2(password, user.salt, 10000, 64,'sha512')).toString('base64')) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basicb');
    res.end();
    console.log("Password doesn't match!");
    return null;
}
console.log('Authorized ' + username);
return user;
export { authorized, dbHgetall, dbHset }