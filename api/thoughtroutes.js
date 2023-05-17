const router = require('express').Router();
const {
  createThought,
  updateThought,
  getThoughtbyId,
  getAllThought,
  addReaction,
  deleteReaction,

} = require('../controllers/thoughtscontrollers.js');

// /api/thoughts
router.route('/').get(getAllThought).post(createThought);

// router.route('/:id').get(getThoughtbyId).post(addReaction);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtbyId)
  .put(updateThought)
  // .delete(deleteReaction);

module.exports = router;