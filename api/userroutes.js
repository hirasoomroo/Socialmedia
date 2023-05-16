const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/usercontrollers');

// -- Directs to: /api/users <GET, POST>
router.route('/').get(getAllUsers).post(createUsers);

// -- Directs to: /api/users/:id <GET, PUT, DELETE>
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// -- Directs users to <POST, DELETE>
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

// Module export router
module.exports = router; 

