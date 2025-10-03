import express from "express";
import cors from "cors";
import { traycerPlanner } from "./traycer";


const app = express();
app.use(cors());
app.use(express.json());

app.post("/plan", async (req, res) => {
  const { task } = req.body;
  const result = await traycerPlanner(task);
  res.json(result);
});

app.listen(5000, () => console.log("Backend running on port 5000"));
