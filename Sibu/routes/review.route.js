const router = require('express').Router({ mergeParams: true });
const authMiddleware = require('../middleware/auth.middleware');
const auth_middleware = new authMiddleware();
const reviewController = require('./../controllers/review.controller');
const review_controller = new reviewController();

// CRUD operation
router.use(auth_middleware.authorize);
router
   .route('/')
   .get(review_controller.getAllReviews)
   .post(
      auth_middleware.restrictTo('user', 'guide'),
      review_controller.setUserTourId,
      review_controller.createReview
   );

router
   .route('/:id')
   .get(review_controller.getReviewById)
   .patch(
      auth_middleware.restrictTo('admin'),
      review_controller.updateReviewById
   )
   .delete(
      auth_middleware.restrictTo('admin'),
      review_controller.deleteReviewById
   );

module.exports = router;
