const express = require('express');
const router = express.Router();

const GroupController = require('./controllers/GroupController');
const PersonController = require('./controllers/PersonController');
const authMiddleware = require('./middlewares/auth');


// routes that doesn't need authentication
router.post("/person/register", PersonController.store);
router.post("/person/authenticate", PersonController.authenticate);
router.post('/groups', GroupController.index);

// routes that need authentication
router.use(authMiddleware);

// Group
router.get('/group/:id', GroupController.show);
router.post("/group", GroupController.store);
router.put("/group/:id", GroupController.update);
router.delete("/group/:id", GroupController.delete);

// Person
router.get("/person", PersonController.index);
// show the groups that the person created
router.get("/person/groups", PersonController.show);


module.exports = router;