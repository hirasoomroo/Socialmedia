const router = require('express').Router();
const {
  CreateThought,
  updateThought,
  getThoughtbyId,
  getallThoughts,
  addReaction,

  deleteReaction,

} = require('../../controllers/thoughtsController.js');

// /api/thoughts
router.route('/').get(getThoughtbyId).post(CreateThought);
router.route('/').get(getThoughtbyId).post(addReaction);

// /api/thoughts/:courseId
router
  .route('/:thoughtId')
  .get(getallThoughts)
  .put(updateThought)
  .delete(deleteReaction);

module.exports = router;