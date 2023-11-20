// routes/gear.js
const express = require('express');
const router = express.Router();
const gearController = require('../controllers/gearController');

// GET request for creating a gear item. This must come before routes that display gear item (uses id).
router.get('/gear/create', gearController.gear_create_get);

// POST request for creating gear item.
router.post('/gear/create', gearController.gear_create_post);

// GET request for one gear item.
router.get('/gear/:id', gearController.gear_detail);

// GET request for list of all gear items.
router.get('/gear', gearController.gear_list);

module.exports = router;

