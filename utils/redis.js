import Redis from "redis";

class RedisClient {
  constructor() {
    this.client = Redis.createClient();

    // Error handling
    this.client.on("error", (err) => {
      console.error("Redis connection error:", err);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          console.error("Error while getting from Redis:", err);
          reject(err);
        } else {
          resolve(reply ? JSON.parse(reply) : null);
        }
      });
    });
  }

  async set(key, value, durationSeconds) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, durationSeconds, JSON.stringify(value), (err) => {
        if (err) {
          console.error("Error while setting in Redis:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          console.error("Error while deleting from Redis:", err);
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
