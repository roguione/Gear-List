// routes/gear.js
const express = require('express');
const router = express.Router();
const gearController = require('../controllers/gearController');

// Route to serve the home page
router.get('/', gearController.home_page);

// POST request to create a new gear item
router.post('/gear/create', gearController.gear_create_post);

// GET request for listing gear items by category
router.get('/gear/category/:category', gearController.gear_list_by_category);

// Route for deleting a gear list
router.delete('/gear/delete/:id', gearController.gear_delete);

// GET request for listing all gear items
router.get('/gear', gearController.gear_list);

module.exports = router;
