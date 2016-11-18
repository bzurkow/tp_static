const Sequelize = require('sequelize');
var db = require('../db')

var Activity = db.define('activity', {
	name: {
		type: Sequelize.STRING
	},
	age_range: {
		type: Sequelize.STRING
	},
});


module.exports = Activity;
