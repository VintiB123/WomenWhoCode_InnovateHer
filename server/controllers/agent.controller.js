import Agent from "../models/agent.model.js";

// Create a new agent
export const createAgent = async (req, res) => {
  try {
    const newAgent = new Agent(req.body);
    const savedAgent = await newAgent.save();
    res.status(201).json(savedAgent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all agents
export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get agent by ID
export const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update agent
export const updateAgent = async (req, res) => {
  try {
    const updatedAgent = await Agent.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedAgent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.status(200).json(updatedAgent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete agent
export const deleteAgent = async (req, res) => {
  try {
    const deletedAgent = await Agent.findByIdAndDelete(req.params.id);
    if (!deletedAgent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.status(200).json({ message: "Agent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle favorite status
export const toggleFavorite = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    agent.favorite = !agent.favorite;
    const updatedAgent = await agent.save();
    res.status(200).json(updatedAgent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Toggle saved status
export const toggleSaved = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    agent.saved = !agent.saved;
    const updatedAgent = await agent.save();
    res.status(200).json(updatedAgent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
