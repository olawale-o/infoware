const router = require('express').Router();
const handler = require('./handler');

router.get('/', handler.index);
router.get('/:id', handler.show);
router.post('/', handler.new);
router.put('/:id', handler.update);
router.delete('/:id', handler.delete);


module.exports = router;
