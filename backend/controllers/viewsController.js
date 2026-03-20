const viewsService = require('../services/viewsService');

// @desc    Get total views count
// @route   GET /api/views
// @access  Public
const getViews = async (req, res, next) => {
    try {
        const count = await viewsService.getTotalViews();
        res.status(200).json({ count });
    } catch (error) {
        next(error);
    }
};

// @desc    Increment views count
// @route   POST /api/views
// @access  Public (Rate Limited)
const incrementViews = async (req, res, next) => {
    try {
        const count = await viewsService.incrementViews();
        res.status(200).json({ count });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getViews,
    incrementViews
};
