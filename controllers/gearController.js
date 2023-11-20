// controllers/gearController.js
const Gear = require('../models/gear');

// Display list of all gear items.
exports.gear_list = function (req, res) {
  Gear.find({}, (err, gearList) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
      return;
    }
    res.render('index', { title: 'Gear List', gearList });
  });
};

// Display detail page for a specific gear item.
exports.gear_detail = function (req, res) {
  Gear.findById(req.params.id, (err, gear) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
      return;
    }
    res.render('show', { title: 'Gear Detail', gear });
  });
};

// Display gear create form on GET.
exports.gear_create_get = function (req, res) {
  res.render('new', { title: 'Create Gear' });
};

// Handle gear create on POST.
exports.gear_create_post = function (req, res) {
  const gear = new Gear({
    name: req.body.name,
    category: req.body.category,
  });

  gear.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
      return;
    }
    res.redirect('/');
  });
};
