const router = require('express').Router();
const {
  getusers,
  getSingleUser,
  createuser,
  deleteuser,
  addreaction,
  removereaction,
} = require('../../controllers/usercontrollers');

