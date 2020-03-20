const express = require('express');
const router = express.Router();

const GroupController = require('./controllers/GroupController');
const PersonController = require('./controllers/PersonController');

// Group
router.get('/group', GroupController.index);
router.post("/group", GroupController.store);
router.put("/group/:id", GroupController.update);
router.delete("/group/:id", GroupController.delete);

// Person
router.get("/person/groups", PersonController.index);
router.post("/person/register", PersonController.store);

module.exports = router;