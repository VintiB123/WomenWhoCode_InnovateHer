import { Schema, model } from "mongoose";

const workflowSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
    },
    agents: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Workflow = model("Workflow", workflowSchema);

export default Workflow;
