const express = require('express');
const AssociationController = require('../controllers/AssociationController');
const router = express.Router();

router.post('/', AssociationController.associate);
router.get('/:productId', AssociationController.getByProduct);
router.delete('/:id', AssociationController.removeAssociation);

module.exports = router;
