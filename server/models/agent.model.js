import { Schema, model } from "mongoose";

const agentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    documentation: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    filter: {
      input: {
        type: Object,
      },
      temperature: {
        type: Number,
      },
      max_tokens: {
        type: Number,
      },
      prompt: {
        type: String,
      },
      api_key: {
        type: String,
      },
    },
    saved: {
      type: Boolean,
      default: false,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Agent = model("Agent", agentSchema);

export default Agent;
