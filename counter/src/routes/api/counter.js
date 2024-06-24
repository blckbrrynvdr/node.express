const router = require('express').Router();
const redisClient = require('../../store/redis');

router.post('/:bookId/incr', async (req, res) => {
    const {bookId} = req.params;

    try {
        const cnt = await redisClient.incr(bookId);
        res.status(201);
        res.json({bookId: bookId, views: cnt});
    } catch (e) {
        res.status(500);
        res.json({error: e, id: bookId});
    }
});

router.get('/:bookId', async (req, res) => {
    const {bookId} = req.params;

    try {
        const cnt = await redisClient.get(bookId);
        res.status(201);
        res.json({bookId: bookId, views: cnt});
    } catch (e) {
        res.status(500);
        res.json({error: e, id: bookId});
    }
});

module.exports = router;