// controllers/gearController.js
const Gear = require("../models/gear");

// Method to render the home page
exports.home_page = async function (req, res) {
  try {
    const gearList = await Gear.find({}).exec();
    res.render("index", { title: "Gear List", gearList });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Display list of all gear items.
exports.gear_list = function (req, res) {
  Gear.find({})
    .exec()
    .then((gearList) => {
      res.render("index", { title: "Gear List", gearList });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server Error");
    });
};

// Display detail page for a specific gear item.
exports.gear_detail = function (req, res) {
  Gear.findById(req.params.id, (err, gear) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server Error");
      return;
    }
    res.render("show", { title: "Gear Detail", gear });
  });
};

// Display gear create form on GET.
exports.gear_create_get = function (req, res) {
  res.render("new", { title: "Create Gear" });
};

// Handle gear create on POST.
exports.gear_create_post = async function (req, res) {
  try {
    const gear = new Gear({
      name: req.body.name,
      category: req.body.category,
    });

    await gear.save();

    res.redirect("/gear");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Method for the gear list page
exports.gear_list_page = async function (req, res) {
  try {
    const categories = await Gear.distinct("category").exec();
    const gearList = await Gear.find({}).exec();
    res.render("gear_list", { title: "Gear List", categories, gearList });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Display list of gear items by category.
exports.gear_list_by_category = function (req, res) {
  const category = req.params.category; // Get the category parameter from the URL

  // Query the database to find gear items with the specified category
  Gear.find({ category: category })
    .exec()
    .then((gearList) => {
      res.render("category", { title: `${category} Gear List`, gearList });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server Error");
    });
};

// Method to delete a gear list
exports.gear_delete = async function (req, res) {
  try {
    const gearId = req.params.id;
    await Gear.findByIdAndDelete(gearId).exec();
    res.redirect("/gear");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
