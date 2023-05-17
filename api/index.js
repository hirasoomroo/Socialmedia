const router = require('express').Router();

const thoughtroutes = require ("./thoughtroutes")

const userroutes = require ("./userroutes")

router.use("/api/users", userroutes);
router.use("/api/thoughts", thoughtroutes);

module.exports = router;