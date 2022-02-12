const router = require("express").Router();
const { getAllThoughts, getThoughtById, addThought, updateThought, removeThought } = require("../../controllers/thought-controller");

module.exports = router;