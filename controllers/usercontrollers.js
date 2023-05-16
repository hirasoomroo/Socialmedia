const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getusers(req, res) {
      try {
        const users = await User.find();
        res.json(users)
      } 
      catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single user
    async getSingleUser(req, res) {
      try {
        const user = await user.findOne({ _id: req.params.userId })
          .select('-__v');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' })
        }
  
        res.json({
          user,
          Thought: await Thought(req.params.userId),
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // create a new user
    async createuser(req, res) {
      try {
        const user = await user.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Delete a user and remove them from the thought
    async deleteuser(req, res) {
      try {
        const user = await user.findOneAndRemove({ _id: req.params.userId });
  
        if (!user) {
          return res.status(404).json({ message: 'No such user exists' });
        }
  
        const thought = await thought.findOneAndUpdate(
          { users: req.params.userId },
          { $pull: { users: req.params.userId } },
          { new: true }
        );
  
        if (!thought) {
          return res.status(404).json({
            message: 'user deleted, but no thoughts found',
          });
        }
  
        res.json({ message: 'user successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },


};

