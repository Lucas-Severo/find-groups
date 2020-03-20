const express = require('express');
const router = express.Router();

const GroupController = require('./controllers/GroupController');

router.get('/group', GroupController.index);
router.post("/group", GroupController.store);
router.put("/group/:id", GroupController.update);
router.delete("/group/:id", GroupController.delete);

module.exports = router;