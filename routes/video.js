import { Router } from "express";
import { analyzeVideo, uploadVideo } from "../scripts/videoIndexer";

const router = Router();

router.get("/analysize", analyzeVideo);
router.post("/", uploadVideo);

export default router;
