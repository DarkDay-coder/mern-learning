const router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');
const auth_mid = new authMiddleware();
const reviewController = require('./../controllers/review.controller');
const rev_cont = new reviewController();

// CRUD operation
router
   .route('/')
   .get(rev_cont.getAllReviews)
   .post(
      auth_mid.authorize,
      auth_mid.restrictTo('user'),
      rev_cont.createReview
   );

router.route('/:id').get().patch().delete();

module.exports = router;
