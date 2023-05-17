const router = require('express').Router();
const {
  getAllUsers,
  newUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../controllers/usercontrollers');

//  <GET, POST>
router.route('/').get(getAllUsers).post(newUser);

// -- <GET, PUT, DELETE>
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// <POST, DELETE>
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

// Module export router
module.exports = router; 

