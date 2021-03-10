const express = require('express');
const router = express.Router();
const lists = require('./lists')
const tasks = require('./tasks')
const comments = require('./comments')



router.use('/lists', lists)
router.use('/tasks', tasks)
router.use('/comments', comments)

module.exports = router;
