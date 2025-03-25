import express from "express";

const router = express.Router();
import {
  createWorkflow,
  getAllWorkflows,
} from "../controllers/workflow.controller.js";

router.post("/create", createWorkflow);
router.get("/all", getAllWorkflows);

export default router;
