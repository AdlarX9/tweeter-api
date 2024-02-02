const express = require('express');
const router = express.Router();

const crudCtrl = require('../controllers/crud');
const auth = require('../middlewares/auth');

router.get('/tweets', crudCtrl.getTweet);
router.post('/tweet', auth, crudCtrl.postTweet);
router.delete('/tweet/:id', auth, crudCtrl.deleteTweet);

module.exports = router;