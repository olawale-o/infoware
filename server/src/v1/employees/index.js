const router = require('express').Router();
const handler = require('./handler');
const validate = require('../../common/middlewares/validate');
const { employeeRequest } = require('./validation');

router.get('/', handler.index);
router.get('/:id', handler.show);
router.post('/', validate(employeeRequest), handler.new);
router.put('/:id', validate(employeeRequest), handler.update);
router.delete('/:id', handler.delete);


module.exports = router;
