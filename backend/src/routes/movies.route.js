const router = require("express").Router();
const {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controller");

router.route('/').get(getAllMovies).post(createMovie);
router.route('/:id').patch(updateMovie).delete(deleteMovie);

module.exports = router;