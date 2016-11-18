const router = require('express').Router();

router.get("/", (req, res, next) => {
	res.send("A Big Cow")
})

module.exports = router;
