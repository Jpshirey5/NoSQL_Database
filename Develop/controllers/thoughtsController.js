const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },


  getSingleThought(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) =>
        thought ? res.json(thought) : res.status(404).json({ message: 'No thought with that ID' })
      )
      .catch((err) => res.status(500).json(err));
  },


  createThought(req, res) {
    const { userId, ...thoughtData } = req.body;
    Thought.create(thoughtData)
      .then((thought) =>
        User.findByIdAndUpdate(userId, { $addToSet: { thoughts: thought._id } }, { new: true })
      )
      .then((user) =>
        user
          ? res.json('Created the thought 🎉')
          : res.status(404).json({ message: 'Thought created, but no user with that ID' })
      )
      .catch((err) => res.status(500).json(err));
  },


  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { runValidators: true, new: true })
      .then((thought) =>
        thought
          ? res.json(thought)
          : res.status(404).json({ message: 'No thought with this ID' })
      )
      .catch((err) => res.status(500).json(err));
  },


  deleteThought(req, res) {
    Thought.findByIdAndRemove(req.params.thoughtId)
      .then((thought) =>
        thought
          ? User.findByIdAndUpdate(
              { thoughts: thought._id },
              { $pull: { thoughts: thought._id } },
              { new: true }
            )
          : res.status(404).json({ message: 'No thought with this ID' })
      )
      .then((user) =>
        user
          ? res.json({ message: 'Thought successfully deleted!' })
          : res.status(404).json({ message: 'Thought created, but no user with this ID' })
      )
      .catch((err) => res.status(500).json(err));
  },


  createReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        thought
          ? res.json(thought)
          : res.status(404).json({ message: 'No thought with this ID' })
      )
      .catch((err) => res.status(500).json(err));
  },

  
  removeReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        thought
          ? res.json(thought)
          : res.status(404).json({ message: 'No thought with this ID' })
      )
      .catch((err) => res.status(500).json(err));
  },
};
