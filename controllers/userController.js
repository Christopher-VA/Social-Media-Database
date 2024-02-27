const { user, thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const userDatas = await user.find();
            res.json(userDatas);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const userData = await user.findOne({ _id: req.params.userId });
      
            if (!userData) {
              return res.status(404).json({ message: 'No user with that ID' });
            }
      
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async postUser(req, res) {
        try {
            const userData = await user.create(req.body);
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async putUser(req, res) {
        try {
            const userData = await user.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            )

            if (!userData) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const userData = await user.findOneAndDelete({ _id: req.params.userId });
      
            if (!userData) {
              return res.status(404).json({ message: 'No user with that ID' });
            }
      
            await thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async putFriend(req, res) {
        try {
            const userData = await user.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body.friendId || req.params.friendId } },
                { new: true }
            )

            if (!userData) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const userData = await user.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            )

            if (!userData) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            const removed = !userData.friends.includes(params.friendId);

            if (removed) {
                res.json({ message: 'Removed friend!', userData});
            } else {
                res.json(userData);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}
