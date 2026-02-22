import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import disputeRoutes from "./routes/dispute";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/resolve-dispute", disputeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`AI Arbitrator running on port ${PORT}`);
});