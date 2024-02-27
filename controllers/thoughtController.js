const { thought } = require('../models');

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await thought.find({});
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thoughtData = await thought.findOne({_id:req.params.thoughtId});
      if (!thoughtData) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thoughtData);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async postThought(req, res) {
    try {
      const thoughtData = await thought.create(req.body);
      res.status(201).json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async putThoughtById(req, res) {
    try {
      const thoughtData = await thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
      });
      if (!thoughtData) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thoughtData);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req,res) {
    try {
        const thoughtData = await thought.findByIdAndDelete({_id:req.params.thoughtId});
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
  },

  async postReaction(req, res) {
      try {
        const thoughtData = await thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        );
        thoughtData ? res.json(thoughtData) : res.status(404).json({message: notFound});
    } catch (e) {
        res.status(500).json(e);
    }
  },

  async deleteReaction(req, res) {
      try {
        const thoughtData = await thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        );

        thoughtData ? res.json(thoughtData) : res.status(404).json({message: notFound});
    } catch (e) {
        res.status(500).json(e);
    }
  },

};