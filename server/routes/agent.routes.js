import express from "express";
import {
  createAgent,
  getAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
  toggleFavorite,
  toggleSaved,
} from "../controllers/agent.controller.js";

const router = express.Router();

// Create and Get all agents
router.route("/")
  .post(createAgent)
  .get(getAgents);

// Operations on specific agent by ID
router.route("/:id")
  .get(getAgentById)
  .put(updateAgent)
  .delete(deleteAgent);

// Toggle operations
router.patch("/:id/favorite", toggleFavorite);
router.patch("/:id/saved", toggleSaved);

export default router;