const express = require('express');
const router = express.Router();

const getAllUsers = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not defined yet',
   });
};

const getUserById = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not defined yet',
   });
};

const createUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not defined yet',
   });
};

const updateUserById = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not defined yet',
   });
};

const deleteUserById = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not defined yet',
   });
};

router.route('/').get(getAllUsers).post(createUser);
router
   .route('/:id')
   .get(getUserById)
   .patch(updateUserById)
   .delete(deleteUserById);

module.exports = router;
