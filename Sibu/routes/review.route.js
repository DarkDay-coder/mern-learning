const router = require('express').Router();
const reviewController = require('./../controllers/review.controller');
const rev_cont = new reviewController();

// CRUD operation
router.route('/').get(rev_cont.getAllReviews).post();

router.route('/:id').get().patch().delete();

module.exports = router;
