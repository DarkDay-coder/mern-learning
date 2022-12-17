const router = require('express').Router();
const viewController = require('./../controllers/view.controller');
const authMiddleware = require('./../middleware/auth.middleware');
const auth_middleware = new authMiddleware();

router.use(auth_middleware.isAuthorized);
router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);
router.get('/login', viewController.getLoginForm);
module.exports = router;
