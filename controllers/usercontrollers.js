import { User, Thought } from '../models';

const userController = {
  // creating A new user 
  newUser({ body }, res) {
    User.new(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  // GET all users
  getAllUsers(res) {
    User.find({})
      .select('-__v')
      .sort({ _id: -1 })

      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //finding a user by id
  getUserById({ params }, res) {

    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No  user found!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //update user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id },
      body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  //delete a user
  deleteUser({ params }, res) {
    Thought.deleteMany({ userId: params.id })
      .then(() => {
        User.findOneAndDelete({ _id: params.id })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
      })
  },
  //add friend on social
  addFriend({ params }, res) {
    User.findOneAndAdd
      ({ _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found!' })
          return;

        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err))
  },

  // delete a friend on social
  deleteFriend({ params }, res) {
    User.findOneAndremove({ _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found.' })
          return;

        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err))
  },
};
export default userController;
