import express from 'express';
import {userController} from "../controllers/UserController";
import {gameController} from "../controllers/GameController";
const router = express.Router();

router.use('/users', userController);
router.use('/games', gameController);

module.exports = router;
