import { Router } from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/user.controller.js';
const router = Router();
router.route("/login");
router.route("/register");
router.route("/add_to_activity");
router.route("/get_all_activities");

export default router;
