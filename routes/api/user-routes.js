const router = require("express").Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require("../../controllers/user-controller");

// set up get all and POST at api/users
router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

// get one, put, and delete :id
router
    .route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router 
    .route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router; 