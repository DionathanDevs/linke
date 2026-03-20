const rateLimit = require('express-rate-limit');

const viewRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 1, // Limit each IP to 1 request per `windowMs`
    message: {
        message: 'Too many requests from this IP, please try again after an hour.'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { viewRateLimiter };
