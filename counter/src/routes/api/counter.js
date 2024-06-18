const router = require('express').Router();
const redisClient = require('../../store/redis');

router.post('/:bookId/incr', async (req, res) => {
    const {id} = req.params;
        res.status(201);
        res.json({bookId: id});
    // try {
    //     const cnt = await redisClient.incr(id);
    //     res.status(201);
    //     res.json({bookId: id, views: cnt});
    // } catch (e) {
    //     res.status(500);
    //     res.json({error: e, id: id});
    // }
});

router.get('/:bookId', async (req, res) => {
    const {id} = req.params;
    try {
        const cnt = await redisClient.get(id);
        res.status(201);
        res.json({bookId: id, views: cnt});
    } catch (e) {
        res.status(500);
        res.json({error: e, id: id});
    }
});

module.exports = router;