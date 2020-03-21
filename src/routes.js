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
router.get("/person", PersonController.index);
// show the groups that the person created
router.get("/person/groups", PersonController.show);
router.post("/person/register", PersonController.store);

module.exports = router;