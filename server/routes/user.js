const router = require('express').Router();
const userController = require('../controllers/user');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

module.exports = router;

// admin testing token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDYzNjMzZGFjYTRjZjIwODI5NDA4ZjciLCJmdWxsbmFtZSI6ImFkbWluIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1NjY3OTk5NDN9.o9O6f9z-L5mubNZOwx7x9WAVFk6gvozQ-Xy4JP9Dias

// user 1
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDYzOTc0OGJkMjU2OTM5OWJmYzFjZTEiLCJmdWxsbmFtZSI6InVzZXIxIiwidXNlcm5hbWUiOiJ1c2VyMSIsImVtYWlsIjoidXNlcjFAbWFpbC5jb20iLCJpYXQiOjE1NjY4MDc5OTN9.Onlhpg76kgDlMEcYdu8rjR-vPzNnW9zOtir5vyxykDw