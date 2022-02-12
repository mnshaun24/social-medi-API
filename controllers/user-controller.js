const { User } = require("../models");

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // get one user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: "thoughts"
            })
            .populate({
                path: "friends"
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // update user by Id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No such user found!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: params.friendId } },
          { new: true, runValidators: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

      deleteFriend({ params }, res) {
          User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: {friends: { friendsId: params.friendsId } } },
              { new: true }
          )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
      }
};

module.exports = userController;