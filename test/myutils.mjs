import redis from 'redis';
import { promisify } from 'util';

const redisClient = redis.createClient({host: "redis"});
const dbHset = promisify(redisClient.hset).bind(redisClient);
const dbHgetall = promisify(redisClient.hgetall).bind(redisClient);