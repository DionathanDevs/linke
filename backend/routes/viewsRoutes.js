const express = require('express');
const router = express.Router();
const { getViews, incrementViews } = require('../controllers/viewsController');
const { viewRateLimiter } = require('../middlewares/rateLimiter');

router.route('/')
    .get(getViews)
    .post(viewRateLimiter, incrementViews);

module.exports = router;
