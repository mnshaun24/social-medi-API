const router = require("express").Router();
const { getAllThoughts, getThoughtById, addThought, updateThought, removeThought, createReaction, removeReaction } = require("../../controllers/thought-controller");

// default add thought route
router
    .route("/")
    .get(getAllThoughts);

router
    .route("/:userId")
    .post(addThought);
    
router
    .route("/:thoughtId")
    .put(updateThought)
    .get(getThoughtById)
    .delete(removeThought);

// api/thoughts/userId/thoughtId
router
    .route("/:thoughtId/reactions")
    .post(createReaction);

router
    .route("/:thoughtId/reactions/:reactionId")
    .delete(removeReaction);


module.exports = router;