import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit"; 

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(20, "60 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});


export default ratelimit;