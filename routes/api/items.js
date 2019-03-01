const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// INDEX ROUTE
// @route GET /api/items
// @desc Get All items and display
router.get("/", (req, res) => {
	Item.find()
		// sort the items found in descending order by dates
		.sort({ date: -1 })
		// Take the items found and give us a json format of it
		.then(itemsFound => {
			res.json(itemsFound);
		});
});

// NEW ROUTE
// @route GET /api/items/new
// @desc Show a new item form for us to create
router.get("/new", (req, res) => {
	Item.find()
		// sort the items found in descending order by dates
		.sort({ date: -1 })

		.then(items => {
			res.json(items);
		});
});

// CREATE ROUTE
// @route POST /api/items
// @desc Get the form data and post it to the db(create)
router.post("/", (req, res) => {
	Item.create({ name: req.body.name }).then(itemCreated => {
		// Take the item created and post a json form of it
		res.json(itemCreated);
	});
});

// DELETE ROUTE
// @route DELETE /api/items/:id
// @desc Get the form data and post it to the db(create)
router.delete("/:id", (req, res) => {
	Item.findByIdAndDelete(req.params.id)
		.then(() => {
			res.json({ success: true });
		})
		.catch(err => {
			res.status(404).json({ success: false });
		});
});

module.exports = router;
