const router = require('express').Router();
const viewController = require('./../controllers/view.controller');
router.get('/', (req, res) => {
   res.status(200).render('base', {
      title: 'Home',
      user: 'sibu',
   });
});
router.get('/', viewController.getOverview);
router.get('/tour', viewController.getTour);
module.exports = router;
