const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    postUser,
    putUser,
    deleteUser,
    putFriend,
    deleteFriend
} = require('../../controllers/userController.js');

router.route('/').get(getAllUsers).post(postUser);

router
  .route('/:userId')
  .get(getSingleUser)
  .put(putUser)
  .delete(deleteUser);

router
  .route('/:userId/friends/:friendId')
  .post(putFriend)
  .delete(deleteFriend);

module.exports = router;