const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const cursoController = require('../controllers/courseController');


router.get('/', cursoController.index);
router.post('/', authMiddleware, cursoController.create);
router.delete('/:id', authMiddleware, cursoController.delete);
router.put('/:id', authMiddleware, cursoController.update);

module.exports = router;
