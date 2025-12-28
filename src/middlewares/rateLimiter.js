import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max:100,
    skip:(req)=> req.method ==="OPTIONS"

})

export default limiter;