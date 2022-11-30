const router = require('express').Router();
const reviewController = require('./../controllers/review.controller');
const rev_cont = new reviewController();

// CRUD operation
router.route('/').get(rev_cont.getAllReviews).post(rev_cont.createReview);

router.route('/:id').get().patch().delete();

module.exports = router;
