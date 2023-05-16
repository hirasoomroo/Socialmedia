const { Thought, User } = require('../models');

const Thought = {
    // Get all thoughts
    async getThought(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Get a single thought
    async getSinglethought(req, res) {
      try {
        const thought = await thought.findOne({ _id: req.params.thoughtId })
          .select('-__v');
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },

// add thought to User

async addThoughts(req, res) {
    console.log('You are adding a new thought!');
    console.log(req.body);

    try {
      const User = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thought: req.body } },
        { runValidators: true, new: true }
      );

      if (!User) {
        return res
          .status(404)
          .json({ message: 'No User found with that ID :(' });
      }

      res.json(User);
    } catch (err) {
      res.status(500).json(err);
    }
  },

 //delete thought
 removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedthought => {
            if (!deletedthought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
                { _id: params.username },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
},

};