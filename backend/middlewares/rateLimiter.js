const rateLimit = require('express-rate-limit');

const viewRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Bloqueio dura 15 minutos (melhor para testar do que 1 hora)
    max: 1, // Limita a 1 visualização real por IP a cada 15 min
    message: {
        message: 'Too many requests from this IP, please try again after an hour.'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { viewRateLimiter };
