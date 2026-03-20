const View = require('../models/View');

class ViewsService {
    async getTotalViews() {
        // We only need a single document to track the total views site-wide
        const viewDoc = await View.findOne();
        if (!viewDoc) {
            return 0; // If no doc exists yet
        }
        return viewDoc.count;
    }

    async incrementViews() {
        // Atomically find the first document and increment by 1
        // Using findOneAndUpdate to ensure atomic operation and prevent race conditions
        // If no document exists (first view), upsert will create one with count 1
        const viewDoc = await View.findOneAndUpdate(
            {},
            { $inc: { count: 1 } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return viewDoc.count;
    }
}

module.exports = new ViewsService();
