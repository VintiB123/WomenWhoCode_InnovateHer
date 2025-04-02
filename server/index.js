import express from "express";
import connectToDatabase from "./database/mongo.db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import voiceRoutes from "./routes/voice.routes.js";
import mentorRoutes from "./routes/mentor.routes.js";
import menteeRoutes from "./routes/mentee.route.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

const PORT = process.env.PORT || 4224;

// Serve HTML Page
app.get("/", (req, res) => {
  res.send("Connected to MongoDB!");
});

app.use("/api/voice_command", voiceRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/mentee", menteeRoutes);
app.use("/api/auth", authRoutes);

// Initialize socket logic
// socketHandler(server);

const server = app.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT}`);
});

connectToDatabase();
