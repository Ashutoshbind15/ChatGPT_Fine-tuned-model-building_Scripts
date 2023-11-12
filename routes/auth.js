import { Router } from "express";

const router = Router();

router.get("/", getUser);
router.post("/", uploadVideo);

export default router;
