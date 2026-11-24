const router = require('express').Router();

router.get('/', async (req, res) => {
    res.json("Hello API");
});

router.use('/auth', require('./auth'));

module.exports = router;