import Workflow from "../models/workflow.model.js";
import Agent from "../models/agent.model.js";
export const createWorkflow = async (req, res) => {
  try {
    const { name, domain, agents } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ message: "Workflow name is required" });
    }

    // Convert agent names to ObjectIds
    const agentDocs = await Agent.find({ name: { $in: agents } });

    if (agentDocs.length !== agents.length) {
      return res.status(400).json({ message: "Some agents not found" });
    }

    const agentIds = agentDocs.map((agent) => agent._id);

    // Create new workflow instance
    const newWorkflow = new Workflow({
      name,
      domain,
      agents: agentIds, // Store ObjectIds
    });

    // Save to database
    await newWorkflow.save();

    return res.status(201).json({
      message: "Workflow created successfully",
      workflow: newWorkflow,
    });
  } catch (error) {
    console.error("Error creating workflow:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find();

    // Fetch agent names separately
    const populatedWorkflows = await Promise.all(
      workflows.map(async (workflow) => {
        const agentNames = await Agent.find({
          _id: { $in: workflow.agents },
        }).select("name -_id");
        return {
          _id: workflow._id,
          name: workflow.name,
          domain: workflow.domain,
          agents: agentNames.map((agent) => agent.name), // Extract names from objects
          createdAt: workflow.createdAt,
          updatedAt: workflow.updatedAt,
        };
      })
    );

    res.status(200).json(populatedWorkflows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workflows", error });
  }
};
