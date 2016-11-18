const router = require('express').Router();
const db = require('../models');
const Hotel = db.model('hotel');
const Restaurant = db.model('restaurant');
const Activity = db.model('activity');



router.get('/', (req, res, next) => {
	var outerScopeContainer = {};
	Hotel.findAll()
	.then(function (dbHotels) {
	  outerScopeContainer.dbHotels = dbHotels;
	  return Restaurant.findAll();
	})
	.then(function (dbRestaurants) {
	  outerScopeContainer.dbRestaurants = dbRestaurants;
	  return Activity.findAll();
	})
	.then(function (dbActivities) {
	  res.render('index', {
	    templateHotels: outerScopeContainer.dbHotels,
	    templateRestaurants: outerScopeContainer.dbRestaurants,
	    templateActivities: dbActivities
	  });
	})
	.catch(next);
});

module.exports = router;
